const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getDashboardStats = async () => {
  const [
    totalProducts,
    totalOrders,
    pendingOrders,
    confirmedOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    totalCustomers,
    revenueResult,
    recentOrders,
  ] = await Promise.all([
    // Total Products
    Product.countDocuments(),

    // Total Orders
    Order.countDocuments(),

    // Pending
    Order.countDocuments({
      orderStatus: "Pending",
    }),

    // Confirmed
    Order.countDocuments({
      orderStatus: "Confirmed",
    }),

    // Shipped
    Order.countDocuments({
      orderStatus: "Shipped",
    }),

    // Delivered
    Order.countDocuments({
      orderStatus: "Delivered",
    }),

    // Cancelled
    Order.countDocuments({
      orderStatus: "Cancelled",
    }),

    // Customers
    User.countDocuments({
      role: "user",
    }),

    // Revenue
    Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $ifNull: ["$totalPrice", 0],
            },
          },
        },
      },
    ]),

    // Recent Orders
    Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate(
        "user",
        "name email"
      )
      .lean(),
  ]);

  const totalRevenue =
    revenueResult.length > 0
      ? revenueResult[0].totalRevenue
      : 0;

  return {
    totalProducts,
    totalOrders,
    totalCustomers,

    pendingOrders,
    confirmedOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,

    totalRevenue,

    recentOrders,
  };
};

module.exports = {
  getDashboardStats,
};