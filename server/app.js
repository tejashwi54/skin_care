const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const errorHandler = require("./middlewares/error.middleware");

// Routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

// ==============================
// Security Middleware
// ==============================
app.use(helmet());

// ==============================
// Logging
// ==============================
app.use(morgan("dev"));

// ==============================
// Body Parser
// ==============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// Cookie Parser
// ==============================
app.use(cookieParser());

// ==============================
// CORS
// ==============================
app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

// ==============================
// Health Check
// ==============================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Clear Skin API is running",
  });
});

// ==============================
// API Routes
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ==============================
// 404 Route
// ==============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==============================
// Global Error Handler
// ==============================
app.use(errorHandler);

module.exports = app;