const Order = require("../models/Order");

const createOrder = (data) => Order.create(data);

const getOrdersByUser = (userId) =>
  Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();

const getOrderById = (id) =>
  Order.findById(id)
    .populate("user", "name email")
    .lean();

const findOrderById = (id) => Order.findById(id);

const getAllOrders = () =>
  Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .lean();

const saveOrder = (order) => order.save();

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

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  findOrderById,
  getAllOrders,
  saveOrder,
  getBestSellingProducts,
};