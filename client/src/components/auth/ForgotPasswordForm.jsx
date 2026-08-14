import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

import {
  forgotPassword,
} from "../../api/authApi";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error(
        "Please enter your email address"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await forgotPassword(email);

      toast.success(
        response.message
      );

      navigate(
        "/verify-reset-otp",
        {
          state: {
            email,
          },
        }
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Unable to send reset code"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-lg p-10">

      <p className="uppercase tracking-[4px] text-green-600 font-semibold">
        Account Recovery
      </p>

      <h1 className="text-4xl font-bold mt-3">
        Forgot Password
      </h1>

      <p className="text-gray-500 mt-3">
        Enter your registered email address
        and we'll send you a verification code.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading
            ? "Sending OTP..."
            : "Send OTP"}
        </button>

      </form>

      <p className="text-center mt-6">
        <Link
          to="/login"
          className="text-green-600 font-semibold"
        >
          Back to Login
        </Link>
      </p>

    </div>
  );
};

export default ForgotPasswordForm;