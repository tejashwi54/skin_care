const express = require("express");
const router = express.Router();

const authLimiter = require("../middleware/rateLimiter");
const {
  authenticateUser,
} = require("../middleware/authMiddleware");

const {
  registerValidation,
  loginValidation,
  validate,
} = require("../validators/authValidator");

const {
  register,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/authController");

router.post(
  "/register",
  authLimiter,
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  authLimiter,
  loginValidation,
  validate,
  login
);

router.post("/logout", logout);

router.get("/me", authenticateUser, getCurrentUser);

module.exports = router;