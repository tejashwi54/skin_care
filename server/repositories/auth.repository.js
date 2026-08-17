const User = require("../models/User");

// ==============================
// Create User
// ==============================

const createUser = (userData) =>
  User.create(userData);

// ==============================
// Find User By Email
// ==============================

const findUserByEmail = (email) =>
  User.findOne({ email }).select("+password");

// ==============================
// Find User By ID
// ==============================

const findUserById = (id) =>
  User.findById(id).lean();

// ==============================
// Find User By ID
// Without Lean
// ==============================

const findUserByIdWithoutLean = (id) =>
  User.findById(id);

// ==============================
// Find User By Password Reset Token Hash
// ==============================

const findUserByResetTokenHash = (tokenHash) =>
  User.findOne({
    passwordResetTokenHash: tokenHash,
  }).select("+password");

// ==============================
// Find User By Refresh Token Hash
// ==============================

const findUserByRefreshTokenHash = (tokenHash) =>
  User.findOne({
    refreshTokenHash: tokenHash,
  });

// ==============================
// Export Repository Methods
// ==============================

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByIdWithoutLean,
  findUserByResetTokenHash,
  findUserByRefreshTokenHash,
};