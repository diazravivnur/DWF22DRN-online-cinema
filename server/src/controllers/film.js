const { film, category } = require("../../models");
const fs = require("fs");

exports.createFilm = async (req, res) => {
  try {
    const thumbnail = req.files.thumbnail[0].filename;

    const datafilm = await film.create({
      ...req.body,
      thumbnail,
      include: [
        {
          model: category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(200).send({
      status: "success",
      data: { film: datafilm },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getFilm = async (req, res) => {
  try {
    let datafilm = await film.findAll({
      include: [
        {
          model: category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: { film: datafilm },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getFilmDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const datafilm = await film.findOne({
      where: {
        id,
      },
      include: [
        {
          model: category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!datafilm) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    res.status(200).send({
      status: "success",
      data: { film: datafilm },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteFilm = async (req, res) => {
  try {
    const id = req.params.id;

    const findFilm = await film.findOne({ where: { id } });

    if (!findFilm) {
      return res.send({
        status: "failed",
        message: "Data not found",
      });
    }

    fs.unlink(`uploads/${findFilm.thumbnail}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await film.destroy({ where: { id } });

    res.status(200).send({
      status: "success",
      data: { id: findFilm.id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateFilm = async (req, res) => {
  try {
    const { id } = req.params;

    const findfilm = await film.findOne({ where: { id } });

    if (!findfilm) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    if (req.files) {
      var thumbnail = req.files.thumbnail[0].filename;
      fs.unlink(`uploads/${findfilm.thumbnail}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    const datafilm = {
      ...req.body,
      thumbnail,
    };

    await film.update(datafilm, {
      where: { id },
    });

    const updateFilm = await film.findOne({
      where: { id },
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });

    res.status(200).send({
      status: "Success",
      data: {
        user: {
          title: updateFilm.title,
          price: updateFilm.price,
          filmURL: updateFilm.filmURL,
          description: updateFilm.description,
          thumbnail: updateFilm.thumbnail,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error WKWKKWW",
    });
  }
};
