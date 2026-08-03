import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAllProducts } from "../../api/productApi";
import ProductCard from "../common/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();

      console.log("API Response:", response);

      // Backend response:
      // response.data.products
      const allProducts = response.data?.products || [];

      console.log("Products:", allProducts);

      const featuredProducts =
        allProducts.filter((product) => product.featured).length > 0
          ? allProducts.filter((product) => product.featured).slice(0, 4)
          : allProducts.slice(0, 4);

      setProducts(featuredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium">
        Loading Products...
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
              Featured Collection
            </p>

            <h2 className="text-5xl font-bold mt-3 text-gray-900">
              Best Selling Products
            </h2>

            <p className="mt-4 text-gray-500 max-w-xl">
              Discover dermatologist-approved skincare products loved by
              thousands of customers.
            </p>
          </div>

          <Link
            to="/shop"
            className="mt-8 lg:mt-0 border border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-full transition font-semibold"
          >
            View All Products
          </Link>
        </motion.div>

        {products.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 text-lg">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;