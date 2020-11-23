const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validators/auth");
const route = express.Router();

route.post("/signup", validateSignupRequest, isRequestValidated, signup);
route.post("/signin", validateSigninRequest, isRequestValidated,signin);

module.exports = route;
