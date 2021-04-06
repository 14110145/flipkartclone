const express = require("express");
const { requireSignin, userMiddleware } = require("../common-middleware");
const { addItemToCart } = require("../controllers/cart.controller");
const router = express.Router();

router.post("/user/cart/addtocart", requireSignin, userMiddleware, addItemToCart);
router.get("/user/getCartItems", requireSignin, userMiddleware, getCartItems);

module.exports = router;
