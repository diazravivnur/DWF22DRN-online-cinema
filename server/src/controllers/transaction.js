const { user, film, transaction } = require("../../models");
const fs = require("fs");

exports.createTransaction = async (req, res) => {
  try {
    const transferProof = req.files.transferProof[0].filename;

    const datatransaction = await transaction.create({
      ...req.body,
      transferProof,
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
