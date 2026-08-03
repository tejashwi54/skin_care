const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const wishlistService = require("../services/wishlist.service");

// ==============================
// Get Wishlist
// ==============================
const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Wishlist fetched successfully",
      wishlist
    )
  );
});

// ==============================
// Toggle Wishlist
// ==============================
const toggleWishlist = asyncHandler(async (req, res) => {
  const wishlist =
    await wishlistService.toggleWishlist(
      req.user._id,
      req.body.productId
    );

  res.status(200).json(
    new ApiResponse(
      200,
      "Wishlist updated successfully",
      wishlist
    )
  );
});

module.exports = {
  getWishlist,
  toggleWishlist,
};