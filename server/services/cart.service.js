const ApiError = require("../utils/ApiError");
const cartRepository = require("../repositories/cart.repository");
const productRepository = require("../repositories/product.repository");

const formatCart = (cart) => ({
  ...cart.toObject(),
  items: cart.items
    .filter((item) => item.product)
    .map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      image: item.product.image,
      category: item.product.category,
      price: item.product.price,
      oldPrice: item.product.oldPrice,
      stock: item.product.stock,
      quantity: item.quantity,
    })),
});

const getOrCreateCart = (userId) =>
  cartRepository.getOrCreateCartByUser(userId);

const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  return formatCart(cart);
};

const addToCart = async (userId, productId, quantity = 1) => {
  const product = await productRepository.getProductById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  let cart = await getOrCreateCart(userId);
  const item = cart.items.find(
    (cartItem) => cartItem.product._id.toString() === productId
  );

  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cartRepository.saveCart(cart);
  cart = await cartRepository.getCartByUser(userId);

  return formatCart(cart);
};

const updateQuantity = async (userId, productId, quantity) => {
  const cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find(
    (cartItem) => cartItem.product._id.toString() === productId
  );

  if (!item) {
    throw new ApiError(404, "Product not found in cart");
  }

  item.quantity = quantity;
  await cartRepository.saveCart(cart);

  return formatCart(await cartRepository.getCartByUser(userId));
};

const removeProduct = async (userId, productId) => {
  const cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product._id.toString() !== productId
  );
  await cartRepository.saveCart(cart);

  return formatCart(await cartRepository.getCartByUser(userId));
};

const clearCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  cart.items = [];
  await cartRepository.saveCart(cart);

  return formatCart(await cartRepository.getCartByUser(userId));
};

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeProduct,
  clearCart,
};
