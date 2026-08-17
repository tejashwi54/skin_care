const ApiError = require("../utils/ApiError");
const Product = require("../models/Product");
const orderRepository = require("../repositories/order.repository");

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_PRICE = 99;

const DISCOUNT_THRESHOLD = 2000;
const DISCOUNT_AMOUNT = 200;

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_ORDER_LIMIT = 50;

// ==============================
// Helpers
// ==============================

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

const placeOrder = async (
  userId,
  orderData
) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
  } = orderData;

  // --------------------------------
  // Get unique product IDs
  // --------------------------------

  const productIds = [
    ...new Set(
      orderItems.map((item) =>
        item.product.toString()
      )
    ),
  ];

  // --------------------------------
  // Fetch products
  // --------------------------------

  const products = await Product.find({
    _id: {
      $in: productIds,
    },
  }).lean();

  if (
    products.length !== productIds.length
  ) {
    throw new ApiError(
      404,
      "One or more products were not found"
    );
  }

  // --------------------------------
  // Validate stock
  // --------------------------------

  const quantityByProduct = {};

  for (const item of orderItems) {
    const productId =
      item.product.toString();

    quantityByProduct[productId] =
      (quantityByProduct[productId] || 0) +
      Number(item.quantity);
  }

  for (const product of products) {
    const requestedQuantity =
      quantityByProduct[
        product._id.toString()
      ];

    if (
      requestedQuantity >
      product.stock
    ) {
      throw new ApiError(
        400,
        `Insufficient stock for ${product.name}. Available stock: ${product.stock}`
      );
    }
  }

  // --------------------------------
  // Create verified order items
  // --------------------------------

  const verifiedOrderItems =
    orderItems.map((item) => {
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
    });

  // --------------------------------
  // Calculate prices server-side
  // --------------------------------

  const itemsPrice =
    verifiedOrderItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

  // Free shipping for orders >= ₹999
  const shippingPrice =
    itemsPrice >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_PRICE;

  // ₹200 discount for orders >= ₹2000
  const discount =
    itemsPrice >= DISCOUNT_THRESHOLD
      ? DISCOUNT_AMOUNT
      : 0;

  const totalPrice =
    itemsPrice +
    shippingPrice -
    discount;

  // --------------------------------
  // Deduct stock atomically
  // --------------------------------

  const updatedProducts = [];

  try {
    for (const product of products) {
      const quantity =
        quantityByProduct[
          product._id.toString()
        ];

      const updatedProduct =
        await Product.findOneAndUpdate(
          {
            _id: product._id,
            stock: {
              $gte: quantity,
            },
          },
          {
            $inc: {
              stock: -quantity,
            },
          },
          {
            new: true,
          }
        );

      if (!updatedProduct) {
        throw new ApiError(
          400,
          `Insufficient stock for ${product.name}`
        );
      }

      updatedProducts.push({
        productId: product._id,
        quantity,
      });
    }

    // --------------------------------
    // Create order
    // --------------------------------

    const order =
      await orderRepository.createOrder({
        user: userId,
        orderItems: verifiedOrderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        discount,
        totalPrice,
      });

    return order;
  } catch (error) {
    // --------------------------------
    // Restore stock if order creation
    // fails after stock deduction
    // --------------------------------

    if (updatedProducts.length > 0) {
      for (const item of updatedProducts) {
        await Product.findByIdAndUpdate(
          item.productId,
          {
            $inc: {
              stock: item.quantity,
            },
          }
        );
      }
    }

    throw error;
  }
};

// ==============================
// Get My Orders
// ==============================

const getMyOrders = (userId) =>
  orderRepository.getOrdersByUser(
    userId
  );

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

const findOrderById = async (
  orderId
) => {
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
// Restore Stock
// ==============================

const restoreOrderStock = async (
  order
) => {
  for (const item of order.orderItems) {
    await Product.findByIdAndUpdate(
      item.product,
      {
        $inc: {
          stock: item.quantity,
        },
      }
    );
  }
};

// ==============================
// Cancel Order - User
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

  // Restore stock
  await restoreOrderStock(order);

  order.orderStatus =
    "Cancelled";

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
  const page =
    parsePositiveInteger(
      query.page,
      DEFAULT_PAGE,
      Number.MAX_SAFE_INTEGER
    );

  const limit =
    parsePositiveInteger(
      query.limit,
      DEFAULT_LIMIT,
      MAX_ORDER_LIMIT
    );

  const skip =
    (page - 1) * limit;

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
    totalPages:
      Math.ceil(
        totalOrders / limit
      ),
    totalOrders,
    limit,
  };
};

// ==============================
// Best Selling Products
// ==============================

const getBestSellingProducts =
  () =>
    orderRepository.getBestSellingProducts();

// ==============================
// Update Order Status - Admin
// ==============================

const updateOrderStatus = async (
  orderId,
  status
) => {
  const order =
    await findOrderById(orderId);

  // Prevent changing a cancelled order
  // back to another status.
  if (
    order.orderStatus ===
      "Cancelled" &&
    status !== "Cancelled"
  ) {
    throw new ApiError(
      400,
      "Cancelled order cannot be reopened"
    );
  }

  // Restore stock only when the order
  // is being cancelled for the first time.
  if (
    status === "Cancelled" &&
    order.orderStatus !==
      "Cancelled"
  ) {
    await restoreOrderStock(order);
  }

  order.orderStatus = status;

  if (status === "Delivered") {
    order.deliveredAt =
      new Date();
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