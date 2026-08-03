const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
<<<<<<< HEAD
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
=======
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized. No token provided.");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  req.user = user;

  next();
});

module.exports = {
  protect,
};