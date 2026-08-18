const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getDashboardStats = async () => {
  // ==========================================
  // Basic Counts
  // ==========================================

  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    orderStatusSummary,
    revenueResult,
    salesTrend,
    bestSellingProducts,
    recentOrders,
  ] = await Promise.all([
    // Total Products
    Product.countDocuments(),

    // Total Orders
    Order.countDocuments(),

    // Total Customers
    User.countDocuments({
      role: "user",
    }),

    // ==========================================
    // Order Status Summary
    // ==========================================

    Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: {
            $sum: 1,
          },
        },
      },
    ]),

    // ==========================================
    // Total Revenue
    // Only Delivered Orders
    // ==========================================

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

    // ==========================================
    // Sales Trend
    // ==========================================

    Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
            day: {
              $dayOfMonth: "$createdAt",
            },
          },

          revenue: {
            $sum: {
              $ifNull: ["$totalPrice", 0],
            },
          },

          orders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ]),

    // ==========================================
    // Best Selling Products
    // ==========================================

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

          productName: {
            $first: "$orderItems.name",
          },

          totalQuantity: {
            $sum: "$orderItems.quantity",
          },

          totalSales: {
            $sum: {
              $multiply: [
                "$orderItems.price",
                "$orderItems.quantity",
              ],
            },
          },
        },
      },

      {
        $sort: {
          totalQuantity: -1,
        },
      },

      {
        $limit: 5,
      },
    ]),

    // ==========================================
    // Recent Orders
    // ==========================================

    Order.find()
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .populate(
        "user",
        "name email"
      )
      .lean(),
  ]);

  // ==========================================
  // Convert Status Summary
  // ==========================================

  const statusCounts = {
    Pending: 0,
    Confirmed: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
  };

  orderStatusSummary.forEach((item) => {
    if (
      Object.prototype.hasOwnProperty.call(
        statusCounts,
        item._id
      )
    ) {
      statusCounts[item._id] = item.count;
    }
  });

  // ==========================================
  // Total Revenue
  // ==========================================

  const totalRevenue =
    revenueResult.length > 0
      ? revenueResult[0].totalRevenue
      : 0;

  // ==========================================
  // Final Dashboard Response
  // ==========================================

  return {
    // Basic Stats
    totalProducts,
    totalOrders,
    totalCustomers,

    // Order Status
    pendingOrders: statusCounts.Pending,
    confirmedOrders: statusCounts.Confirmed,
    shippedOrders: statusCounts.Shipped,
    deliveredOrders: statusCounts.Delivered,
    cancelledOrders: statusCounts.Cancelled,

    // Revenue
    totalRevenue,

    // Analytics
    salesTrend,
    bestSellingProducts,

    // Recent Orders
    recentOrders,
  };
};

module.exports = {
  getDashboardStats,
};