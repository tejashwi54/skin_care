import { motion } from "framer-motion";

const ShopHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-14"
    >
      {/* Small Label */}
      <p className="uppercase tracking-[5px] text-green-600 font-semibold">
        Shop
      </p>

      {/* Heading */}
      <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900">
        All Products
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
        Explore our complete skincare collection designed to nourish,
        protect, and reveal naturally healthy, glowing skin.
      </p>
    </motion.div>
  );
};

export default ShopHeader;