const express = require("express");
const { signup } = require("../controllers/user.controller");
const route = express.Router();

route.post("/signin", (req, res) => {});
route.post("/signup", signup);

module.exports = route;
