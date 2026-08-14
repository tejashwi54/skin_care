const Order = require("../models/Order");

// ==============================
// Create Order
// ==============================

const createOrder = (data) =>
  Order.create(data);

// ==============================
// Get Orders By User
// ==============================

const getOrdersByUser = (userId) =>
  Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();

// ==============================
// Get Single Order
// ==============================

const getOrderById = (id) =>
  Order.findById(id)
    .populate("user", "name email")
    .lean();

// ==============================
// Find Order By ID
// ==============================

const findOrderById = (id) =>
  Order.findById(id);

// ==============================
// Get All Orders - Paginated
// ==============================

const getAllOrders = ({
  skip = 0,
  limit = 10,
} = {}) =>
  Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

// ==============================
// Count All Orders
// ==============================

const countOrders = () =>
  Order.countDocuments();

// ==============================
// Save Order
// ==============================

const saveOrder = (order) =>
  order.save();

// ==============================
// Get Best Selling Products
// ==============================

const getBestSellingProducts = () =>
  Order.aggregate([
    {
      $match: {
        orderStatus: {
          $ne: "Cancelled",
        },
      },
    },
    {
      $unwind: "$orderItems",
    },
    {
      $group: {
        _id: "$orderItems.product",
        totalSold: {
          $sum: "$orderItems.quantity",
        },
      },
    },
    {
      $sort: {
        totalSold: -1,
      },
    },
    {
      $limit: 4,
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            "$product",
            {
              totalSold: "$totalSold",
            },
          ],
        },
      },
    },
  ]);

// ==============================
// Exports
// ==============================

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  findOrderById,
  getAllOrders,
  countOrders,
  saveOrder,
  getBestSellingProducts,
};