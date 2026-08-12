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
    },

    reviews: {
      type: Number,
      default: 0,
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

productSchema.index({ category: 1 });

productSchema.index({
  featured: 1,
  createdAt: -1,
});

productSchema.index({
  name: "text",
  description: "text",
});

module.exports = mongoose.model(
  "Product",
  productSchema
);
