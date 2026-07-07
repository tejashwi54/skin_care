const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const ROLES = require("../constants/roles");
const cookieOptions = require("../constants/cookieOptions");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");

// ==========================
// Register User
// ==========================
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: ROLES.USER,
  });

  const token = generateToken(user._id, user.role);

  res.cookie("token", token, cookieOptions);

  return res.status(201).json(
    new ApiResponse(201, "Registration successful", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  );
});

// ==========================
// Login User
// ==========================
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id, user.role);

  res.cookie("token", token, cookieOptions);

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  );
});

// ==========================
// Logout User
// ==========================
exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, "Logout successful"));
});

// ==========================
// Get Current User
// ==========================
exports.getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, "User fetched successfully", {
      user: req.user,
    })
  );
});