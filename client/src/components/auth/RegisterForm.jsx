import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-lg p-10">

      <p className="uppercase tracking-[4px] text-green-600 font-semibold">
        Create Account
      </p>

      <h1 className="text-4xl font-bold mt-3">
        Register
      </h1>

      <p className="text-gray-500 mt-3">
        Join Clear Skin and start your skincare journey.
      </p>

      <form className="mt-8 space-y-5">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition"
        >
          Create Account
        </button>

      </form>

      <p className="text-center mt-6 text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-600 font-semibold"
        >
          Login
        </Link>
      </p>

    </div>
  );
};

export default RegisterForm;