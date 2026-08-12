import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getBestSellingProducts } from "../../api/productApi";
import ProductCard from "../common/ProductCard";
import { getId } from "../../utils/getId";

const BestSellingProducts = () => {
  console.log("🔥 BEST SELLING COMPONENT RENDERED");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔥 BEST SELLING USE EFFECT RUNNING");

    fetchBestSellingProducts();
  }, []);

  const fetchBestSellingProducts = async () => {
    try {
      console.log("🔥 FETCHING BEST SELLING PRODUCTS...");

      const response = await getBestSellingProducts();

      console.log(
        "🔥 BEST SELLING FRONTEND RESPONSE:",
        response
      );

      console.log(
        "🔥 BEST SELLING PRODUCTS DATA:",
        response?.data
      );

      setProducts(response?.data || []);
    } catch (error) {
      console.error(
        "❌ BEST SELLING FRONTEND ERROR:",
        error
      );

      console.error(
        "❌ BEST SELLING ERROR RESPONSE:",
        error?.response?.data
      );
    } finally {
      console.log("🔥 BEST SELLING LOADING FINISHED");

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Best Selling Products...
      </div>
    );
  }

  if (products.length === 0) {
    console.log("⚠️ NO BEST SELLING PRODUCTS FOUND");

    return null;
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-center mb-14"
        >
          <div>
            <p className="uppercase tracking-[5px] text-green-600 font-semibold">
              Customer Favorites
            </p>

            <h2 className="text-5xl font-bold mt-3 text-gray-900">
              Best Selling Products
            </h2>

            <p className="mt-4 text-gray-500 max-w-xl">
              Discover the skincare products loved and
              purchased most by our customers.
            </p>
          </div>

          <Link
            to="/shop"
            className="mt-8 lg:mt-0 border border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-full transition font-semibold"
          >
            View All Products
          </Link>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={getId(product)}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;