const { body } = require("express-validator");

const validatePlaceOrder = [
  body("orderItems")
    .isArray({ min: 1 })
    .withMessage("Order must contain at least one product"),

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
    .notEmpty()
    .withMessage("Phone number is required"),

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
    .notEmpty()
    .withMessage("PIN Code is required"),

  body("paymentMethod")
    .isIn(["UPI", "CARD", "COD"])
    .withMessage("Invalid payment method"),

  body("itemsPrice")
    .isFloat({ min: 0 })
    .withMessage("Items price must be greater than or equal to 0"),

  body("shippingPrice")
    .optional()
    .isFloat({ min: 0 }),

  body("discount")
    .optional()
    .isFloat({ min: 0 }),

  body("totalPrice")
    .isFloat({ min: 1 })
    .withMessage("Total price must be greater than 0"),
];

module.exports = {
  validatePlaceOrder,
};