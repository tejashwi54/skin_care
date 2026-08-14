const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");

const errorHandler = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError");
const ApiResponse = require("./utils/ApiResponse");

const {
  generateCsrfToken,
  doubleCsrfProtection,
} = require("./middlewares/csrf.middleware");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

// Test email route
const testEmailRoutes = require("./routes/testEmail.routes");

const app = express();

// ==============================
// Security & Request Middleware
// ==============================

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

// ==============================
// Dashboard Routes
// ==============================

app.use("/api/dashboard", dashboardRoutes);

// ==============================
// Health Check
// ==============================

app.get("/api/health", (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      "Clear Skin API is running"
    )
  );
});

// ==============================
// CSRF Token Endpoint
// ==============================

app.get("/api/csrf-token", (req, res) => {
  const csrfToken = generateCsrfToken(req, res);

  res.status(200).json(
    new ApiResponse(
      200,
      "CSRF token generated",
      {
        csrfToken,
      }
    )
  );
});

// ==============================
// CSRF Protection
// ==============================

app.use(doubleCsrfProtection);

// ==============================
// Swagger API Documentation
// ==============================

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/cart", cartRoutes);

// ==============================
// Test Email Route
// ==============================

app.use("/api", testEmailRoutes);

// ==============================
// 404 Handler
// ==============================

app.use((req, res, next) => {
  next(
    new ApiError(
      404,
      "Route not found"
    )
  );
});

// ==============================
// Global Error Handler
// ==============================

app.use(errorHandler);

module.exports = app;