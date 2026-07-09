import { productData } from "../../constants/productData";
import ProductCard from "../common/ProductCard";

const ProductGrid = ({
  search = "",
  category = "All",
  sort = "featured",
  setSort,
}) => {

  // Filter Products
  const filteredProducts = productData.filter((product) => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
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

        <p className="text-gray-500 text-lg">
          Showing
          <span className="font-semibold text-gray-900 mx-2">
            {sortedProducts.length}
          </span>
          Products
        </p>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            border
            border-gray-300
            rounded-full
            px-6
            py-3
            outline-none
            focus:border-green-500
            bg-white
            transition
          "
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

          <h2 className="text-3xl font-bold text-gray-800">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-3">
            Try searching with another keyword or category.
          </p>

        </div>

      )}

    </>
  );
};

export default ProductGrid;