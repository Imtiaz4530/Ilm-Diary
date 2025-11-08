const route = require("express").Router();

const {
  createIlmRecord,
  editIlmRecord,
  getAllIlmRecord,
  deleteIlmRecord,
} = require("../controllers/ilm.controller");

route.get("/", getAllIlmRecord);
route.post("/create", createIlmRecord);
route.post("/edit/:id", editIlmRecord);
route.delete("/delete/:id", deleteIlmRecord);

module.exports = route;
