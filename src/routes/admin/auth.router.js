const express = require("express");
const { signup, signin } = require("../../controllers/admin/auth.controller");
const route = express.Router();

route.post("/admin/signin", signin);
route.post("/admin/signup", signup);

module.exports = route;
