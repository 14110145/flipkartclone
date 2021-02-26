const express = require("express");
const { requireSignin } = require("../../common-middleware");
const {
  signup,
  signin,
  signout,
} = require("../../controllers/admin/auth.controller");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth");
const route = express.Router();

route.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);
route.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
route.post("/admin/signout", signout);

module.exports = route;
