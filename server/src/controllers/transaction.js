const { user, film, transaction } = require("../../models");
const fs = require("fs");

exports.createTransaction = async (req, res) => {
  try {
    const transferProof = req.files.transferProof[0].filename;
    console.log(req.userid);
    const datatransaction = await transaction.create({
      ...req.body,
      status: "Pending",
      userid: req.userId,
      transferProof,
      orderDate: new Date().toString(),
    });

    res.status(200).send({
      status: "success",
      data: { transaction: datatransaction },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    let datatransaction = await transaction.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: film,
          as: "film",
          attributes: {
            exclude: ["createdAt", "updatedAt", "userid", "categoryid"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "filmid", "userid"],
      },
    });

    res.status(200).send({
      status: "success",
      data: { transaction: datatransaction },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    const findTransaction = await transaction.findOne({ where: { id } });

    if (!findTransaction) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    fs.unlink(`uploads/${findTransaction.transferProof}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await transaction.destroy({ where: { id } });

    res.status(200).send({
      status: "success",
      data: { id: findTransaction.id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.patchApprove = async (req, res) => {
  try {
    const { id } = req.params;

    const finduser = await transaction.findOne({ where: { id } });

    if (!finduser) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    await transaction.update(
      {
        status: "Approved",
      },
      { where: { id } }
    );

    res.status(200).send({
      status: "Success",
      data: {
        transaction: {
          status: transaction.status,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error ",
    });
  }
};

exports.patchDecline = async (req, res) => {
  try {
    const { id } = req.params;

    const finduser = await transaction.findOne({ where: { id } });

    if (!finduser) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    await transaction.update(
      {
        status: "Declined",
      },
      { where: { id } }
    );

    res.status(200).send({
      status: "Success",
      data: {
        transaction: {
          status: transaction.status,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error ",
    });
  }
};

exports.getTransactionUser = async (req, res) => {
  try {
    let datatransaction = await transaction.findAll({
      where: { userid: req.userId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: film,
          as: "film",
          attributes: {
            exclude: ["createdAt", "updatedAt", "userid", "categoryid"],
          },
        },
      ],
    });

    res.status(200).send({
      status: "success",
      data: { transaction: datatransaction },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getMySelectedFilm = async (req, res) => {
  try {
    const { id } = req.params;

    let purchases = await transaction.findOne({
      include: [
        {
          model: film,
          as: "film",
          where: {
            filmid: id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "userid", "categoryid"],
          },
        },
        {
          model: transaction,
          as: "transaction",
          where: {
            userid: req.userId,
            status: "Approved",
          },
        },
      ],
    });

    purchases = JSON.parse(JSON.stringify(purchases));
    // purchases = purchases.map((purchase) => {
    //   return {
    //     ...purchase
    //   };
    // });

    console.log(purchases);

    res.send({
      status: "success",
      data: {
        purchases,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
