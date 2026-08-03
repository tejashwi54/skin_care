import { useState, useEffect } from "react";
import { getAllProducts } from "../../api/productApi";
import ProductCard from "../common/ProductCard";
import SkeletonCard from "../common/SkeletonCard";

const ProductGrid = ({
  search = "",
  category = "All",
  type = null,
}) => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [search, category, type]);

  const fetchProducts = async () => {
    try {
      const params = {};

      if (search) {
        params.search = search;
      }

      if (category !== "All") {
        params.category = category;
      }

      const response = await getAllProducts(params);

      let fetchedProducts = response.data.products;

      if (type === "bestseller") {
        fetchedProducts = fetchedProducts.filter(
          (product) => product.featured
        );
      }

      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sorting
  const sortedProducts = [...products];

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
      sortedProducts.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;

    default:
      break;
  }

  // Loading State
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <SkeletonCard key={item} />
        ))}
      </div>
    );
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

      {sortedProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

          {sortedProducts.map((product) => (
            <ProductCard
              key={product._id}
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