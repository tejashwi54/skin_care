import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-[30px] shadow-lg"
    >
      {/* Image */}
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-[430px] object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />

      {/* Content */}
      <div className="absolute bottom-6 left-6 right-6 text-white">

        <h3 className="text-xl font-bold">
          {category.name}
        </h3>

        <p className="mt-1 text-white/90">
          {category.products} Products
        </p>

        <Link
          to={`/shop?category=${encodeURIComponent(category.name)}`}
          className="
            mt-5
            inline-flex
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
        </Link>

      </div>

    </motion.div>
  );
};

export default CategoryCard;