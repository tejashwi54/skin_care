import { useState } from "react";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import {
  FiTruck,
  FiShield,
  FiRefreshCcw,
} from "react-icons/fi";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <div className="max-w-[520px]">

      {/* Rating */}
      <div className="flex items-center gap-2">

        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>

        <span className="font-semibold">
          {product.rating}
        </span>

        <span className="text-gray-500">
          ({product.reviews} Reviews)
        </span>

      </div>

      {/* Product Name */}
      <h1 className="mt-5 text-5xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-center gap-4 mt-8">

        <span className="text-4xl font-bold text-green-600">
          ₹{product.price}
        </span>

        <span className="text-2xl line-through text-gray-400">
          ₹{product.oldPrice}
        </span>

        <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-semibold">
          {discount}% OFF
        </span>

      </div>

      {/* Stock */}
      <p className="mt-4 text-green-600 font-semibold">
        ✓ {product.stock}
      </p>

      {/* Description */}
      <p className="mt-8 text-gray-600 leading-8">
        Experience premium skincare with{" "}
        <span className="font-semibold">
          {product.name}
        </span>
        . Carefully formulated using dermatologist-inspired
        ingredients to nourish, hydrate and protect your skin
        for a naturally healthy glow.
      </p>

      {/* Quantity */}
      <div className="flex items-center gap-5 mt-10">

        <span className="font-semibold">
          Quantity
        </span>

        <div className="flex items-center border rounded-full overflow-hidden">

          <button
            onClick={() =>
              quantity > 1 &&
              setQuantity(quantity - 1)
            }
            className="px-5 py-3 hover:bg-gray-100"
          >
            −
          </button>

          <span className="px-6 font-semibold">
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
            className="px-5 py-3 hover:bg-gray-100"
          >
            +
          </button>

        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-10">

        <button className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition">
          <FaShoppingCart />
          Add To Cart
        </button>

        <button className="bg-black hover:bg-gray-800 text-white py-4 rounded-full font-semibold transition">
          Buy Now
        </button>

        <button className="border py-4 rounded-full font-semibold hover:bg-gray-50 flex items-center justify-center gap-3 transition">
          <FaHeart />
          Add To Wishlist
        </button>

      </div>

      {/* Features */}
      <div className="mt-12 space-y-5 border-t pt-8">

        <div className="flex items-center gap-4">
          <FiTruck className="text-2xl text-green-500" />
          <span>Free Shipping on Orders Above ₹999</span>
        </div>

        <div className="flex items-center gap-4">
          <FiShield className="text-2xl text-green-500" />
          <span>100% Secure Payment</span>
        </div>

        <div className="flex items-center gap-4">
          <FiRefreshCcw className="text-2xl text-green-500" />
          <span>Easy 7-Day Returns</span>
        </div>

      </div>

    </div>
  );
};

export default ProductInfo;