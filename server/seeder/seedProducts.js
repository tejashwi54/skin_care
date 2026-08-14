const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("../models/Product");
const logger = require("../utils/logger");

dotenv.config();

const products = [
  {
    name: "SPF 50 Daily Sunscreen",
    description:
      "Lightweight sunscreen with SPF 50 for daily UV protection.",
    category: "Sunscreen",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    price: 899,
    oldPrice: 1099,
    stock: 50,
    featured: true,
    rating: 4.9,
    reviews: 325,
    badge: "Best Seller",
  },
  {
    name: "Vitamin C Brightening Serum",
    description:
      "Vitamin C serum for glowing and radiant skin.",
    category: "Serums",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
    price: 999,
    oldPrice: 1299,
    stock: 40,
    featured: true,
    rating: 4.8,
    reviews: 280,
    badge: "New",
  },
  {
    name: "Hydrating Moisturizer",
    description:
      "Deep hydration moisturizer for dry skin.",
    category: "Moisturizers",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd",
    price: 799,
    oldPrice: 999,
    stock: 60,
    featured: true,
    rating: 4.9,
    reviews: 210,
    badge: "Popular",
  },
  {
    name: "Clay Detox Face Mask",
    description:
      "Natural clay mask for deep pore cleansing.",
    category: "Face Mask",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
    price: 699,
    oldPrice: 899,
    stock: 30,
    featured: false,
    rating: 4.7,
    reviews: 185,
    badge: "Sale",
  },
  {
    name: "Refreshing Body Wash",
    description:
      "Refreshing body wash with natural ingredients.",
    category: "Body Wash",
    image:
      "https://images.unsplash.com/photo-1601612628452-9e99ced43524",
    price: 599,
    oldPrice: 749,
    stock: 80,
    featured: false,
    rating: 4.8,
    reviews: 160,
    badge: "Trending",
  },
  {
    name: "Green Tea Purifying Cleanser",
    description:
      "Gentle cleanser enriched with green tea extracts.",
    category: "Cleanser",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    price: 649,
    oldPrice: 799,
    stock: 35,
    featured: false,
    rating: 4.8,
    reviews: 224,
    badge: "New",
  },
  {
    name: "Retinol Overnight Renewal",
    description:
      "Retinol cream for overnight skin renewal.",
    category: "Night Care",
    image:
      "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137",
    price: 1199,
    oldPrice: 1499,
    stock: 25,
    featured: true,
    rating: 4.9,
    reviews: 316,
    badge: "Best Seller",
  },
  {
    name: "Rose Water Hydrating Toner",
    description:
      "Hydrating toner infused with natural rose water.",
    category: "Toner",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    price: 549,
    oldPrice: 699,
    stock: 55,
    featured: false,
    rating: 4.7,
    reviews: 187,
    badge: "Trending",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info("MongoDB Connected");

    await Product.deleteMany();
    await Product.insertMany(products);

    logger.info("Products seeded successfully");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error(`Product seeder error: ${error.message}`);

    await mongoose.disconnect();
    process.exit(1);
  }
};

seedProducts();