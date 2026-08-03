require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Clear old products
    await Product.deleteMany();

    // Insert new products
    await Product.insertMany([
      {
        name: "Vitamin C Serum",
        description: "Brightens skin and reduces dark spots.",
        category: "Serum",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
        price: 699,
        oldPrice: 899,
        stock: 20,
        featured: true,
        rating: 4.8,
        reviews: 120,
        badge: "Best Seller",
      },
      {
        name: "Hydrating Face Wash",
        description: "Gentle cleanser for daily use.",
        category: "Cleanser",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
        price: 399,
        oldPrice: 499,
        stock: 35,
        featured: true,
        rating: 4.7,
        reviews: 95,
        badge: "Popular",
      },
      {
        name: "Aloe Vera Gel",
        description: "Soothes and hydrates skin.",
        category: "Moisturizer",
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a",
        price: 299,
        oldPrice: 399,
        stock: 40,
        featured: false,
        rating: 4.6,
        reviews: 80,
        badge: "New",
      },
      {
        name: "Sunscreen SPF 50",
        description: "Broad spectrum UV protection.",
        category: "Sunscreen",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
        price: 599,
        oldPrice: 699,
        stock: 30,
        featured: true,
        rating: 4.9,
        reviews: 150,
        badge: "Top Rated",
      },
      {
        name: "Night Repair Cream",
        description: "Repairs skin overnight.",
        category: "Cream",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b",
        price: 899,
        oldPrice: 1099,
        stock: 15,
        featured: false,
        rating: 4.8,
        reviews: 110,
        badge: "Premium",
      }
    ]);

    console.log("✅ Products Seeded Successfully");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });