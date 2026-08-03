const Wishlist = require("../models/Wishlist");

// Get Wishlist By User
const getWishlistByUser = (userId) =>
  Wishlist.findOne({ user: userId }).populate("products");

// Create Wishlist
const createWishlist = (data) =>
  Wishlist.create(data);

// Save Wishlist
const saveWishlist = (wishlist) =>
  wishlist.save();

module.exports = {
  getWishlistByUser,
  createWishlist,
  saveWishlist,
};