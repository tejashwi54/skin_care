const ApiError = require("../utils/ApiError");
const cartRepository = require("../repositories/cart.repository");

// ==============================
// Format Cart For Frontend
// ==============================
const formatCart = (cart) => {
  return {
    ...cart.toObject(),
    items: cart.items.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      image: item.product.image,
      category: item.product.category,
      price: item.product.price,
      oldPrice: item.product.oldPrice,
      stock: item.product.stock,
      quantity: item.quantity,
    })),
  };
};

// ==============================
// Get User Cart
// ==============================
const getCart = async (userId) => {
  let cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    cart = await cartRepository.createCart({
      user: userId,
      items: [],
    });

    cart = await cartRepository.getCartByUser(userId);
  }

  return formatCart(cart);
};

// ==============================
// Add Product
// ==============================
const addToCart = async (userId, productId, quantity = 1) => {
  let cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    cart = await cartRepository.createCart({
      user: userId,
      items: [],
    });

    cart = await cartRepository.getCartByUser(userId);
  }

  const item = cart.items.find(
    (i) => i.product._id.toString() === productId
  );

  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cartRepository.saveCart(cart);

  cart = await cartRepository.getCartByUser(userId);

  return formatCart(cart);
};

// ==============================
// Update Quantity
// ==============================
const updateQuantity = async (
  userId,
  productId,
  quantity
) => {
  const cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find(
    (i) => i.product._id.toString() === productId
  );

  if (!item) {
    throw new ApiError(404, "Product not found in cart");
  }

  item.quantity = quantity;

  await cartRepository.saveCart(cart);

  const updatedCart = await cartRepository.getCartByUser(userId);

  return formatCart(updatedCart);
};

// ==============================
// Remove Product
// ==============================
const removeProduct = async (
  userId,
  productId
) => {
  const cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = cart.items.filter(
    (item) =>
      item.product._id.toString() !== productId
  );

  await cartRepository.saveCart(cart);

  const updatedCart = await cartRepository.getCartByUser(userId);

  return formatCart(updatedCart);
};

// ==============================
// Clear Cart
// ==============================
const clearCart = async (userId) => {
  const cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = [];

  await cartRepository.saveCart(cart);

  const updatedCart = await cartRepository.getCartByUser(userId);

  return formatCart(updatedCart);
};

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeProduct,
  clearCart,
};