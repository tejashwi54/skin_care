import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const ShopSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
}) => {
  const [maxPrice, setMaxPrice] = useState(2500);

  return (
    <div className="bg-white rounded-[32px] shadow-lg p-8 sticky top-28 border border-gray-100">

      {/* Search */}
      <div>
        <h3 className="uppercase text-sm tracking-[3px] font-semibold text-gray-500 mb-4">
          Search
        </h3>

        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-200 py-4 pl-12 pr-4 outline-none focus:border-green-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-10">
        <h3 className="uppercase text-sm tracking-[3px] font-semibold text-gray-500 mb-5">
          Categories
        </h3>

        <div className="space-y-3">
          {[
            "All",
            "Face Mask",
            "Serums",
            "Moisturizers",
            "Sunscreen",
            "Body Wash",
            "Cleanser",
            "Night Care",
            "Toner",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`w-full text-left px-4 py-3 rounded-full transition ${
                category === item
                  ? "bg-green-500 text-white"
                  : "hover:bg-green-50 text-gray-700"
              }`}
            >
              {item === "All" ? "All Products" : item}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mt-10">
        <div className="flex justify-between mb-4">
          <h3 className="uppercase text-sm tracking-[3px] font-semibold text-gray-500">
            Max Price
          </h3>

          <span className="font-semibold text-green-600">
            ₹{maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="2500"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Number(e.target.value))
          }
          className="w-full accent-green-500"
        />
      </div>

      {/* Rating */}
      <div className="mt-7">
        <h3 className="uppercase text-sm tracking-[3px] font-semibold text-gray-500 mb-5">
          Rating
        </h3>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" />
            ☆
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" />
            ☆☆
          </label>
        </div>
      </div>

      {/* Availability */}
      <div className="mt-7">
        <h3 className="uppercase text-sm tracking-[3px] font-semibold text-gray-500 mb-5">
          Availability
        </h3>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" />
            In Stock
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" />
            Out of Stock
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setSearch("");
          setCategory("All");
          setMaxPrice(2500);
        }}
        className="mt-7 w-full border border-green-500 text-green-600 py-2.5 rounded-full text-sm font-medium hover:bg-green-500 hover:text-white transition"
      >
        Clear Filters
      </button>

    </div>
  );
};

export default ShopSidebar;