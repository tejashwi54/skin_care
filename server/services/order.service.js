const ApiError = require("../utils/ApiError");
const Product = require("../models/Product");
const orderRepository = require("../repositories/order.repository");

const SHIPPING_PRICE = 99;
const DEFAULT_DISCOUNT = 0;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_ORDER_LIMIT = 50;

const parsePositiveInteger = (
  value,
  fallback,
  maximum
) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(parsed, maximum);
};

// ==============================
// Place Order
// ==============================

const placeOrder = async (userId, orderData) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
  } = orderData;

  const productIds = orderItems.map(
    (item) => item.product
  );

  const products = await Product.find({
    _id: { $in: productIds },
  }).lean();

  if (products.length !== productIds.length) {
    throw new ApiError(
      404,
      "One or more products were not found"
    );
  }

  const verifiedOrderItems = orderItems.map(
    (item) => {
      const product = products.find(
        (product) =>
          product._id.toString() ===
          item.product.toString()
      );

      if (!product) {
        throw new ApiError(
          404,
          "Product not found"
        );
      }

      return {
        product: product._id,
        name: product.name,
        image: product.image,
        quantity: item.quantity,
        price: product.price,
      };
    }
  );

  const itemsPrice = verifiedOrderItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  const discount = DEFAULT_DISCOUNT;

  const shippingPrice =
    itemsPrice > 0
      ? SHIPPING_PRICE
      : 0;

  const totalPrice =
    itemsPrice +
    shippingPrice -
    discount;

  return orderRepository.createOrder({
    user: userId,
    orderItems: verifiedOrderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    discount,
    totalPrice,
  });
};

// ==============================
// Get My Orders
// ==============================

const getMyOrders = (userId) =>
  orderRepository.getOrdersByUser(userId);

// ==============================
// Get Single Order
// ==============================

const getOrderById = async (
  orderId,
  userId
) => {
  const order =
    await orderRepository.getOrderById(
      orderId
    );

  if (!order) {
    throw new ApiError(
      404,
      "Order not found"
    );
  }

  if (
    order.user._id.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "You are not authorized to access this order"
    );
  }

  return order;
};

// ==============================
// Find Order By ID
// ==============================

const findOrderById = async (orderId) => {
  const order =
    await orderRepository.findOrderById(
      orderId
    );

  if (!order) {
    throw new ApiError(
      404,
      "Order not found"
    );
  }

  return order;
};

// ==============================
// Cancel Order
// ==============================

const cancelOrder = async (
  orderId,
  userId
) => {
  const order =
    await findOrderById(orderId);

  if (
    order.user.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "You are not authorized to cancel this order"
    );
  }

  if (
    order.orderStatus === "Cancelled"
  ) {
    throw new ApiError(
      400,
      "Order is already cancelled"
    );
  }

  if (
    order.orderStatus === "Delivered"
  ) {
    throw new ApiError(
      400,
      "Delivered order cannot be cancelled"
    );
  }

  order.orderStatus = "Cancelled";

  return orderRepository.saveOrder(
    order
  );
};

// ==============================
// Get All Orders - Paginated
// ==============================

const getAllOrders = async (
  query = {}
) => {
  const page = parsePositiveInteger(
    query.page,
    DEFAULT_PAGE,
    Number.MAX_SAFE_INTEGER
  );

  const limit = parsePositiveInteger(
    query.limit,
    DEFAULT_LIMIT,
    MAX_ORDER_LIMIT
  );

  const skip = (page - 1) * limit;

  const [
    orders,
    totalOrders,
  ] = await Promise.all([
    orderRepository.getAllOrders({
      skip,
      limit,
    }),
    orderRepository.countOrders(),
  ]);

  return {
    orders,
    currentPage: page,
    totalPages: Math.ceil(
      totalOrders / limit
    ),
    totalOrders,
    limit,
  };
};

// ==============================
// Best Selling Products
// ==============================

const getBestSellingProducts = () =>
  orderRepository.getBestSellingProducts();

// ==============================
// Update Order Status
// ==============================

const updateOrderStatus = async (
  orderId,
  status
) => {
  const order =
    await findOrderById(orderId);

  order.orderStatus = status;

  if (status === "Delivered") {
    order.deliveredAt = new Date();
  }

  return orderRepository.saveOrder(
    order
  );
};

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