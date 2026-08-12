const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getDashboardStats = async () => {
  const [
    totalProducts,
    totalOrders,
    pendingOrders,
    totalCustomers,
  ] = await Promise.all([
    Product.countDocuments(),

    Order.countDocuments(),

    Order.countDocuments({
      orderStatus: "Pending",
    }),

    User.countDocuments({
      role: "user",
    }),
  ]);

  return {
    totalProducts,
    totalOrders,
    pendingOrders,
    totalCustomers,
  };
};

module.exports = {
  getDashboardStats,
};