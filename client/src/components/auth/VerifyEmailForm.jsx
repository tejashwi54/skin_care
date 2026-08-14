import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  verifyEmail,
  resendVerificationOtp,
} from "../../api/authApi";

const RESEND_COOLDOWN = 60;

const VerifyEmailForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || "";

  const [otp, setOtp] =
    useState([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const [cooldown, setCooldown] =
    useState(RESEND_COOLDOWN);

  const inputRefs = useRef([]);

  // ==============================
  // If user opens page directly
  // ==============================

  useEffect(() => {
    if (!email) {
      toast.error(
        "Please register first."
      );

      navigate("/register", {
        replace: true,
      });
    }
  }, [email, navigate]);

  // ==============================
  // Resend Countdown
  // ==============================

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer =
      setInterval(() => {
        setCooldown(
          (previous) =>
            previous - 1
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [cooldown]);

  // ==============================
  // OTP Change
  // ==============================

  const handleOtpChange = (
    index,
    value
  ) => {
    // Only numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [
      ...otp,
    ];

    // Handle pasted/multiple digits
    if (value.length > 1) {
      const digits =
        value
          .replace(/\D/g, "")
          .slice(0, 6)
          .split("");

      const updatedOtp = [
        "",
        "",
        "",
        "",
        "",
        "",
      ];

      digits.forEach(
        (digit, digitIndex) => {
          updatedOtp[
            digitIndex
          ] = digit;
        }
      );

      setOtp(updatedOtp);

      const nextIndex = Math.min(
        digits.length,
        5
      );

      inputRefs.current[
        nextIndex
      ]?.focus();

      return;
    }

    newOtp[index] = value;

    setOtp(newOtp);

    if (
      value &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  // ==============================
  // Backspace
  // ==============================

  const handleKeyDown = (
    index,
    event
  ) => {
    if (
      event.key ===
        "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }
  };

  // ==============================
  // Verify OTP
  // ==============================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const otpValue =
      otp.join("");

    if (
      otpValue.length !== 6
    ) {
      toast.error(
        "Please enter the 6-digit verification code"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await verifyEmail({
          email,
          otp: otpValue,
        });

      toast.success(
        response.message
      );

      // Email verified + JWT cookie created
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Resend OTP
  // ==============================

  const handleResend = async () => {
    if (
      cooldown > 0 ||
      resending
    ) {
      return;
    }

    try {
      setResending(true);

      const response =
        await resendVerificationOtp(
          email
        );

      toast.success(
        response.message
      );

      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      setCooldown(
        RESEND_COOLDOWN
      );

      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Unable to resend verification code"
      );
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="bg-white rounded-[32px] shadow-lg p-10">

      <p className="uppercase tracking-[4px] text-green-600 font-semibold">
        Email Verification
      </p>

      <h1 className="text-4xl font-bold mt-3">
        Verify Your Email
      </h1>

      <p className="text-gray-500 mt-3">
        We've sent a 6-digit verification
        code to:
      </p>

      <p className="font-semibold text-gray-800 mt-2 break-all">
        {email}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8"
      >

        <div className="flex justify-center gap-2 sm:gap-3">

          {otp.map(
            (digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[
                    index
                  ] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(event) =>
                  handleOtpChange(
                    index,
                    event.target.value
                  )
                }
                onKeyDown={(event) =>
                  handleKeyDown(
                    index,
                    event
                  )
                }
                className="w-11 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold border border-gray-300 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                autoComplete={
                  index === 0
                    ? "one-time-code"
                    : "off"
                }
              />
            )
          )}

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading
            ? "Verifying..."
            : "Verify Email"}
        </button>

      </form>

      <div className="text-center mt-7">

        <p className="text-gray-500">
          Didn't receive the code?
        </p>

        <button
          type="button"
          onClick={handleResend}
          disabled={
            cooldown > 0 ||
            resending
          }
          className="mt-2 text-green-600 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {resending
            ? "Sending..."
            : cooldown > 0
            ? `Resend OTP in ${cooldown}s`
            : "Resend OTP"}
        </button>

      </div>

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

export default VerifyEmailForm;