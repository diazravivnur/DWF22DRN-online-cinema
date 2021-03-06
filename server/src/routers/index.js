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
router.get("/users", auth, getUser);
router.get("/user/:id", auth, getUserDetail);
router.delete("/user/:id", auth, deleteUser);
router.put("/user/:id", uploadFile("avatar"), updateProfile);

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
  ownedFilms,
  getFilmByCategory,
} = require("../controllers/film");
router.post("/film", uploadFile("thumbnail"), createFilm);
router.get("/films", getFilm);
router.get("/films/owned", auth, ownedFilms);

router.get("/films/:id", getFilmDetail);
router.get("/sortbycategory/:id", getFilmByCategory);
router.delete("/films/:id", deleteFilm);
router.put("/films/:id", uploadFile("thumbnail"), updateFilm);

// TRANSACTION
const {
  createTransaction,
  getTransaction,
  deleteTransaction,
  patchApprove,
  patchDecline,
  getTransactionUser,
  getMySelectedFilm,
} = require("../controllers/transaction");
router.post(
  "/transaction",
  uploadFile("transferProof"),
  auth,
  createTransaction
);
router.get("/transactions", getTransaction);
router.get("/transactions/user", auth, getTransactionUser);
router.get("/myfilm/:id2", auth, getMySelectedFilm);
router.delete("/transactions/:id", deleteTransaction);
router.patch("/trans/approve/:id", patchApprove);
router.patch("/trans/decline/:id", patchDecline);

module.exports = router;
