import { FaTrash } from "react-icons/fa";

const CartItem = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-b">

      {/* Product Image */}
      <img
        src="https://via.placeholder.com/120"
        alt="Product"
        className="w-28 h-28 rounded-2xl object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">

        <p className="text-sm text-green-600 font-medium">
          Serums
        </p>

        <h2 className="text-2xl font-bold mt-2">
          Vitamin C Brightening Serum
        </h2>

        <p className="text-green-600 font-semibold mt-3">
          ₹999
        </p>

      </div>

      {/* Quantity */}
      <div className="flex items-center border rounded-full overflow-hidden">

        <button className="px-4 py-2 hover:bg-gray-100">
          −
        </button>

        <span className="px-6 font-semibold">
          1
        </span>

        <button className="px-4 py-2 hover:bg-gray-100">
          +
        </button>

      </div>

      {/* Remove */}
      <button className="text-red-500 hover:text-red-600 text-xl">
        <FaTrash />
      </button>

    </div>
  );
};

export default CartItem;