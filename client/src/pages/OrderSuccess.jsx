import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

const OrderSuccess = () => {
  return (
    <MainLayout>
      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-xl w-full">

          <FaCheckCircle className="text-green-500 text-7xl mx-auto" />

          <h1 className="text-4xl font-bold mt-6">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500 mt-4 leading-7">
            Thank you for shopping with Clear Skin.
            Your order has been received and will be processed soon.
          </p>

          <div className="mt-10 flex flex-col gap-4">

            <Link
              to="/shop"
              className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-semibold"
            >
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="border border-green-500 text-green-600 py-4 rounded-full font-semibold hover:bg-green-50"
            >
              Go To Home
            </Link>

          </div>

        </div>

      </section>
    </MainLayout>
  );
};

export default OrderSuccess;