const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);

  res.status(201).json(
    new ApiResponse(
      201,
      "User Registered Successfully",
      result
    )
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.loginUser(
    email,
    password
  );

  // Store JWT in httpOnly Cookie
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  });

  res.status(200).json(
    new ApiResponse(
      200,
      "Login Successful",
      {
        user: result.user,
      }
    )
  );
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "User fetched successfully",
      user
    )
  );
});

const logout = asyncHandler(async (req, res) => {
  // Clear Cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json(
    new ApiResponse(
      200,
      "Logout successful"
    )
  );
});

module.exports = {
  register,
  login,
  getMe,
  logout,
};