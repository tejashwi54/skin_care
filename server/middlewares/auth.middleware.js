const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  // Read JWT from httpOnly Cookie
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized. Please login.");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token.");
  }

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  req.user = user;

  next();
});

module.exports = {
  protect,
};