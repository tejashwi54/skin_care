import { FiX, FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import toast from "react-hot-toast";

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!isOpen || !product) return null;

  const liked = isInWishlist(product);

  const handleAdd = async () => {
    await addToCart(product);
    toast.success("Added to Cart");
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl"
    >
      {/* Image */}
      <div className="relative bg-gray-50">
        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
          }}
          className="w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className="absolute top-5 right-5 bg-white p-3 rounded-full shadow"
        >
          <FaHeart
            className={
              liked ? "text-red-500" : "text-gray-400"
            }
          />
        </button>
      </div>

      {/* Details */}
      <div className="p-10 flex flex-col">
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold">
            {product.name}
          </h2>

          <button
            type="button"
            onClick={onClose}
          >
            <FiX className="text-3xl" />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-5">
          <FiStar className="text-yellow-500" />

          <span>{product.rating}</span>

          <span className="text-gray-500">
            ({product.reviews})
          </span>
        </div>

        <h3 className="mt-6 text-3xl text-green-600 font-bold">
          ₹{product.price}
        </h3>

        <p className="mt-6 leading-8 text-gray-500">
          {product.description}
        </p>

        <p className="mt-6 font-semibold text-green-600">
          {product.stock}
        </p>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-10 bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-semibold transition"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default QuickViewModal;

