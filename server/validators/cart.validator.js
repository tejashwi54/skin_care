const { body, param } = require("express-validator");

const addToCartValidator = [
  body("productId")
    .isMongoId()
    .withMessage("Invalid Product ID"),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];

const cartProductIdValidator = [
  param("productId")
    .isMongoId()
    .withMessage("Invalid product ID"),
];

const updateCartQuantityValidator = [
  ...cartProductIdValidator,
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];

module.exports = {
  addToCartValidator,
  cartProductIdValidator,
  updateCartQuantityValidator,
};
