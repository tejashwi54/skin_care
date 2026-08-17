const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/auth.service");

const {
  cookieOptions,
  refreshCookieOptions,
  clearCookieOptions,
} = require("../helpers/cookie.helper");

// ==============================
// Register
// ==============================

const register = asyncHandler(
  async (req, res) => {
    const result =
      await authService.registerUser(
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        201,
        "Registration successful. Please verify your email.",
        {
          user: result,
          email: result.email,
        }
      )
    );
  }
);

// ==============================
// Login
// ==============================

const login = asyncHandler(
  async (req, res) => {
    const {
      email,
      password,
    } = req.body;

    const result =
      await authService.loginUser(
        email,
        password
      );

    res
      .cookie(
        "token",
        result.accessToken,
        cookieOptions
      )
      .cookie(
        "refreshToken",
        result.refreshToken,
        refreshCookieOptions
      )
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Login Successful",
          {
            user: result.user,
          }
        )
      );
  }
);

// ==============================
// Refresh Access Token
// ==============================

const refreshToken = asyncHandler(
  async (req, res) => {
    const currentRefreshToken =
      req.cookies?.refreshToken;

    const result =
      await authService.refreshSession(
        currentRefreshToken
      );

    res
      .cookie(
        "token",
        result.accessToken,
        cookieOptions
      )
      .cookie(
        "refreshToken",
        result.refreshToken,
        refreshCookieOptions
      )
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Token refreshed successfully"
        )
      );
  }
);

// ==============================
// Verify Email OTP
// ==============================

const verifyEmail = asyncHandler(
  async (req, res) => {
    const {
      email,
      otp,
    } = req.body;

    const result =
      await authService.verifyEmailOtp(
        email,
        otp
      );

    res
      .cookie(
        "token",
        result.accessToken,
        cookieOptions
      )
      .cookie(
        "refreshToken",
        result.refreshToken,
        refreshCookieOptions
      )
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Email verified successfully",
          {
            user: result.user,
          }
        )
      );
  }
);

// ==============================
// Resend Email Verification OTP
// ==============================

const resendVerification =
  asyncHandler(
    async (req, res) => {
      const { email } = req.body;

      await authService.resendVerificationOtp(
        email
      );

      res.status(200).json(
        new ApiResponse(
          200,
          "A new verification code has been sent to your email"
        )
      );
    }
  );

// ==============================
// Forgot Password
// ==============================

const forgotPassword =
  asyncHandler(
    async (req, res) => {
      const { email } = req.body;

      await authService.forgotPassword(
        email
      );

      res.status(200).json(
        new ApiResponse(
          200,
          "If an account exists with this email, a password reset code has been sent."
        )
      );
    }
  );

// ==============================
// Verify Password Reset OTP
// ==============================

const verifyResetOtp =
  asyncHandler(
    async (req, res) => {
      const {
        email,
        otp,
      } = req.body;

      const result =
        await authService.verifyResetOtp(
          email,
          otp
        );

      res.status(200).json(
        new ApiResponse(
          200,
          "OTP verified successfully",
          {
            resetToken:
              result.resetToken,
          }
        )
      );
    }
  );

// ==============================
// Resend Password Reset OTP
// ==============================

const resendResetOtp =
  asyncHandler(
    async (req, res) => {
      const { email } = req.body;

      await authService.resendResetOtp(
        email
      );

      res.status(200).json(
        new ApiResponse(
          200,
          "If an account exists with this email, a new password reset code has been sent."
        )
      );
    }
  );

// ==============================
// Reset Password
// ==============================

const resetPassword =
  asyncHandler(
    async (req, res) => {
      const {
        resetToken,
        password,
      } = req.body;

      await authService.resetPassword(
        resetToken,
        password
      );

      res
        .clearCookie(
          "token",
          clearCookieOptions
        )
        .clearCookie(
          "refreshToken",
          clearCookieOptions
        )
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Password reset successful. Please login again."
          )
        );
    }
  );

// ==============================
// Current User
// ==============================

const getMe = asyncHandler(
  async (req, res) => {
    const user =
      await authService.getCurrentUser(
        req.user._id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "User fetched successfully",
        user
      )
    );
  }
);

// ==============================
// Logout
// ==============================

const logout = asyncHandler(
  async (req, res) => {
    if (req.user?._id) {
      await authService.logoutUser(
        req.user._id
      );
    }

    res
      .clearCookie(
        "token",
        clearCookieOptions
      )
      .clearCookie(
        "refreshToken",
        clearCookieOptions
      )
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Logout successful"
        )
      );
  }
);

module.exports = {
  register,
  login,
  refreshToken,

  // Email verification
  verifyEmail,
  resendVerification,

  // Password reset
  forgotPassword,
  verifyResetOtp,
  resendResetOtp,
  resetPassword,

  // User
  getMe,
  logout,
};