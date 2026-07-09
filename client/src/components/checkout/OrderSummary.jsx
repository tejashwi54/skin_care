const OrderSummary = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-lg p-8 sticky top-28">

      <h2 className="text-3xl font-bold mb-8">
        Order Summary
      </h2>

      {/* Products */}
      <div className="space-y-5">

        <div className="flex justify-between">
          <span>Vitamin C Serum</span>
          <span>₹999</span>
        </div>

        <div className="flex justify-between">
          <span>Hydrating Moisturizer</span>
          <span>₹799</span>
        </div>

      </div>

      <hr className="my-8" />

      {/* Price */}

      <div className="space-y-4">

        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹1798</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Discount</span>
          <span>-₹100</span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span>₹1698</span>
        </div>

      </div>

      <button className="w-full mt-10 bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-semibold transition">
        Place Order
      </button>

    </div>
  );
};

export default OrderSummary;