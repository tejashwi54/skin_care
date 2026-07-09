import { Link } from "react-router-dom";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[32px] shadow-sm py-24 px-8 text-center"
    >
      {/* Icon */}

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="w-28 h-28 mx-auto rounded-full bg-green-100 flex items-center justify-center"
      >
        <FiShoppingBag className="text-6xl text-green-600" />
      </motion.div>

      {/* Heading */}

      <h2 className="mt-10 text-4xl font-bold text-gray-900">
        Your Cart is Empty
      </h2>

      {/* Description */}

      <p className="mt-5 max-w-lg mx-auto text-lg leading-8 text-gray-500">
        Looks like you haven't added any skincare products yet.
        Explore our premium collection and discover products
        made specially for your skin.
      </p>

      {/* Button */}

      <Link
        to="/shop"
        className="inline-flex items-center gap-3 mt-10 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition duration-300 hover:scale-105 shadow-lg"
      >
        Continue Shopping
        <FiArrowRight />
      </Link>

    </motion.div>
  );
};

export default EmptyCart;