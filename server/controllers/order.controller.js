const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const orderService = require("../services/order.service");

// ==============================
// Place Order
// ==============================

const placeOrder = asyncHandler(async (req, res) => {
  const order = await orderService.placeOrder(
    req.user._id,
    req.body
  );

  res.status(201).json(
    new ApiResponse(
      201,
      "Order placed successfully",
      order
    )
  );
});

// ==============================
// Get My Orders
// ==============================

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getMyOrders(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Orders fetched successfully",
      orders
    )
  );
});

// ==============================
// Get Single Order
// ==============================

const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(
    req.params.id,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Order fetched successfully",
      order
    )
  );
});

// ==============================
// Cancel Order
// ==============================

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await orderService.cancelOrder(
    req.params.id,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Order cancelled successfully",
      order
    )
  );
});

// ==============================
// Get All Orders - Admin
// ==============================

const getAllOrders = asyncHandler(async (req, res) => {
  const result = await orderService.getAllOrders(
    req.query
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Orders fetched successfully",
      result
    )
  );
});

// ==============================
// Get Best Selling Products
// ==============================

const getBestSellingProducts =
  asyncHandler(async (req, res) => {
    const products =
      await orderService.getBestSellingProducts();

    res.status(200).json(
      new ApiResponse(
        200,
        "Best selling products fetched successfully",
        products
      )
    );
  });

// ==============================
// Update Order Status
// ==============================

const updateOrderStatus = asyncHandler(
  async (req, res) => {
    const order =
      await orderService.updateOrderStatus(
        req.params.id,
        req.body.status
      );

    // ==============================
    // Real-Time Order Tracking
    // ==============================

    const io = req.app.get("io");

    if (io) {
      const room = `order:${order._id}`;

      io.to(room).emit(
        "order-status-updated",
        {
          orderId: order._id,
          status: order.orderStatus,
          deliveredAt: order.deliveredAt || null,
          updatedAt: order.updatedAt,
        }
      );
    }

    res.status(200).json(
      new ApiResponse(
        200,
        "Order status updated",
        order
      )
    );
  }
);

// ==============================
// Exports
// ==============================

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  getBestSellingProducts,
};