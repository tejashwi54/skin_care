import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-[30px] cursor-pointer shadow-lg"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-[430px] object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h3 className="text-1xl font-bold">
          {category.name}
        </h3>

        <p className="mt-1 text-white/90">
          {category.products} Products
        </p>

        <button
          className="
          mt-5
          flex
          items-center
          gap-2
          bg-white
          text-gray-900
          px-5
          py-3
          rounded-full
          font-semibold
          shadow-lg
          opacity-0
          translate-y-8
          group-hover:opacity-100
          group-hover:translate-y-0
          transition-all
          duration-500
          hover:bg-green-500
          hover:text-white
          "
        >
          Shop Now
          <FiArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

export default CategoryCard;