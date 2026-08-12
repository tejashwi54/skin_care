const { body } = require("express-validator");

const toggleWishlistValidator = [
  body("productId")
    .isMongoId()
    .withMessage("Invalid product ID"),
];

module.exports = {
  toggleWishlistValidator,
};
