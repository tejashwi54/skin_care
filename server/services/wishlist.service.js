const ApiError = require("../utils/ApiError");
const wishlistRepository = require("../repositories/wishlist.repository");

// Format Wishlist
const formatWishlist = (wishlist) => ({
  ...wishlist.toObject(),
  products: wishlist.products.map((product) => ({
    _id: product._id,
    name: product.name,
    image: product.image,
    category: product.category,
    price: product.price,
    oldPrice: product.oldPrice,
    stock: product.stock,
    rating: product.rating,
    reviews: product.reviews,
    badge: product.badge,
  })),
});

// Get Wishlist
const getWishlist = async (userId) => {
  let wishlist = await wishlistRepository.getWishlistByUser(userId);

  if (!wishlist) {
    wishlist = await wishlistRepository.createWishlist({
      user: userId,
      products: [],
    });

    wishlist = await wishlistRepository.getWishlistByUser(userId);
  }

  return formatWishlist(wishlist);
};

// Toggle Wishlist
const toggleWishlist = async (userId, productId) => {
  let wishlist = await wishlistRepository.getWishlistByUser(userId);

  if (!wishlist) {
    wishlist = await wishlistRepository.createWishlist({
      user: userId,
      products: [],
    });

    wishlist = await wishlistRepository.getWishlistByUser(userId);
  }

  const exists = wishlist.products.some(
    (product) => product._id.toString() === productId
  );

  if (exists) {
    wishlist.products = wishlist.products.filter(
      (product) => product._id.toString() !== productId
    );
  } else {
    wishlist.products.push(productId);
  }

  await wishlistRepository.saveWishlist(wishlist);

  wishlist = await wishlistRepository.getWishlistByUser(userId);

  return formatWishlist(wishlist);
};

module.exports = {
  getWishlist,
  toggleWishlist,
};