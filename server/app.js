const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const errorHandler = require("./middlewares/error.middleware");

<<<<<<< HEAD
// ==============================
// Routes
// ==============================
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
=======
// Routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

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
<<<<<<< HEAD
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

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