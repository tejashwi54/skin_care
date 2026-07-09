import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import QuickViewModal from "./QuickViewModal";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [openQuickView, setOpenQuickView] = useState(false);

  const liked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`);
  };

  const handleWishlist = () => {
    if (liked) {
      toggleWishlist(product);
      toast("Removed from Wishlist");
    } else {
      toggleWishlist(product);
      toast.success("Added to Wishlist ❤️");
    }
  };

  return (
    <>
      <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">

        {/* Product Image */}
        <div className="relative overflow-hidden">

          {/* Badge */}
          <span className="absolute top-4 left-4 z-20 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.badge}
          </span>

          {/* Wishlist */}
          <button
            type="button"
            onClick={handleWishlist}
            className="absolute top-4 right-4 z-20 bg-white p-3 rounded-full shadow hover:scale-110 transition"
          >
            <FaHeart
              className={`text-lg ${
                liked ? "text-red-500" : "text-gray-400"
              }`}
            />
          </button>

          {/* Quick View */}
          <button
            type="button"
            onClick={() => setOpenQuickView(true)}
            className="absolute bottom-4 right-4 z-20 bg-white p-3 rounded-full shadow opacity-0 group-hover:opacity-100 hover:bg-green-500 hover:text-white transition"
          >
            <FaEye />
          </button>

          {/* Product Link */}
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
            />
          </Link>

        </div>

        {/* Content */}
        <Link
          to={`/product/${product.id}`}
          className="flex-1 flex flex-col"
        >
          <div className="p-6 flex flex-col flex-1">

            <p className="text-sm text-green-600 font-medium">
              {product.category}
            </p>

            <h3 className="mt-2 text-xl font-bold text-gray-900 leading-8 min-h-[64px]">
              {product.name}
            </h3>

            <div className="mt-3 flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400">
                ({product.reviews})
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">

              <span className="text-2xl font-bold text-green-600">
                ₹{product.price}
              </span>

              <span className="line-through text-gray-400">
                ₹{product.oldPrice}
              </span>

            </div>

            <p className="mt-3 text-sm text-green-600">
              {product.stock}
            </p>

          </div>
        </Link>

        {/* Add To Cart */}
        <div className="px-6 pb-6">

          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition"
          >
            Add To Cart
          </button>

        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={openQuickView}
        onClose={() => setOpenQuickView(false)}
      />
    </>
  );
};

export default ProductCard;