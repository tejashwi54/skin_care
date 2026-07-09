import { Link } from "react-router-dom";

const OrderSummary = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm p-8 sticky top-28">

      <h2 className="text-3xl font-bold text-gray-900">
        Order Summary
      </h2>

      <div className="mt-8 space-y-5">

        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹2,597</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">
            Free
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Discount</span>
          <span>- ₹200</span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span>₹2,397</span>
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

        <button className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-full font-semibold transition">
          Proceed To Checkout
        </button>

      </div>

    </div>
  );
};

export default OrderSummary;