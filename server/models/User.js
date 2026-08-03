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

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
// ==============================
// Additional Database Indexes
// ==============================

// Fast role lookup
userSchema.index({ role: 1 });

// Latest users
userSchema.index({ createdAt: -1 });

// ==============================
// Hash Password Before Save
// ==============================
=======
// Hash password before saving
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

<<<<<<< HEAD
// ==============================
// Compare Password
// ==============================
=======
// Compare password
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

module.exports = mongoose.model("User", userSchema);