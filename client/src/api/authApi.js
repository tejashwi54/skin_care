import axiosInstance from "./axiosInstance";

// ==============================
// Register
// ==============================

export const registerUser = async (
  userData
) => {
  const response =
    await axiosInstance.post(
      "/auth/register",
      userData
    );

  return response.data;
};

// ==============================
// Login
// ==============================

export const loginUser = async (
  loginData
) => {
  const response =
    await axiosInstance.post(
      "/auth/login",
      loginData
    );

  return response.data;
};

// ==============================
// Verify Email OTP
// ==============================

export const verifyEmail = async (
  verificationData
) => {
  const response =
    await axiosInstance.post(
      "/auth/verify-email",
      verificationData
    );

  return response.data;
};

// ==============================
// Resend Verification OTP
// ==============================

export const resendVerificationOtp =
  async (email) => {
    const response =
      await axiosInstance.post(
        "/auth/resend-verification",
        {
          email,
        }
      );

    return response.data;
  };

// ==============================
// Forgot Password
// ==============================

export const forgotPassword =
  async (email) => {
    const response =
      await axiosInstance.post(
        "/auth/forgot-password",
        {
          email,
        }
      );

    return response.data;
  };

// ==============================
// Verify Password Reset OTP
// ==============================

export const verifyResetOtp =
  async (verificationData) => {
    const response =
      await axiosInstance.post(
        "/auth/verify-reset-otp",
        verificationData
      );

    return response.data;
  };

// ==============================
// Reset Password
// ==============================

export const resetPassword =
  async (resetData) => {
    const response =
      await axiosInstance.post(
        "/auth/reset-password",
        resetData
      );

    return response.data;
  };

// ==============================
// Resend Password Reset OTP
// ==============================

export const resendResetOtp =
  async (email) => {
    const response =
      await axiosInstance.post(
        "/auth/resend-reset-otp",
        {
          email,
        }
      );

    return response.data;
  };

// ==============================
// Current User
// ==============================

export const getCurrentUser =
  async () => {
    const response =
      await axiosInstance.get(
        "/auth/me"
      );

    return response.data;
  };

// ==============================
// Logout
// ==============================

export const logoutUser =
  async () => {
    await axiosInstance.post(
      "/auth/logout"
    );
  };