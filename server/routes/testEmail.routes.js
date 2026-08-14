const express = require("express");

const {
  testEmail,
} = require("../controllers/testEmail.controller");

const router = express.Router();

router.get("/test-email", testEmail);

module.exports = router;