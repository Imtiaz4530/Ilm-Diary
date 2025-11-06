const route = require("express").Router();

const {
  createIlmRecord,
  editIlmRecord,
  getAllIlmRecord,
} = require("../controllers/ilm.controller");

route.get("/", getAllIlmRecord);
route.post("/create", createIlmRecord);
route.post("/edit/:id", editIlmRecord);

module.exports = route;
