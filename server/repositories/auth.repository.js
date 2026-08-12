const User = require("../models/User");

const createUser = (userData) =>
  User.create(userData);

const findUserByEmail = (email) =>
  User.findOne({ email }).select("+password");

const findUserById = (id) =>
  User.findById(id).lean();

const findUserByResetToken = (token) =>
  User.findOne({
    passwordResetToken: token,
  }).select("+password");

const findUserByIdWithoutLean = (id) =>
  User.findById(id);

const findUserByVerificationToken = (token) =>
  User.findOne({
    emailVerificationToken: token,
  });

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByResetToken,
  findUserByIdWithoutLean,
  findUserByVerificationToken,
};