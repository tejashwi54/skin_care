import {
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b py-6">

      {/* Product */}
      <div className="flex items-center gap-5 flex-1">

        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-2xl"
        />

        <div>

          <h2 className="text-xl font-bold">
            {item.name}
          </h2>

          <p className="text-green-600 mt-2">
            {item.category}
          </p>

          <p className="mt-3 font-semibold text-2xl text-green-600">
            ₹{item.price}
          </p>

        </div>

      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => decreaseQuantity(item.id)}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <FaMinus className="mx-auto" />
        </button>

        <span className="text-xl font-bold w-8 text-center">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQuantity(item.id)}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <FaPlus className="mx-auto" />
        </button>

      </div>

      {/* Total */}
      <div className="text-2xl font-bold text-green-600">
        ₹{item.price * item.quantity}
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 text-xl"
      >
        <FaTrash />
      </button>

    </div>
  );
};

export default CartItem;