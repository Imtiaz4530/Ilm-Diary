const route = require("express").Router();

const userAuth = require("../middleware/auth.middleware");

const { profileRecords } = require("../controllers/profile.controller");

route.get("/posts", userAuth, profileRecords);

module.exports = route;
