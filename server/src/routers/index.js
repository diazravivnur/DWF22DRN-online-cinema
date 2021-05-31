const express = require("express");

const router = express.Router();

const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

const { regitrasi, login } = require("../controllers/auth");
router.post("/register", regitrasi);
router.post("/login", login);

// USER
const {
  getUser,
  getUserDetail,
  deleteUser,
  updateProfile,
} = require("../controllers/user");
router.get("/userss", auth, getUser);
router.get("/userss/:id", auth, getUserDetail);
router.delete("/userss/:id", auth, deleteUser);
router.put("/userss/:id", uploadFile("avatar"), updateProfile);

// CATEGORY
const { createCategory, getCategory } = require("../controllers/category");
router.post("/category", createCategory);
router.get("/categories", getCategory);

// FILM
const {
  createFilm,
  getFilm,
  getFilmDetail,
  deleteFilm,
  updateFilm,
} = require("../controllers/film");
router.post("/film", uploadFile("thumbnail"), createFilm);
router.get("/films", getFilm);
router.get("/films/:id", getFilmDetail);
router.delete("/films/:id", deleteFilm);
router.put("/films/:id", uploadFile("thumbnail"), updateFilm);

// TRANSACTION
const {
  createTransaction,
  getTransaction,
  deleteTransaction,
} = require("../controllers/transaction");
router.post("/transaction", uploadFile("transferProof"), createTransaction);
router.get("/transactions", getTransaction);
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;
