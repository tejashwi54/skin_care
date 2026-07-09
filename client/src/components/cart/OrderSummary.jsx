import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const OrderSummary = () => {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;

  const discount = subtotal >= 2000 ? 200 : 0;

  const total = subtotal + shipping - discount;

  return (
    <div className="bg-white rounded-[32px] shadow-sm p-8 sticky top-28">

      <h2 className="text-3xl font-bold text-gray-900">
        Order Summary
      </h2>

      <div className="mt-8 space-y-5">

        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>

          <span className="text-green-600 font-medium">
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Discount</span>
          <span>- ₹{discount}</span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

      </div>

      {/* Coupon */}

      <div className="mt-8">

        <label className="block text-sm font-medium mb-3">
          Coupon Code
        </label>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Enter coupon"
            className="flex-1 border border-gray-300 rounded-full px-5 py-3 outline-none focus:border-green-500"
          />

          <button className="bg-green-500 hover:bg-green-600 text-white px-6 rounded-full transition">
            Apply
          </button>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-10 space-y-4">

        <Link
          to="/shop"
          className="block w-full border border-green-500 text-green-600 text-center py-4 rounded-full hover:bg-green-500 hover:text-white transition font-semibold"
        >
          Continue Shopping
        </Link>

        <Link
          to="/checkout"
          className={`block w-full text-center py-4 rounded-full font-semibold transition ${
            cartItems.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
              : "bg-black hover:bg-gray-900 text-white"
          }`}
        >
          Proceed To Checkout
        </Link>

      </div>

    </div>
  );
};

export default OrderSummary;