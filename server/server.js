const dotenv = require("dotenv");

dotenv.config();

const http = require("http");
const jwt = require("jsonwebtoken");

const connectDB = require("./config/db");
const app = require("./app");
const logger = require("./utils/logger");
const { connectRedis } = require("./utils/redis");

const Order = require("./models/Order");

const { Server } = require("socket.io");

// ==============================
// Database Connections
// ==============================

connectDB();

// ==============================
// Redis Connection
// ==============================

connectRedis().catch((error) => {
  logger.error(
    `Redis connection failed: ${error.message}`
  );
});

// ==============================
// HTTP Server
// ==============================

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

// ==============================
// Socket.IO Server
// ==============================

const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
    credentials: true,
  },
});

// ==============================
// Socket Authentication
// ==============================

io.use(async (socket, next) => {
  try {
    const cookieHeader =
      socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(
        new Error("Authentication required")
      );
    }

    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((cookie) => {
        const [key, ...value] =
          cookie.trim().split("=");

        return [
          key,
          decodeURIComponent(
            value.join("=")
          ),
        ];
      })
    );

    const token = cookies.token;

    if (!token) {
      return next(
        new Error(
          "Authentication token not found"
        )
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded?.id) {
      return next(
        new Error(
          "Invalid authentication token"
        )
      );
    }

    socket.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    logger.warn(
      `Socket authentication failed: ${error.message}`
    );

    next(
      new Error(
        "Socket authentication failed"
      )
    );
  }
});

// ==============================
// Socket Connection
// ==============================

io.on("connection", (socket) => {
  logger.info(
    `Socket connected: ${socket.id} | User: ${socket.user.id}`
  );

  // ==============================
  // Join Order Room
  // ==============================

  socket.on("join-order", async (orderId) => {
    try {
      if (!orderId) {
        return;
      }

      const order = await Order.findOne({
        _id: orderId,
        user: socket.user.id,
      }).select("_id user");

      if (!order) {
        logger.warn(
          `User ${socket.user.id} attempted to access unauthorized order ${orderId}`
        );

        socket.emit(
          "order-access-denied",
          {
            message:
              "You are not authorized to track this order.",
          }
        );

        return;
      }

      const room = `order:${orderId}`;

      socket.join(room);

      logger.info(
        `Socket ${socket.id} joined ${room}`
      );
    } catch (error) {
      logger.error(
        `Join order failed: ${error.message}`
      );

      socket.emit(
        "order-access-denied",
        {
          message:
            "Unable to access order tracking.",
        }
      );
    }
  });

  // ==============================
  // Leave Order Room
  // ==============================

  socket.on("leave-order", (orderId) => {
    if (!orderId) {
      return;
    }

    const room = `order:${orderId}`;

    socket.leave(room);

    logger.info(
      `Socket ${socket.id} left ${room}`
    );
  });

  // ==============================
  // Disconnect
  // ==============================

  socket.on("disconnect", () => {
    logger.info(
      `Socket disconnected: ${socket.id}`
    );
  });
});

// ==============================
// Make Socket.IO accessible
// to controllers/services
// ==============================

app.set("io", io);

// ==============================
// Start Server
// ==============================

httpServer.listen(PORT, () => {
  logger.info(
    `Server running on http://localhost:${PORT}`
  );
});