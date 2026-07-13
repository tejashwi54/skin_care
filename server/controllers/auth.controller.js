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

  res.status(200).json(
    new ApiResponse(
      200,
      "Login Successful",
      result
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
  await authService.logoutUser();

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