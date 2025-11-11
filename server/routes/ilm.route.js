const route = require("express").Router();

const userAuth = require("../middleware/auth.middleware");
const authorization = require("../middleware/authorization.middleware");

const {
  createIlmRecord,
  editIlmRecord,
  getAllIlmRecord,
  deleteIlmRecord,
  addBookmarkIlmRecord,
} = require("../controllers/ilm.controller");

route.get("/", getAllIlmRecord);
route.post("/create", userAuth, authorization, createIlmRecord);
route.post("/edit/:id", userAuth, authorization, editIlmRecord);
route.delete("/delete/:id", userAuth, authorization, deleteIlmRecord);

route.get("/bookmark/:id", userAuth, addBookmarkIlmRecord);

module.exports = route;
