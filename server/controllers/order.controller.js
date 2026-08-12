const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const orderService = require("../services/order.service");

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

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getAllOrders();

  res.status(200).json(
    new ApiResponse(
      200,
      "Orders fetched successfully",
      orders
    )
  );
});

const getBestSellingProducts = asyncHandler(
  async (req, res) => {
    const products =
      await orderService.getBestSellingProducts();

    res.status(200).json(
      new ApiResponse(
        200,
        "Best selling products fetched successfully",
        products
      )
    );
  }
);

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.status
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Order status updated",
      order
    )
  );
});

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  getBestSellingProducts,
};