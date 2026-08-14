const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const validate = require("../middlewares/validate.middleware");

const {
  registerValidator,
  loginValidator,

  // Password reset
  forgotPasswordValidator,
  verifyResetOtpValidator,
  resendResetOtpValidator,
  resetPasswordValidator,

  // Email verification
  verifyEmailValidator,
  resendVerificationValidator,
} = require("../validators/auth.validator");

const {
  protect,
} = require("../middlewares/auth.middleware");

// ==============================
// Register
// ==============================

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user and send verification OTP
 *     tags:
 *       - Authentication
 */
router.post(
  "/register",
  registerValidator,
  validate,
  authController.register
);

// ==============================
// Login
// ==============================

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login verified user
 *     tags:
 *       - Authentication
 */
router.post(
  "/login",
  loginValidator,
  validate,
  authController.login
);

// ==============================
// Verify Email OTP
// ==============================

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify email using OTP
 *     tags:
 *       - Authentication
 */
router.post(
  "/verify-email",
  verifyEmailValidator,
  validate,
  authController.verifyEmail
);

// ==============================
// Resend Email Verification OTP
// ==============================

/**
 * @swagger
 * /auth/resend-verification:
 *   post:
 *     summary: Resend email verification OTP
 *     tags:
 *       - Authentication
 */
router.post(
  "/resend-verification",
  resendVerificationValidator,
  validate,
  authController.resendVerification
);

// ==============================
// Forgot Password
// ==============================

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send password reset OTP
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *
 *     responses:
 *       200:
 *         description: Password reset OTP request processed
 */
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  authController.forgotPassword
);

// ==============================
// Verify Password Reset OTP
// ==============================

/**
 * @swagger
 * /auth/verify-reset-otp:
 *   post:
 *     summary: Verify password reset OTP
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */
router.post(
  "/verify-reset-otp",
  verifyResetOtpValidator,
  validate,
  authController.verifyResetOtp
);

// ==============================
// Resend Password Reset OTP
// ==============================

/**
 * @swagger
 * /auth/resend-reset-otp:
 *   post:
 *     summary: Resend password reset OTP
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *
 *     responses:
 *       200:
 *         description: Password reset OTP request processed
 */
router.post(
  "/resend-reset-otp",
  resendResetOtpValidator,
  validate,
  authController.resendResetOtp
);

// ==============================
// Reset Password
// ==============================

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using reset authorization token
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resetToken
 *               - password
 *             properties:
 *               resetToken:
 *                 type: string
 *                 example: reset-token
 *               password:
 *                 type: string
 *                 example: NewPassword@123
 *
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post(
  "/reset-password",
  resetPasswordValidator,
  validate,
  authController.resetPassword
);

// ==============================
// Current User
// ==============================

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags:
 *       - Authentication
 */
router.get(
  "/me",
  protect,
  authController.getMe
);

// ==============================
// Logout
// ==============================

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags:
 *       - Authentication
 */
router.post(
  "/logout",
  authController.logout
);

module.exports = router;