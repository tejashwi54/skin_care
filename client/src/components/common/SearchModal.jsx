import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

import { getAllProducts } from "../../api/productApi";

const SearchModal = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setProducts([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (search.trim()) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [search]);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts({
        search,
      });

      setProducts(response.data.products);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-center items-start pt-24 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-4 border-b px-6 py-5">
          <FiSearch className="text-2xl text-gray-400" />

          <input
            autoFocus
            type="text"
            placeholder="Search skincare products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-lg"
          />

          <button onClick={onClose}>
            <FiX className="text-2xl hover:text-red-500" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[500px] overflow-y-auto">

          {!search ? (

            <p className="text-center py-12 text-gray-400">
              Start typing to search...
            </p>

          ) : products.length > 0 ? (

            products.map((product) => (

              <Link
                key={product._id}
                to={`/product/${product._id}`}
                onClick={onClose}
                className="flex items-center gap-5 p-5 hover:bg-gray-50 transition border-b"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-semibold text-lg">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>

                  <p className="mt-2 text-green-600 font-bold">
                    ₹{product.price}
                  </p>

                </div>

              </Link>

            ))

          ) : (

            <div className="text-center py-16">

              <h3 className="text-2xl font-bold">
                No Products Found
              </h3>

              <p className="text-gray-500 mt-3">
                Try another keyword.
              </p>

            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default SearchModal;