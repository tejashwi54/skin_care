const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// ==============================
// Access Token
// ==============================

const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "15m",
    }
  );
};

// ==============================
// Refresh Token
// ==============================

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

// ==============================
// Hash Refresh Token
// ==============================

const hashRefreshToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
};