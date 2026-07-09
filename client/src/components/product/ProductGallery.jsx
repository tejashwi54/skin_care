import { motion } from "framer-motion";

const ProductGallery = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-[40px] p-8 shadow-lg"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[420px] lg:h-[500px] object-contain"
      />
    </motion.div>
  );
};

export default ProductGallery;