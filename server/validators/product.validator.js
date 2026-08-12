const { body, param, query } = require("express-validator");

const productFields = (isUpdate = false) => {
  const optional = (validator) =>
    isUpdate ? validator.optional() : validator;

  return [
    optional(body("name"))
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Product name is required")
      .isLength({ max: 120 })
      .withMessage(
        "Product name cannot exceed 120 characters"
      ),

    optional(body("description"))
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10, max: 2000 })
      .withMessage(
        "Description must be between 10 and 2000 characters"
      ),

    optional(body("category"))
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Category is required")
      .isLength({ max: 80 })
      .withMessage(
        "Category cannot exceed 80 characters"
      ),

    body("image")
      .optional()
      .trim()
      .notEmpty()
      .withMessage(
        "Product image cannot be empty"
      ),

    optional(body("price"))
      .isFloat({ gt: 0 })
      .withMessage(
        "Price must be greater than 0"
      ),

    body("oldPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage(
        "Old price must be greater than or equal to 0"
      ),

    optional(body("stock"))
      .isInt({ min: 0 })
      .withMessage(
        "Stock must be a whole number greater than or equal to 0"
      ),

    body("featured")
      .optional()
      .isBoolean()
      .withMessage(
        "Featured must be a boolean"
      ),

    body("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage(
        "Rating must be between 0 and 5"
      ),

    body("reviews")
      .optional()
      .isInt({ min: 0 })
      .withMessage(
        "Reviews must be a whole number greater than or equal to 0"
      ),

    body("badge")
      .optional()
      .trim()
      .escape()
      .isLength({ min: 1, max: 50 })
      .withMessage(
        "Badge must be between 1 and 50 characters"
      ),
  ];
};

const createProductValidator = [
  ...productFields(),

  body().custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Product image is required");
    }

    return true;
  }),
];

const updateProductValidator = [
  body().custom((value, { req }) => {
    const updatableFields = [
      "name",
      "description",
      "category",
      "image",
      "price",
      "oldPrice",
      "stock",
      "featured",
      "rating",
      "reviews",
      "badge",
    ];

    if (
      !req.file &&
      !Object.keys(req.body).some((field) =>
        updatableFields.includes(field)
      )
    ) {
      throw new Error(
        "At least one product field is required"
      );
    }

    return true;
  }),

  ...productFields(true),
];

const productIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid product ID"),
];

const productQueryValidator = [
  query("search")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage(
      "Search cannot exceed 100 characters"
    ),

  query("category")
    .optional()
    .trim()
    .isLength({ max: 80 })
    .withMessage(
      "Category cannot exceed 80 characters"
    ),

  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Minimum price must be a valid positive number"
    ),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Maximum price must be a valid positive number"
    ),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Page must be a positive integer"
    ),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage(
      "Limit must be between 1 and 50"
    ),

  query("sort")
    .optional()
    .isIn([
      "price",
      "-price",
      "name",
      "-name",
      "createdAt",
      "-createdAt",
      "rating",
      "-rating",
    ])
    .withMessage("Invalid sort option"),
];

module.exports = {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
  productQueryValidator,
};