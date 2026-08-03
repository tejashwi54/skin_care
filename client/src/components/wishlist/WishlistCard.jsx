import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";

const WishlistCard = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm overflow-hidden hover:shadow-xl transition duration-300">

      {/* Image */}
      <div className="relative">

        <img
          src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600"
          alt="Product"
          className="w-full h-72 object-cover"
        />

        <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Best Seller
        </span>

        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:bg-red-500 hover:text-white transition">
          <FaHeart />
        </button>

      </div>

      {/* Content */}
      <div className="p-6">

        <p className="text-green-600 text-sm font-medium">
          Serums
        </p>

        <h3 className="text-2xl font-bold mt-2">
          Vitamin C Brightening Serum
        </h3>

        <div className="flex items-center gap-3 mt-5">

          <span className="text-2xl font-bold text-green-600">
            ₹999
          </span>

          <span className="line-through text-gray-400">
            ₹1299
          </span>

        </div>

        <div className="flex gap-3 mt-8">

          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-full flex justify-center items-center gap-2 transition">

            <FaShoppingCart />

            Add To Cart

          </button>

          <button className="w-14 h-14 border rounded-full hover:bg-red-500 hover:text-white transition">

            <FaTrash className="mx-auto" />

          </button>

        </div>

      </div>

    </div>
  );
};

export default WishlistCard;