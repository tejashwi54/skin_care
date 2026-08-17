const { body } = require("express-validator");

// ==============================
// Create Payment Order Validator
// ==============================

const createPaymentOrderValidator = [
  body("orderId")
    .trim()
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID"),
];

// ==============================
// Verify Payment Validator
// ==============================

const verifyPaymentValidator = [
  body("orderId")
    .trim()
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID"),

  body("razorpayOrderId")
    .trim()
    .notEmpty()
    .withMessage(
      "Razorpay order ID is required"
    ),

  body("razorpayPaymentId")
    .trim()
    .notEmpty()
    .withMessage(
      "Razorpay payment ID is required"
    ),

  body("razorpaySignature")
    .trim()
    .notEmpty()
    .withMessage(
      "Razorpay signature is required"
    ),
];

module.exports = {
  createPaymentOrderValidator,
  verifyPaymentValidator,
};