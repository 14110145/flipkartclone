const express = require("express");
const {
  initialData,
} = require("../../controllers/admin/initialdata.controller");
const route = express.Router();

route.post("/initialdata", initialData);

module.exports = route;
