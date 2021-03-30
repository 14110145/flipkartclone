const express = require("express");
const { upload, adminMiddleware, requireSignin } = require("../../common-middleware");
const { createPage } = require("../../controllers/admin/page.controller");
const route = express.Router();

route.post(
  "/page/create",
  requireSignin,
  adminMiddleware,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);

module.exports = route;
