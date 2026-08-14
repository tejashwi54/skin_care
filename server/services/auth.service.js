const crypto = require("crypto");

const ApiError = require("../utils/ApiError");
const authRepository = require("../repositories/auth.repository");
const generateToken = require("../helpers/token.helper");
const { sendEmail } = require("../utils/mailer");

// ==============================
// Configuration
// ==============================

const OTP_EXPIRY_MINUTES = 10;

const MAX_OTP_ATTEMPTS = 5;

const RESEND_COOLDOWN_SECONDS = 60;

const RESET_TOKEN_EXPIRY_MINUTES = 10;

// ==============================
// Generate 6 Digit OTP
// ==============================

const generateOtp = () => {
  return crypto
    .randomInt(100000, 1000000)
    .toString();
};

// ==============================
// Hash Value
// ==============================

const hashValue = (value) => {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");
};

// ==============================
// Register User
// ==============================

const registerUser = async (data) => {
  const {
    name,
    email,
    password,
  } = data;

  const normalizedEmail =
    email.toLowerCase().trim();

  const existingUser =
    await authRepository.findUserByEmail(
      normalizedEmail
    );

  if (existingUser) {
    throw new ApiError(
      409,
      "User already exists"
    );
  }

  const user =
    await authRepository.createUser({
      name,
      email: normalizedEmail,
      password,
      isVerified: false,
    });

  const otp = generateOtp();

  user.emailVerificationOtpHash =
    hashValue(otp);

  user.emailVerificationOtpExpires =
    new Date(
      Date.now() +
        OTP_EXPIRY_MINUTES * 60 * 1000
    );

  user.emailVerificationOtpAttempts = 0;

  user.emailVerificationLastSentAt =
    new Date();

  await user.save();

  try {
    await sendEmail({
      to: user.email,

      subject:
        "Clear Skin - Verify Your Email",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 600px;
          margin: auto;
        ">

          <h2 style="color: #16a34a;">
            Welcome to Clear Skin
          </h2>

          <p>
            Hello ${user.name},
          </p>

          <p>
            Thank you for creating your
            Clear Skin account.
          </p>

          <p>
            Please use the verification
            code below:
          </p>

          <div style="
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
          ">

            <p style="
              margin: 0 0 10px;
              color: #555;
            ">
              Verification Code
            </p>

            <h1 style="
              letter-spacing: 8px;
              color: #16a34a;
              margin: 0;
            ">
              ${otp}
            </h1>

          </div>

          <p>
            This code will expire in
            <strong>
              ${OTP_EXPIRY_MINUTES} minutes
            </strong>.
          </p>

          <p>
            If you did not create this account,
            you can safely ignore this email.
          </p>

          <p>
            Regards,<br />
            <strong>Clear Skin Team</strong>
          </p>

        </div>
      `,
    });
  } catch (error) {
    await user.deleteOne();

    throw new ApiError(
      500,
      "Unable to send verification email. Please try again."
    );
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
  };
};

// ==============================
// Verify Email OTP
// ==============================

const verifyEmailOtp = async (
  email,
  otp
) => {
  const normalizedEmail =
    email.toLowerCase().trim();

  const user =
    await authRepository.findUserByEmail(
      normalizedEmail
    );

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  if (user.isVerified) {
    throw new ApiError(
      400,
      "Email is already verified"
    );
  }

  if (
    !user.emailVerificationOtpHash ||
    !user.emailVerificationOtpExpires
  ) {
    throw new ApiError(
      400,
      "Verification code not found. Please request a new code."
    );
  }

  if (
    user.emailVerificationOtpExpires <
    Date.now()
  ) {
    throw new ApiError(
      400,
      "Verification code has expired. Please request a new code."
    );
  }

  if (
    user.emailVerificationOtpAttempts >=
    MAX_OTP_ATTEMPTS
  ) {
    throw new ApiError(
      429,
      "Too many incorrect attempts. Please request a new code."
    );
  }

  const hashedOtp =
    hashValue(otp);

  if (
    hashedOtp !==
    user.emailVerificationOtpHash
  ) {
    user.emailVerificationOtpAttempts += 1;

    await user.save();

    throw new ApiError(
      400,
      "Invalid verification code"
    );
  }

  user.isVerified = true;

  user.emailVerificationOtpHash =
    undefined;

  user.emailVerificationOtpExpires =
    undefined;

  user.emailVerificationOtpAttempts = 0;

  user.emailVerificationLastSentAt =
    undefined;

  await user.save();

  const token = generateToken(
    user._id
  );

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
  };

  return {
    user: userResponse,
    token,
  };
};

// ==============================
// Resend Email Verification OTP
// ==============================

const resendVerificationOtp = async (
  email
) => {
  const normalizedEmail =
    email.toLowerCase().trim();

  const user =
    await authRepository.findUserByEmail(
      normalizedEmail
    );

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  if (user.isVerified) {
    throw new ApiError(
      400,
      "Email is already verified"
    );
  }

  if (
    user.emailVerificationLastSentAt
  ) {
    const secondsSinceLastSend =
      (Date.now() -
        user.emailVerificationLastSentAt.getTime()) /
      1000;

    if (
      secondsSinceLastSend <
      RESEND_COOLDOWN_SECONDS
    ) {
      const remainingSeconds =
        Math.ceil(
          RESEND_COOLDOWN_SECONDS -
            secondsSinceLastSend
        );

      throw new ApiError(
        429,
        `Please wait ${remainingSeconds} seconds before requesting another code.`
      );
    }
  }

  const otp = generateOtp();

  user.emailVerificationOtpHash =
    hashValue(otp);

  user.emailVerificationOtpExpires =
    new Date(
      Date.now() +
        OTP_EXPIRY_MINUTES * 60 * 1000
    );

  user.emailVerificationOtpAttempts = 0;

  user.emailVerificationLastSentAt =
    new Date();

  await user.save();

  try {
    await sendEmail({
      to: user.email,

      subject:
        "Clear Skin - New Verification Code",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 600px;
          margin: auto;
        ">

          <h2 style="color: #16a34a;">
            Verify Your Clear Skin Email
          </h2>

          <p>
            Hello ${user.name},
          </p>

          <p>
            Your new verification code is:
          </p>

          <div style="
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
          ">

            <h1 style="
              letter-spacing: 8px;
              color: #16a34a;
              margin: 0;
            ">
              ${otp}
            </h1>

          </div>

          <p>
            This code will expire in
            <strong>
              ${OTP_EXPIRY_MINUTES} minutes
            </strong>.
          </p>

          <p>
            Regards,<br />
            <strong>Clear Skin Team</strong>
          </p>

        </div>
      `,
    });
  } catch (error) {
    throw new ApiError(
      500,
      "Unable to resend verification email."
    );
  }

  return true;
};

// ==============================
// Login
// ==============================

const loginUser = async (
  email,
  password
) => {
  const user =
    await authRepository.findUserByEmail(
      email
    );

  if (!user) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  const isMatch =
    await user.comparePassword(
      password
    );

  if (!isMatch) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  if (!user.isVerified) {
    throw new ApiError(
      403,
      "Please verify your email before logging in"
    );
  }

  const token =
    generateToken(user._id);

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
  };

  return {
    user: userResponse,
    token,
  };
};

// ==============================
// Current User
// ==============================

const getCurrentUser = async (
  userId
) => {
  const user =
    await authRepository.findUserById(
      userId
    );

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
  };
};

// ==============================
// Logout
// ==============================

const logoutUser = () => {
  return true;
};

// ==============================
// FORGOT PASSWORD
// ==============================

const forgotPassword = async (
  email
) => {
  const normalizedEmail =
    email.toLowerCase().trim();

  const user =
    await authRepository.findUserByEmail(
      normalizedEmail
    );

  /*
   * We intentionally don't reveal
   * whether the email exists.
   *
   * This prevents account enumeration.
   */

  if (!user) {
    return true;
  }

  const otp = generateOtp();

  user.passwordResetOtpHash =
    hashValue(otp);

  user.passwordResetOtpExpires =
    new Date(
      Date.now() +
        OTP_EXPIRY_MINUTES * 60 * 1000
    );

  user.passwordResetOtpAttempts = 0;

  user.passwordResetLastSentAt =
    new Date();

  // Clear any previous reset authorization
  user.passwordResetTokenHash =
    undefined;

  user.passwordResetTokenExpires =
    undefined;

  await user.save();

  try {
    await sendEmail({
      to: user.email,

      subject:
        "Clear Skin - Password Reset Code",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 600px;
          margin: auto;
        ">

          <h2 style="color: #16a34a;">
            Reset Your Clear Skin Password
          </h2>

          <p>
            Hello ${user.name},
          </p>

          <p>
            We received a request to reset
            your Clear Skin account password.
          </p>

          <p>
            Use the verification code below
            to continue:
          </p>

          <div style="
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
          ">

            <p style="
              margin: 0 0 10px;
              color: #555;
            ">
              Password Reset Code
            </p>

            <h1 style="
              letter-spacing: 8px;
              color: #16a34a;
              margin: 0;
            ">
              ${otp}
            </h1>

          </div>

          <p>
            This code will expire in
            <strong>
              ${OTP_EXPIRY_MINUTES} minutes
            </strong>.
          </p>

          <p>
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

          <p>
            Regards,<br />
            <strong>Clear Skin Team</strong>
          </p>

        </div>
      `,
    });
  } catch (error) {
    throw new ApiError(
      500,
      "Unable to send password reset email."
    );
  }

  return true;
};

// ==============================
// Verify Password Reset OTP
// ==============================

const verifyResetOtp = async (
  email,
  otp
) => {
  const normalizedEmail =
    email.toLowerCase().trim();

  const user =
    await authRepository.findUserByEmail(
      normalizedEmail
    );

  if (!user) {
    throw new ApiError(
      400,
      "Invalid or expired verification code"
    );
  }

  if (
    !user.passwordResetOtpHash ||
    !user.passwordResetOtpExpires
  ) {
    throw new ApiError(
      400,
      "Invalid or expired verification code"
    );
  }

  if (
    user.passwordResetOtpExpires <
    Date.now()
  ) {
    throw new ApiError(
      400,
      "Verification code has expired. Please request a new code."
    );
  }

  if (
    user.passwordResetOtpAttempts >=
    MAX_OTP_ATTEMPTS
  ) {
    throw new ApiError(
      429,
      "Too many incorrect attempts. Please request a new code."
    );
  }

  const hashedOtp =
    hashValue(otp);

  if (
    hashedOtp !==
    user.passwordResetOtpHash
  ) {
    user.passwordResetOtpAttempts += 1;

    await user.save();

    throw new ApiError(
      400,
      "Invalid verification code"
    );
  }

  /*
   * OTP is correct.
   *
   * Now create a separate short-lived
   * password reset authorization token.
   */

  const resetToken =
    crypto.randomBytes(32).toString("hex");

  user.passwordResetTokenHash =
    hashValue(resetToken);

  user.passwordResetTokenExpires =
    new Date(
      Date.now() +
        RESET_TOKEN_EXPIRY_MINUTES *
          60 *
          1000
    );

  // OTP cannot be reused
  user.passwordResetOtpHash =
    undefined;

  user.passwordResetOtpExpires =
    undefined;

  user.passwordResetOtpAttempts = 0;

  await user.save();

  return {
    resetToken,
  };
};

// ==============================
// Resend Password Reset OTP
// ==============================

const resendResetOtp = async (
  email
) => {
  const normalizedEmail =
    email.toLowerCase().trim();

  const user =
    await authRepository.findUserByEmail(
      normalizedEmail
    );

  /*
   * Don't reveal whether the email
   * exists.
   */

  if (!user) {
    return true;
  }

  if (
    user.passwordResetLastSentAt
  ) {
    const secondsSinceLastSend =
      (Date.now() -
        user.passwordResetLastSentAt.getTime()) /
      1000;

    if (
      secondsSinceLastSend <
      RESEND_COOLDOWN_SECONDS
    ) {
      const remainingSeconds =
        Math.ceil(
          RESEND_COOLDOWN_SECONDS -
            secondsSinceLastSend
        );

      throw new ApiError(
        429,
        `Please wait ${remainingSeconds} seconds before requesting another code.`
      );
    }
  }

  const otp = generateOtp();

  user.passwordResetOtpHash =
    hashValue(otp);

  user.passwordResetOtpExpires =
    new Date(
      Date.now() +
        OTP_EXPIRY_MINUTES * 60 * 1000
    );

  user.passwordResetOtpAttempts = 0;

  user.passwordResetLastSentAt =
    new Date();

  user.passwordResetTokenHash =
    undefined;

  user.passwordResetTokenExpires =
    undefined;

  await user.save();

  await sendEmail({
    to: user.email,

    subject:
      "Clear Skin - New Password Reset Code",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        max-width: 600px;
        margin: auto;
      ">

        <h2 style="color: #16a34a;">
          New Password Reset Code
        </h2>

        <p>
          Hello ${user.name},
        </p>

        <p>
          Your new password reset code is:
        </p>

        <div style="
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          margin: 25px 0;
        ">

          <h1 style="
            letter-spacing: 8px;
            color: #16a34a;
            margin: 0;
          ">
            ${otp}
          </h1>

        </div>

        <p>
          This code will expire in
          <strong>
            ${OTP_EXPIRY_MINUTES} minutes
          </strong>.
        </p>

        <p>
          Regards,<br />
          <strong>Clear Skin Team</strong>
        </p>

      </div>
    `,
  });

  return true;
};

// ==============================
// Reset Password
// ==============================

const resetPassword = async (
  resetToken,
  newPassword
) => {
  const hashedToken =
    hashValue(resetToken);

  const user =
    await authRepository.findUserByResetTokenHash(
      hashedToken
    );

  if (
    !user ||
    !user.passwordResetTokenExpires ||
    user.passwordResetTokenExpires <
      Date.now()
  ) {
    throw new ApiError(
      400,
      "Password reset session is invalid or has expired"
    );
  }

  user.password = newPassword;

  // Clear reset authorization
  user.passwordResetTokenHash =
    undefined;

  user.passwordResetTokenExpires =
    undefined;

  // Clear OTP-related fields
  user.passwordResetOtpHash =
    undefined;

  user.passwordResetOtpExpires =
    undefined;

  user.passwordResetOtpAttempts = 0;

  user.passwordResetLastSentAt =
    undefined;

  await user.save();

  return true;
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,

  // Email verification
  verifyEmailOtp,
  resendVerificationOtp,

  // Password reset
  forgotPassword,
  verifyResetOtp,
  resendResetOtp,
  resetPassword,
};