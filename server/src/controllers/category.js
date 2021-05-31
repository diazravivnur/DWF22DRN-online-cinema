const { category } = require("../../models");
const fs = require("fs");

exports.createCategory = async (req, res) => {
  try {
    const datacategory = await category.create({
      ...req.body,
    });

    res.status(200).send({
      status: "success",
      data: {
        fund: {
          id: datacategory.id,
          name: datacategory.name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    let datacategory = await category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: { category: datacategory },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
