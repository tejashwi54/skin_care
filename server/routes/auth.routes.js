const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const validate = require("../middlewares/validate.middleware");

const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

const {
  protect,
} = require("../middlewares/auth.middleware");

router.post(
  "/register",
  registerValidator,
  validate,
  authController.register
);

router.post(
  "/login",
  loginValidator,
  validate,
  authController.login
);

router.get(
  "/me",
  protect,
  authController.getMe
);

router.post(
  "/logout",
  protect,
  authController.logout
);

module.exports = router;