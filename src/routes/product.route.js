const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {} = require("../controllers/category.controller");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
} = require("../controllers/product.controller");
const router = express.Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/products/getProducts", requireSignin, adminMiddleware, getProducts);
router.get("/products/:slug", getProductsBySlug);

router.delete("/product/deleteProductById", requireSignin, adminMiddleware, deleteProductById);
router.post("/product/create", requireSignin, adminMiddleware, upload.array("productPicture"), createProduct);
router.get("/product/:productId", getProductDetailsById);

module.exports = router;
