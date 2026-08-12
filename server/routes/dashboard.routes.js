const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");

const { protect } = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

router.get(
  "/stats",
  protect,
  authorize(["admin"]),
  dashboardController.getDashboardStats
);

module.exports = router;