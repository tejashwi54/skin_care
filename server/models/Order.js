const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    shippingAddress: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pinCode: String,
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "CARD", "COD"],
      default: "COD",
    },

    // ==============================
    // Order Pricing
    // ==============================

    itemsPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    shippingPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // ==============================
    // Order Status
    // ==============================

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    // ==============================
    // Razorpay Payment Details
    // ==============================

    razorpayOrderId: {
      type: String,
      default: null,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    razorpaySignature: {
      type: String,
      default: null,
    },

    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

// ==============================
// Database Indexes
// ==============================

orderSchema.index({
  user: 1,
  createdAt: -1,
});

orderSchema.index({
  createdAt: -1,
});

orderSchema.index({
  razorpayOrderId: 1,
});

orderSchema.index({
  razorpayPaymentId: 1,
});

module.exports = mongoose.model(
  "Order",
  orderSchema
);