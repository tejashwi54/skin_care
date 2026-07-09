import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-lg p-10">

      <p className="uppercase tracking-[4px] text-green-600 font-semibold">
        Welcome Back
      </p>

      <h1 className="text-4xl font-bold mt-3">
        Login
      </h1>

      <p className="text-gray-500 mt-3">
        Sign in to continue shopping.
      </p>

      <form className="mt-8 space-y-5">

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

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition"
        >
          Login
        </button>

      </form>

      <p className="text-center mt-6 text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-green-600 font-semibold"
        >
          Register
        </Link>
      </p>

    </div>
  );
};

export default LoginForm;
