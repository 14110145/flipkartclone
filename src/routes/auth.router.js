const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const route = express.Router();

route.post("/signin", signin);
route.post("/signup", signup);

module.exports = route;
