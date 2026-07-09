import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const DashboardContent = ({ activeTab }) => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  if (activeTab === "orders") {
    return (
      <div className="bg-white rounded-3xl shadow-md p-10">
        <h2 className="text-4xl font-bold">
          My Orders
        </h2>

        <p className="mt-5 text-gray-500">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  if (activeTab === "address") {
    return (
      <div className="bg-white rounded-3xl shadow-md p-10">
        <h2 className="text-4xl font-bold">
          Saved Addresses
        </h2>

        <p className="mt-5 text-gray-500">
          No saved addresses available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-md p-10">

      <h2 className="text-4xl font-bold">
        Welcome Back 👋
      </h2>

      <p className="mt-4 text-gray-500">
        Manage your profile, orders, cart and wishlist.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-green-50 rounded-2xl p-6">
          <h3 className="text-4xl font-bold text-green-600">
            0
          </h3>

          <p className="mt-2 text-gray-600">
            Orders
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6">
          <h3 className="text-4xl font-bold text-green-600">
            {wishlistItems.length}
          </h3>

          <p className="mt-2 text-gray-600">
            Wishlist
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6">
          <h3 className="text-4xl font-bold text-green-600">
            {cartItems.length}
          </h3>

          <p className="mt-2 text-gray-600">
            Cart
          </p>
        </div>

      </div>

      <div className="mt-12">

        <h3 className="text-2xl font-bold mb-6">
          Recent Wishlist
        </h3>

        {wishlistItems.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-500">
            Your wishlist is empty.
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-2xl p-5"
              >
                <div>
                  <h4 className="font-semibold text-lg">
                    {item.name}
                  </h4>

                  <p className="text-gray-500">
                    {item.category}
                  </p>
                </div>

                <span className="font-bold text-green-600">
                  ₹{item.price}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default DashboardContent;