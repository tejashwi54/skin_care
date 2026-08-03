const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Product image is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    oldPrice: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 5,
<<<<<<< HEAD
      min: 0,
      max: 5,
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
    },

    reviews: {
      type: Number,
      default: 0,
<<<<<<< HEAD
      min: 0,
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
    },

    badge: {
      type: String,
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
// ==============================
// Database Indexes
// ==============================

// Search by category
productSchema.index({ category: 1 });

// Featured products
productSchema.index({ featured: 1 });

// Price sorting/filtering
productSchema.index({ price: 1 });

// Rating sorting
productSchema.index({ rating: -1 });

// Latest products
productSchema.index({ createdAt: -1 });

// Search by name
productSchema.index({ name: "text" });

=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
module.exports = mongoose.model(
  "Product",
  productSchema
);