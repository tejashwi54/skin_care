import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../api/authApi";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        name,
        email,
        password,
      });

      toast.success(response.message);

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

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

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

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

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition"
        >
          {loading ? "Creating Account..." : "Create Account"}
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