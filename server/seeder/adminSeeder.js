const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("../models/User");
const logger = require("../utils/logger");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info("MongoDB Connected");

    const existingAdmin = await User.findOne({
      email: "admin@clearskin.com",
    });

    if (existingAdmin) {
      if (existingAdmin.role !== "admin") {
        existingAdmin.role = "admin";
        existingAdmin.isVerified = true;

        await existingAdmin.save();

        logger.info("Existing user promoted to admin");
      } else {
        logger.info("Admin already exists");
      }

      await mongoose.disconnect();
      process.exit(0);
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@clearskin.com",
      password: "Admin@12345",
      role: "admin",
      isVerified: true,
    });

    logger.info("Admin created successfully");
    logger.info(`Admin email: ${admin.email}`);
    logger.info(`Admin role: ${admin.role}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error(`Admin seeder error: ${error.message}`);

    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();