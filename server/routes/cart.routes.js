const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cart.controller");

const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  addToCartValidator,
  cartProductIdValidator,
  updateCartQuantityValidator,
} = require("../validators/cart.validator");

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
  addToCartValidator,
  validate,
  cartController.addToCart
);

// Update Quantity
router.put(
  "/:productId",
  protect,
  updateCartQuantityValidator,
  validate,
  cartController.updateQuantity
);

// Remove Product
router.delete(
  "/:productId",
  protect,
  cartProductIdValidator,
  validate,
  cartController.removeProduct
);

// Clear Cart
router.delete(
  "/",
  protect,
  cartController.clearCart
);

module.exports = router;
