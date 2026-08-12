const crypto = require("crypto");

const ApiError = require("../utils/ApiError");
const authRepository = require("../repositories/auth.repository");
const generateToken = require("../helpers/token.helper");
const { sendEmail } = require("../utils/mailer");

const registerUser = async (data) => {
  const { name, email, password } = data;

  const existingUser =
    await authRepository.findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await authRepository.createUser({
    name,
    email,
    password,
  });

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
  };

  return userResponse;
};

const loginUser = async (email, password) => {
  const user =
    await authRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch =
    await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);

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

const getCurrentUser = async (userId) => {
  const user =
    await authRepository.findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
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

const logoutUser = () => {
  return true;
};

const forgotPassword = async (email) => {
  const user =
    await authRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Generate raw reset token
  const resetToken =
    crypto.randomBytes(32).toString("hex");

  // Store only hashed token in database
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token expires in 10 minutes
  user.passwordResetExpires =
    Date.now() + 10 * 60 * 1000;

  await user.save();

  // Create password reset link
  const resetLink =
    `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // Send reset email
  await sendEmail({
    to: user.email,
    subject: "Clear Skin - Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Reset Your Password</h2>

        <p>Hello ${user.name},</p>

        <p>
          We received a request to reset your Clear Skin account password.
        </p>

        <p>
          Click the button below to reset your password:
        </p>

        <a
          href="${resetLink}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #22c55e;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Password
        </a>

        <p>
          This link will expire in 10 minutes.
        </p>

        <p>
          If you did not request a password reset,
          you can safely ignore this email.
        </p>

        <p>
          Regards,<br />
          Clear Skin Team
        </p>
      </div>
    `,
  });

  // Do not return the raw reset token
  return true;
};

const resetPassword = async (
  token,
  newPassword
) => {
  // Hash token received from frontend
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user =
    await authRepository.findUserByResetToken(
      hashedToken
    );

  // Check token validity and expiry
  if (
    !user ||
    user.passwordResetExpires < Date.now()
  ) {
    throw new ApiError(
      400,
      "Reset token is invalid or has expired"
    );
  }

  // Set new password
  user.password = newPassword;

  // Remove reset token after successful password reset
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return true;
};

const sendVerificationEmail = async (userId) => {
  const user =
    await authRepository.findUserByIdWithoutLean(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isVerified) {
    throw new ApiError(
      400,
      "Email is already verified"
    );
  }

  const verificationToken =
    crypto.randomBytes(32).toString("hex");

  user.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  user.emailVerificationExpires =
    Date.now() + 24 * 60 * 60 * 1000;

  await user.save();

  return {
    verificationToken,
  };
};

const verifyEmail = async (token) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user =
    await authRepository.findUserByVerificationToken(
      hashedToken
    );

  if (
    !user ||
    user.emailVerificationExpires < Date.now()
  ) {
    throw new ApiError(
      400,
      "Verification token is invalid or has expired"
    );
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  return true;
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};

