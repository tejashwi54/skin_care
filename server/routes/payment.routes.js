const express = require("express");

const router = express.Router();

const paymentController = require(
  "../controllers/payment.controller"
);

const { protect } = require(
  "../middlewares/auth.middleware"
);

const validate = require(
  "../middlewares/validate.middleware"
);

const {
  createPaymentOrderValidator,
  verifyPaymentValidator,
} = require(
  "../validators/payment.validator"
);

// ==============================
// Create Razorpay Payment Order
// ==============================

router.post(
  "/create-order",
  protect,
  createPaymentOrderValidator,
  validate,
  paymentController.createPaymentOrder
);

// ==============================
// Verify Razorpay Payment
// ==============================

router.post(
  "/verify",
  protect,
  verifyPaymentValidator,
  validate,
  paymentController.verifyPayment
);

module.exports = router;