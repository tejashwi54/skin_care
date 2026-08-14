import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  resetPassword,
} from "../../api/authApi";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || "";

  const resetToken =
    location.state?.resetToken || "";

  const [formData, setFormData] =
    useState({
      password: "",
      confirmPassword: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      password,
      confirmPassword,
    } = formData;

    if (!password || !confirmPassword) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    if (password.length < 8) {
      toast.error(
        "Password must be at least 8 characters"
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    if (!resetToken) {
      toast.error(
        "Password reset session is invalid. Please start again."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await resetPassword({
          email,
          resetToken,
          password,
        });

      toast.success(
        response.message
      );

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!email || !resetToken) {
    return (
      <div className="bg-white rounded-[32px] shadow-lg p-10 text-center">

        <h1 className="text-3xl font-bold">
          Reset Session Expired
        </h1>

        <p className="text-gray-500 mt-3">
          Please start the password
          reset process again.
        </p>

        <Link
          to="/forgot-password"
          className="inline-block mt-6 text-green-600 font-semibold"
        >
          Try Again
        </Link>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] shadow-lg p-10">

      <p className="uppercase tracking-[4px] text-green-600 font-semibold">
        Account Recovery
      </p>

      <h1 className="text-4xl font-bold mt-3">
        Reset Password
      </h1>

      <p className="text-gray-500 mt-3">
        Create a new password for your
        Clear Skin account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <input
          type="password"
          name="confirmPassword"
          value={
            formData.confirmPassword
          }
          onChange={handleChange}
          placeholder="Confirm New Password"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading
            ? "Resetting Password..."
            : "Reset Password"}
        </button>

      </form>

      <p className="text-center mt-6">
        <Link
          to="/login"
          className="text-gray-500 hover:text-green-600"
        >
          Back to Login
        </Link>
      </p>

    </div>
  );
};

export default ResetPasswordForm;