import { Link } from "react-router-dom";
import {
  FaTrash,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { getId } from "../../utils/getId";

const WishlistGrid = () => {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item);
    toast.success("Moved to Cart 🛒");
  };

  if (wishlistItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] shadow-sm py-24 px-8 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="w-28 h-28 mx-auto rounded-full bg-red-100 flex items-center justify-center"
        >
          <FaHeart className="text-5xl text-red-500" />
        </motion.div>

        <h2 className="mt-10 text-4xl font-bold text-gray-900">
          Your Wishlist is Empty
        </h2>

        <p className="mt-5 max-w-lg mx-auto text-lg text-gray-500 leading-8">
          Save your favourite skincare products here and purchase them anytime.
        </p>

        <Link
          to="/shop"
          className="inline-flex items-center gap-3 mt-10 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition"
        >
          Browse Products
          <FiArrowRight />
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {wishlistItems.map((item) => (
        <motion.div
          key={getId(item)}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-72 object-cover"
          />

          <div className="p-6">
            <p className="text-sm text-green-600 font-medium">
              {item.category}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 min-h-[64px]">
              {item.name}
            </h2>

            <p className="mt-5 text-3xl font-bold text-green-600">
              ₹{item.price}
            </p>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => handleMoveToCart(item)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition"
              >
                <FaShoppingCart />
                Move To Cart
              </button>

              <button
                onClick={() => {
                  removeFromWishlist(item);
                  toast.success("Removed from Wishlist");
                }}
                className="w-14 h-14 rounded-full border hover:bg-red-500 hover:text-white transition flex items-center justify-center"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WishlistGrid;
