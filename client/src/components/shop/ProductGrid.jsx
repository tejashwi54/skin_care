import { useState, useEffect } from "react";
import { productData } from "../../constants/productData";
import ProductCard from "../common/ProductCard";
import SkeletonCard from "../common/SkeletonCard";

const ProductGrid = ({
  search = "",
  category = "All",
  type = null,
}) => {
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Skeleton Loader
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <SkeletonCard key={item} />
        ))}
      </div>
    );
  }

  // Filter Products
  const filteredProducts = productData.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    const matchesType =
      type === "bestseller"
        ? product.bestSeller === true
        : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesType
    );
  });

  // Sort Products
  const sortedProducts = [...filteredProducts];

  switch (sort) {
    case "low":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "high":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "rating":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;

    case "newest":
      sortedProducts.sort((a, b) => b.id - a.id);
      break;

    default:
      break;
  }

  return (
    <>
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

        <div>
          <h2 className="text-3xl font-bold">
            {type === "bestseller"
              ? "Best Selling Products"
              : "All Products"}
          </h2>

          <p className="text-gray-500 mt-2">
            Showing {sortedProducts.length} Products
          </p>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-full px-6 py-3 bg-white outline-none focus:border-green-500"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>

      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      ) : (

        <div className="bg-white rounded-3xl shadow-md py-24 text-center">

          <h2 className="text-3xl font-bold">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-3">
            Try another filter.
          </p>

        </div>

      )}

    </>
  );
};

export default ProductGrid;