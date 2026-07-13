const User = require("../models/User");

const createUser = (userData) => User.create(userData);

const findUserByEmail = (email) =>
  User.findOne({ email }).select("+password");

const findUserById = (id) =>
  User.findById(id);

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};