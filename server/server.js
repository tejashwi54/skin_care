const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const app = require("./app");
const logger = require("./utils/logger");

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(
    `🚀 Server running on http://localhost:${PORT}`
  );
});