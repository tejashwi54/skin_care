const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    logger.info(
      `✅ MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    logger.error("❌ MongoDB Connection Error");
    logger.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;