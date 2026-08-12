const { body, param } = require("express-validator");

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const validatePlaceOrder = [
  body("orderItems")
    .isArray({ min: 1 })
    .withMessage("Order must contain at least one product"),

  body("orderItems.*.product")
    .isMongoId()
    .withMessage("Each order item must contain a valid product ID"),

  body("orderItems.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Each order item quantity must be at least 1"),

  body("shippingAddress")
    .isObject()
    .withMessage("Shipping address is required"),

  body("shippingAddress.firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required"),

  body("shippingAddress.lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required"),

  body("shippingAddress.email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("shippingAddress.phone")
    .trim()
    .matches(/^[0-9+()\-\s]{7,20}$/)
    .withMessage("Valid phone number is required"),

  body("shippingAddress.address")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),

  body("shippingAddress.city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),

  body("shippingAddress.state")
    .trim()
    .notEmpty()
    .withMessage("State is required"),

  body("shippingAddress.pinCode")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("PIN Code must be between 3 and 12 characters"),

  body("paymentMethod")
    .isIn(["UPI", "CARD", "COD"])
    .withMessage("Invalid payment method"),
];

const orderIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid order ID"),
];

const updateOrderStatusValidator = [
  ...orderIdValidator,

  body("status")
    .isIn(ORDER_STATUSES)
    .withMessage("Invalid order status"),
];

module.exports = {
  validatePlaceOrder,
  orderIdValidator,
  updateOrderStatusValidator,
};