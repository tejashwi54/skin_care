import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAllProducts } from "../../api/productApi";
import ProductCard from "../common/ProductCard";
import { getId } from "../../utils/getId";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts({
  limit: 50,
});

      const featuredProducts = response.data.products
        .filter((product) => product.featured)
        .slice(0, 4);

      setProducts(featuredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
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
              Curated For You
            </p>

            <h2 className="text-5xl font-bold mt-3 text-gray-900">
              Featured Products
            </h2>

            <p className="mt-4 text-gray-500 max-w-xl">
              Discover our specially selected skincare products.
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

export default FeaturedProducts;
