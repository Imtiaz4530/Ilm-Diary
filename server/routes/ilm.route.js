const route = require("express").Router();

const userAuth = require("../middleware/auth.middleware");

const {
  createIlmRecord,
  editIlmRecord,
  getAllIlmRecord,
  deleteIlmRecord,
} = require("../controllers/ilm.controller");

route.get("/", userAuth, getAllIlmRecord);
route.post("/create", userAuth, createIlmRecord);
route.post("/edit/:id", userAuth, editIlmRecord);
route.delete("/delete/:id", userAuth, deleteIlmRecord);

module.exports = route;
