const express = require("express");

const router = express.Router();

const wishlistController = require("../controllers/wishlist.controller");

const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  toggleWishlistValidator,
} = require("../validators/wishlist.validator");

// Get Wishlist
router.get(
  "/",
  protect,
  wishlistController.getWishlist
);

// Add / Remove Wishlist
router.post(
  "/",
  protect,
  toggleWishlistValidator,
  validate,
  wishlistController.toggleWishlist
);

module.exports = router;
