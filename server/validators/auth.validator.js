const { body } = require("express-validator");

// ==============================
// Register Validator
// ==============================

const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({
      min: 3,
      max: 50,
    })
    .withMessage(
      "Name must be between 3 and 50 characters"
    ),

  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Valid email is required"
    )
    .normalizeEmail(),

  body("password")
    .isString()
    .withMessage(
      "Password must be a string"
    )
    .isLength({
      min: 8,
    })
    .withMessage(
      "Password must be at least 8 characters"
    ),
];

// ==============================
// Login Validator
// ==============================

const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Valid email is required"
    )
    .normalizeEmail(),

  body("password")
    .isString()
    .withMessage(
      "Password must be a string"
    )
    .notEmpty()
    .withMessage(
      "Password is required"
    ),
];

// ==============================
// Forgot Password Validator
// ==============================

const forgotPasswordValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Valid email is required"
    )
    .normalizeEmail(),
];

// ==============================
// Verify Password Reset OTP Validator
// ==============================

const verifyResetOtpValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Valid email is required"
    )
    .normalizeEmail(),

  body("otp")
    .trim()
    .isLength({
      min: 6,
      max: 6,
    })
    .withMessage(
      "Verification code must be exactly 6 digits"
    )
    .isNumeric()
    .withMessage(
      "Verification code must contain only numbers"
    ),
];

// ==============================
// Resend Password Reset OTP Validator
// ==============================

const resendResetOtpValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Valid email is required"
    )
    .normalizeEmail(),
];

// ==============================
// Reset Password Validator
// ==============================

const resetPasswordValidator = [
  body("resetToken")
    .trim()
    .notEmpty()
    .withMessage(
      "Password reset token is required"
    ),

  body("password")
    .isString()
    .withMessage(
      "Password must be a string"
    )
    .isLength({
      min: 8,
    })
    .withMessage(
      "Password must be at least 8 characters"
    ),
];

// ==============================
// Verify Email OTP Validator
// ==============================

const verifyEmailValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Valid email is required"
    )
    .normalizeEmail(),

  body("otp")
    .trim()
    .isLength({
      min: 6,
      max: 6,
    })
    .withMessage(
      "Verification code must be exactly 6 digits"
    )
    .isNumeric()
    .withMessage(
      "Verification code must contain only numbers"
    ),
];

// ==============================
// Resend Verification Validator
// ==============================

const resendVerificationValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Valid email is required"
    )
    .normalizeEmail(),
];

// ==============================
// Export Validators
// ==============================

module.exports = {
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
};