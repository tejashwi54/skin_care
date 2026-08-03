import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../api/authApi";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      toast.success(response.message);

      // Redirect after successful login
      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

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

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
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