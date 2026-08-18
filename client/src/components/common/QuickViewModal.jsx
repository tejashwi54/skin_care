import { FiX } from "react-icons/fi";

const QuickViewModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 p-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <FiX className="text-2xl" />
        </button>

        {/* Product Image Only */}
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
          }}
          className="max-h-[85vh] max-w-full w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default QuickViewModal;