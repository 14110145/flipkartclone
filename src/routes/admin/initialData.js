const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { initialData } = require("../../controllers/admin/initialdata.controller");
const route = express.Router();

route.post("/initialdata", requireSignin, adminMiddleware, initialData);

module.exports = route;
