const express = require("express");

const router = express.Router();

const wishlistController = require("../controllers/wishlist.controller");

const { protect } = require("../middlewares/auth.middleware");

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
  wishlistController.toggleWishlist
);

module.exports = router;