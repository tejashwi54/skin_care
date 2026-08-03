import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-[120px] font-bold text-green-500">
            404
          </h1>

          <h2 className="text-4xl font-bold text-gray-900 mt-4">
            Page Not Found
          </h2>

          <p className="text-gray-500 mt-5 max-w-lg mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            to="/"
            className="inline-block mt-10 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition"
          >
            Back to Home
          </Link>

        </div>

      </section>
    </MainLayout>
  );
};

export default NotFound;