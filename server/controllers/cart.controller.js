const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const cartService = require("../services/cart.service");

// Get Cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Cart fetched successfully",
      cart
    )
  );
});

// Add To Cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await cartService.addToCart(
    req.user._id,
    productId,
    quantity
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Product added to cart",
      cart
    )
  );
});

// Update Quantity
const updateQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const cart =
    await cartService.updateQuantity(
      req.user._id,
      req.params.productId,
      quantity
    );

  res.status(200).json(
    new ApiResponse(
      200,
      "Cart updated successfully",
      cart
    )
  );
});

// Remove Product
const removeProduct = asyncHandler(async (req, res) => {
  const cart =
    await cartService.removeProduct(
      req.user._id,
      req.params.productId
    );

  res.status(200).json(
    new ApiResponse(
      200,
      "Product removed successfully",
      cart
    )
  );
});

// Clear Cart
const clearCart = asyncHandler(async (req, res) => {
  const cart = await cartService.clearCart(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Cart cleared successfully",
      cart
    )
  );
});

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeProduct,
  clearCart,
};