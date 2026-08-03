const CartHeader = () => {
  return (
    <div>

      <p className="uppercase tracking-[4px] text-green-600 font-semibold">
        Shopping Cart
      </p>

      <h1 className="text-5xl font-bold mt-3 text-gray-900">
        Your Shopping Cart
      </h1>

      <p className="mt-4 text-gray-500 max-w-2xl">
        Review your skincare essentials before proceeding to checkout.
      </p>

    </div>
  );
};

export default CartHeader;