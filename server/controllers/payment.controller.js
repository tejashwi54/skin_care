const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const paymentService = require("../services/payment.service");

// ==============================
// Create Razorpay Payment Order
// ==============================

const createPaymentOrder = asyncHandler(
  async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
      throw new ApiError(
        400,
        "Order ID is required"
      );
    }

    const result =
      await paymentService.createPaymentOrder(
        orderId,
        req.user._id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "Payment order created successfully",
        result
      )
    );
  }
);

// ==============================
// Verify Razorpay Payment
// ==============================

const verifyPayment = asyncHandler(
  async (req, res) => {
    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;

    if (
      !orderId ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      throw new ApiError(
        400,
        "Payment verification details are required"
      );
    }

    const order =
      await paymentService.verifyPayment({
        orderId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        userId: req.user._id,
      });

    res.status(200).json(
      new ApiResponse(
        200,
        "Payment verified successfully",
        {
          order,
        }
      )
    );
  }
);

module.exports = {
  createPaymentOrder,
  verifyPayment,
};