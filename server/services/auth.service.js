const ApiError = require("../utils/ApiError");
const authRepository = require("../repositories/auth.repository");
const generateToken = require("../helpers/token.helper");

const registerUser = async (data) => {
  const { name, email, password } = data;

  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await authRepository.createUser({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
    token,
  };
};

const loginUser = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
    token,
  };
};

const getCurrentUser = async (userId) => {
  const user = await authRepository.findUserById(userId);

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

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};