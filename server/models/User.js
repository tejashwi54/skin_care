const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    avatar: {
      type: String,
      default: "",
    },

    // ==============================
    // Email Verification
    // ==============================

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationOtpHash: {
      type: String,
    },

    emailVerificationOtpExpires: {
      type: Date,
    },

    emailVerificationOtpAttempts: {
      type: Number,
      default: 0,
    },

    emailVerificationLastSentAt: {
      type: Date,
    },

    // ==============================
    // Password Reset OTP
    // ==============================

    passwordResetOtpHash: {
      type: String,
    },

    passwordResetOtpExpires: {
      type: Date,
    },

    passwordResetOtpAttempts: {
      type: Number,
      default: 0,
    },

    passwordResetLastSentAt: {
      type: Date,
    },

    // ==============================
    // Password Reset Authorization
    // ==============================

    passwordResetTokenHash: {
      type: String,
    },

    passwordResetTokenExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// ==============================
// Hash Password
// ==============================

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(
    this.password,
    10
  );
});

// ==============================
// Compare Password
// ==============================

userSchema.methods.comparePassword = async function (
  enteredPassword
) {
  return bcrypt.compare(
    enteredPassword,
    this.password
  );
};

module.exports = mongoose.model(
  "User",
  userSchema
);