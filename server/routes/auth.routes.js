const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const validate = require("../middlewares/validate.middleware");

const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  verifyEmailValidator,
} = require("../validators/auth.validator");

const { protect } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test User
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: Test@123
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  "/register",
  registerValidator,
  validate,
  authController.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: Test@123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  "/login",
  loginValidator,
  validate,
  authController.login
);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Generate password reset token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *     responses:
 *       200:
 *         description: Password reset link generated
 */
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  authController.forgotPassword
);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewPassword@123
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post(
  "/reset-password/:token",
  resetPasswordValidator,
  validate,
  authController.resetPassword
);

/**
 * @swagger
 * /auth/send-verification:
 *   post:
 *     summary: Generate email verification link
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Verification link generated successfully
 */
router.post(
  "/send-verification",
  protect,
  authController.sendVerificationEmail
);

/**
 * @swagger
 * /auth/verify-email/{token}:
 *   get:
 *     summary: Verify user email
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.get(
  "/verify-email/:token",
  verifyEmailValidator,
  validate,
  authController.verifyEmail
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Current user fetched successfully
 */
router.get(
  "/me",
  protect,
  authController.getMe
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post(
  "/logout",
  authController.logout
);

module.exports = router;