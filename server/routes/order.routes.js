const express = require("express");

const router = express.Router();

// Controllers
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

// Auth Middleware
const { protect } = require("../middlewares/auth.middleware");

// Validation Middleware
const validate = require("../middlewares/validate.middleware");

// Validators
const {
  validatePlaceOrder,
} = require("../validators/order.validator");

// ======================================
// USER ROUTES
// ======================================

// Place Order
router.post(
  "/",
  protect,
  validatePlaceOrder,
  validate,
  placeOrder
);

// Get Logged In User Orders
router.get(
  "/my-orders",
  protect,
  getMyOrders
);

// Get Single Order
router.get(
  "/:id",
  protect,
  getOrderById
);

// Cancel Order
router.put(
  "/:id/cancel",
  protect,
  cancelOrder
);

// ======================================
// ADMIN ROUTES
// ======================================

// Get All Orders
router.get(
  "/",
  protect,
  getAllOrders
);

// Update Order Status
router.put(
  "/:id/status",
  protect,
  updateOrderStatus
);

module.exports = router;