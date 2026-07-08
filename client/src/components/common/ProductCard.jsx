import { FaHeart, FaEye, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">

      {/* Product Image */}
      <div className="relative overflow-hidden">

        {/* Badge */}
        <span className="absolute top-4 left-4 z-10 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {product.badge}
        </span>

        {/* Wishlist */}
        <button className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow hover:bg-green-500 hover:text-white transition duration-300">
          <FaHeart />
        </button>

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Quick View */}
        <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-300">
          <FaEye />
        </button>

      </div>

      {/* Content */}
      <div className="p-6 flex flex-col">

        {/* Category */}
        <p className="text-sm text-green-600 font-medium">
          {product.category}
        </p>

        {/* Product Name (Fixed Height) */}
        <h3 className="mt-2 text-xl font-bold text-gray-900 leading-8 min-h-[64px]">
          {product.name}
        </h3>

        {/* Rating (Fixed Height) */}
        <div className="mt-3 h-6 flex items-center gap-2">

          <FaStar className="text-yellow-400" />

          <span className="font-semibold">
            {product.rating}
          </span>

          <span className="text-gray-400">
            ({product.reviews})
          </span>

        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">

          <span className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </span>

          <span className="text-lg line-through text-gray-400">
            ₹{product.oldPrice}
          </span>

        </div>

        {/* Stock (Fixed Height) */}
        <p className="mt-3 h-6 text-sm text-green-600 font-medium">
          {product.stock}
        </p>

        {/* Button */}
        <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition duration-300">
          Add To Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;