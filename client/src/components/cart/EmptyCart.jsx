import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

const EmptyCart = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm py-24 px-8 text-center">

      <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center">
        <FiShoppingBag className="text-5xl text-green-600" />
      </div>

      <h2 className="mt-8 text-4xl font-bold text-gray-900">
        Your Cart is Empty
      </h2>

      <p className="mt-4 text-gray-500 max-w-md mx-auto leading-7">
        Looks like you haven't added any skincare products yet.
        Start exploring our premium collection.
      </p>

      <Link
        to="/shop"
        className="inline-block mt-10 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition"
      >
        Continue Shopping
      </Link>

    </div>
  );
};

export default EmptyCart;