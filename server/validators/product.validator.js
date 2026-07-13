const { body } = require("express-validator");

const productValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("stock")
    .isNumeric()
    .withMessage("Stock must be a number"),
];

module.exports = {
  productValidator,
};