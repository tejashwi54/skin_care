import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const ShopHeader = () => {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const heading =
    type === "bestseller"
      ? "Best Selling Products ⭐"
      : "All Products";

  const description =
    type === "bestseller"
      ? "Explore our most loved skincare essentials, trusted and loved by thousands of customers."
      : "Explore our complete skincare collection designed to nourish, protect, and reveal naturally healthy, glowing skin.";

  return (
    <motion.div
      key={type || "shop"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-14"
    >
      {/* Small Label */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="uppercase tracking-[5px] text-green-600 font-semibold"
      >
        Shop
      </motion.p>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.6,
          ease: "easeOut",
        }}
        className="mt-4 text-3xl lg:text-3xl font-bold text-gray-900"
      >
        {heading}
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.6,
          ease: "easeOut",
        }}
        className="mt-6 max-w-2xl text-lg leading-8 text-gray-500"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default ShopHeader;