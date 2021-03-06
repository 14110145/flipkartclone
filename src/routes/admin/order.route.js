const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { updateOrder, getCustomerOrder } = require("../../controllers/admin/order.controller");
const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddleware, updateOrder);
router.post(`/order/getCustomerOrders`, requireSignin, adminMiddleware, getCustomerOrder);

module.exports = router;
