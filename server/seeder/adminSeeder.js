const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

const seedAdmin = async () => {
  try {
    const adminEmail = "admin@clearskin.com";

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");

      // Make sure existing account has admin role
      if (existingAdmin.role !== "admin") {
        existingAdmin.role = "admin";
        await existingAdmin.save();

        console.log("✅ Existing user promoted to admin");
      }

      process.exit(0);
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@clearskin.com",
      password: "Admin@12345",
      role: "admin",
      isVerified: true,
    });

    console.log("✅ Admin Created Successfully");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);

    process.exit(0);
  } catch (error) {
    console.error("❌ Admin Seeder Error:", error);
    process.exit(1);
  }
};

seedAdmin();