import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { productData } from "../../constants/productData";
import ProductCard from "../common/ProductCard";

const FeaturedProducts = () => {
  const featured = productData.filter(
    (product) => product.bestSeller
  );

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
              Discover dermatologist-approved skincare products loved by thousands of customers.
            </p>

          </div>

          <Link
            to="/shop?type=bestseller"
            className="mt-8 lg:mt-0 border border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-full transition font-semibold"
          >
            View All Products
          </Link>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedProducts;