const crypto = require("crypto");
const Razorpay = require("razorpay");

const ApiError = require("../utils/ApiError");
const orderRepository = require("../repositories/order.repository");

// ==============================
// Razorpay Client
// ==============================

let razorpayClient = null;

const getRazorpayClient = () => {
  if (razorpayClient) {
    return razorpayClient;
  }

  if (
    !process.env.RAZORPAY_KEY_ID ||
    !process.env.RAZORPAY_KEY_SECRET
  ) {
    throw new ApiError(
      500,
      "Razorpay payment configuration is missing"
    );
  }

  razorpayClient = new Razorpay({
    key_id:
      process.env.RAZORPAY_KEY_ID,

    key_secret:
      process.env.RAZORPAY_KEY_SECRET,
  });

  return razorpayClient;
};

// ==============================
// Create Razorpay Order
// ==============================

const createPaymentOrder = async (
  orderId,
  userId
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

  if (
    order.user.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "You are not authorized to pay for this order"
    );
  }

  if (
    order.orderStatus === "Cancelled"
  ) {
    throw new ApiError(
      400,
      "Cancelled order cannot be paid"
    );
  }

  if (order.isPaid) {
    throw new ApiError(
      400,
      "Order is already paid"
    );
  }

  if (
    !["UPI", "CARD"].includes(
      order.paymentMethod
    )
  ) {
    throw new ApiError(
      400,
      "Razorpay payment is only available for UPI or CARD"
    );
  }

  // Reuse existing Razorpay order
  // instead of creating duplicates.
  if (order.razorpayOrderId) {
    return {
      orderId: order._id,
      razorpayOrderId:
        order.razorpayOrderId,

      amount: Math.round(
        order.totalPrice * 100
      ),

      currency: "INR",

      keyId:
        process.env.RAZORPAY_KEY_ID,
    };
  }

  const amount = Math.round(
    order.totalPrice * 100
  );

  if (amount <= 0) {
    throw new ApiError(
      400,
      "Invalid payment amount"
    );
  }

  const razorpay =
    getRazorpayClient();

  const razorpayOrder =
    await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: order._id.toString(),

      notes: {
        orderId:
          order._id.toString(),

        userId:
          userId.toString(),
      },
    });

  order.razorpayOrderId =
    razorpayOrder.id;

  await orderRepository.saveOrder(
    order
  );

  return {
    orderId: order._id,

    razorpayOrderId:
      razorpayOrder.id,

    amount:
      razorpayOrder.amount,

    currency:
      razorpayOrder.currency,

    keyId:
      process.env.RAZORPAY_KEY_ID,
  };
};

// ==============================
// Verify Razorpay Payment
// ==============================

const verifyPayment = async ({
  orderId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  userId,
}) => {
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

  if (
    order.user.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "You are not authorized to verify this payment"
    );
  }

  // Idempotent response.
  if (order.isPaid) {
    return order;
  }

  if (
    order.razorpayOrderId !==
    razorpayOrderId
  ) {
    throw new ApiError(
      400,
      "Invalid Razorpay order ID"
    );
  }

  if (
    !process.env.RAZORPAY_KEY_SECRET
  ) {
    throw new ApiError(
      500,
      "Razorpay payment configuration is missing"
    );
  }

  const body =
    `${razorpayOrderId}|${razorpayPaymentId}`;

  const expectedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

  if (
    typeof razorpaySignature !==
      "string" ||
    expectedSignature.length !==
      razorpaySignature.length
  ) {
    throw new ApiError(
      400,
      "Payment signature verification failed"
    );
  }

  const signaturesMatch =
    crypto.timingSafeEqual(
      Buffer.from(
        expectedSignature,
        "utf8"
      ),
      Buffer.from(
        razorpaySignature,
        "utf8"
      )
    );

  if (!signaturesMatch) {
    throw new ApiError(
      400,
      "Payment signature verification failed"
    );
  }

  order.isPaid = true;

  order.paidAt = new Date();

  order.razorpayPaymentId =
    razorpayPaymentId;

  order.razorpaySignature =
    razorpaySignature;

  if (
    order.orderStatus ===
    "Pending"
  ) {
    order.orderStatus =
      "Confirmed";
  }

  await orderRepository.saveOrder(
    order
  );

  return order;
};

// ==============================
// Exports
// ==============================

module.exports = {
  createPaymentOrder,
  verifyPayment,
};