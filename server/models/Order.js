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
<<<<<<< HEAD
          min: 1,
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
        },

        price: {
          type: Number,
          required: true,
<<<<<<< HEAD
          min: 0,
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
        },
      },
    ],

    shippingAddress: {
<<<<<<< HEAD
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pinCode: {
        type: String,
        required: true,
      },
=======
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pinCode: String,
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "CARD", "COD"],
      default: "COD",
    },

<<<<<<< HEAD
    itemsPrice: {
      type: Number,
      required: true,
      min: 0,
    },
=======
    itemsPrice: Number,
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

    shippingPrice: {
      type: Number,
      default: 0,
<<<<<<< HEAD
      min: 0,
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
    },

    discount: {
      type: Number,
      default: 0,
<<<<<<< HEAD
      min: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
=======
    },

    totalPrice: Number,
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df

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

    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
// ==============================
// Database Indexes
// ==============================

// User order history
orderSchema.index({ user: 1 });

// Order status filtering
orderSchema.index({ orderStatus: 1 });

// Latest orders
orderSchema.index({ createdAt: -1 });

// User + latest orders
orderSchema.index({ user: 1, createdAt: -1 });

// Paid orders
orderSchema.index({ isPaid: 1 });

=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
module.exports = mongoose.model(
  "Order",
  orderSchema
);