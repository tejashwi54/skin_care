const { body } = require("express-validator");

const productValidator = [
  body("name")
    .trim()
    .notEmpty()
<<<<<<< HEAD
    .withMessage("Product name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Product name must be between 3 and 100 characters"),
=======
    .withMessage("Product name is required"),
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

  body("description")
    .trim()
    .notEmpty()
<<<<<<< HEAD
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
=======
    .withMessage("Description is required"),
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

<<<<<<< HEAD
  body("image")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("oldPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Old price must be greater than or equal to 0"),

  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be greater than or equal to 0"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),

  body("reviews")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Reviews must be greater than or equal to 0"),
=======
  body("price")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("stock")
    .isNumeric()
    .withMessage("Stock must be a number"),
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
];

module.exports = {
  productValidator,
};