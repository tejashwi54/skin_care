const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cart.controller");

const { protect } = require("../middlewares/auth.middleware");

// Get Cart
router.get(
  "/",
  protect,
  cartController.getCart
);

// Add To Cart
router.post(
  "/",
  protect,
  cartController.addToCart
);

// Update Quantity
router.put(
  "/:productId",
  protect,
  cartController.updateQuantity
);

// Remove Product
router.delete(
  "/:productId",
  protect,
  cartController.removeProduct
);

// Clear Cart
router.delete(
  "/",
  protect,
  cartController.clearCart
);

module.exports = router;