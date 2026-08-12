const Cart = require("../models/Cart");

// Get Cart By User
const getCartByUser = (userId) => {
  return Cart.findOne({ user: userId })
    .populate("items.product");
};

const getOrCreateCartByUser = (userId) =>
  Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).populate("items.product");

// Create Cart
const createCart = (data) => {
  return Cart.create(data);
};

// Save Cart
const saveCart = (cart) => {
  return cart.save();
};

// Delete Cart
const deleteCart = (userId) => {
  return Cart.findOneAndDelete({ user: userId });
};

module.exports = {
  getCartByUser,
  getOrCreateCartByUser,
  createCart,
  saveCart,
  deleteCart,
};
