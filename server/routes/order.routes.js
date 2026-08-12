const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  getBestSellingProducts,
} = require("../controllers/order.controller");

const { protect } = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const validate = require("../middlewares/validate.middleware");

const {
  validatePlaceOrder,
  orderIdValidator,
  updateOrderStatusValidator,
} = require("../validators/order.validator");

router.post(
  "/",
  protect,
  validatePlaceOrder,
  validate,
  placeOrder
);

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

router.get(
  "/best-sellers",
  getBestSellingProducts
);

router.get(
  "/:id",
  protect,
  orderIdValidator,
  validate,
  getOrderById
);

router.put(
  "/:id/cancel",
  protect,
  orderIdValidator,
  validate,
  cancelOrder
);

router.get(
  "/",
  protect,
  authorize(["admin"]),
  getAllOrders
);

router.put(
  "/:id/status",
  protect,
  authorize(["admin"]),
  updateOrderStatusValidator,
  validate,
  updateOrderStatus
);

module.exports = router;