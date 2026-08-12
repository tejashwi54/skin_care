import { useEffect, useState } from "react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

import MyOrders from "../../pages/MyOrders";

import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";

import { getDashboardStats } from "../../api/dashboardApi";
import { getMyOrders } from "../../api/orderApi";

const DashboardContent = ({ activeTab }) => {
  console.log("DashboardContent activeTab:", activeTab);

  const { user } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  // ==============================
  // Admin Dashboard Stats
  // ==============================

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalCustomers: 0,
  });

  // ==============================
  // Normal User Orders Count
  // ==============================

  const [myOrdersCount, setMyOrdersCount] = useState(0);

  // ==============================
  // Loading
  // ==============================

  const [statsLoading, setStatsLoading] = useState(false);

  // ==============================
  // Load Admin Dashboard Stats
  // ==============================

  const loadDashboardStats = async () => {
    try {
      setStatsLoading(true);

      const response = await getDashboardStats();

      console.log("DASHBOARD STATS RESPONSE:", response);

      setStats(
        response?.data || {
          totalProducts: 0,
          totalOrders: 0,
          pendingOrders: 0,
          totalCustomers: 0,
        }
      );
    } catch (error) {
      console.error(
        "Failed to load dashboard statistics:",
        error
      );
    } finally {
      setStatsLoading(false);
    }
  };

  // ==============================
  // Load Normal User Orders Count
  // ==============================

  const loadMyOrdersCount = async () => {
    try {
      const response = await getMyOrders();

      console.log("MY ORDERS RESPONSE:", response);

      setMyOrdersCount(response?.data?.length || 0);
    } catch (error) {
      console.error(
        "Failed to load user orders count:",
        error
      );

      setMyOrdersCount(0);
    }
  };

  // ==============================
  // Load Admin Stats
  // ==============================

  useEffect(() => {
    if (user?.role === "admin") {
      loadDashboardStats();
    }
  }, [user]);

  // ==============================
  // Load User Orders Count
  // ==============================

  useEffect(() => {
    if (user?.role === "user") {
      loadMyOrdersCount();
    }
  }, [user]);

  // ==============================
  // Profile
  // ==============================

  if (activeTab === "profile") {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <h2 className="text-3xl font-bold text-gray-900">
          My Profile
        </h2>

        <p className="mt-2 text-gray-500">
          Manage your account information.
        </p>

        <div className="mt-8 space-y-5">

          {/* Name */}

          <div className="border rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <p className="mt-1 text-lg font-semibold text-gray-900">
              {user?.name || "N/A"}
            </p>
          </div>

          {/* Email */}

          <div className="border rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              Email Address
            </p>

            <p className="mt-1 text-lg font-semibold text-gray-900">
              {user?.email || "N/A"}
            </p>
          </div>

          {/* Role */}

          <div className="border rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              Account Role
            </p>

            <p className="mt-1 text-lg font-semibold text-green-600">
              {user?.role === "admin"
                ? "Administrator"
                : "User"}
            </p>
          </div>

          {/* Verification */}

          <div className="border rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              Account Status
            </p>

            <p className="mt-1 text-lg font-semibold text-green-600">
              {user?.isVerified
                ? "Verified"
                : "Not Verified"}
            </p>
          </div>

        </div>
      </div>
    );
  }

  // ==============================
  // Orders
  // ==============================

  if (activeTab === "orders") {
    if (user?.role === "admin") {
      return <AdminOrders />;
    }

    return <MyOrders />;
  }

  // ==============================
  // Address
  // ==============================

  if (activeTab === "address") {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <h2 className="text-3xl font-bold">
          Saved Addresses
        </h2>

        <p className="mt-5 text-gray-500">
          No saved addresses available.
        </p>
      </div>
    );
  }

  // ==============================
  // Products
  // ==============================

  if (activeTab === "products") {
    if (user?.role === "admin") {
      return <AdminProducts />;
    }

    return null;
  }

  // ==============================
  // Dashboard Home
  // ==============================

  return (
    <div>

      <h2 className="text-4xl font-bold">
        Welcome Back 👋
      </h2>

      <p className="mt-4 text-gray-500">
        {user?.role === "admin"
          ? "Manage your store, products, orders and customers."
          : "Manage your profile, orders, cart and wishlist."}
      </p>

      {/* ==============================
          ADMIN DASHBOARD
      ============================== */}

      {user?.role === "admin" ? (
        <>
          {/* Admin Stats */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            {/* Products */}

            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-green-600">
                {statsLoading
                  ? "..."
                  : stats.totalProducts}
              </h3>

              <p className="mt-2 text-gray-600">
                Products
              </p>
            </div>

            {/* Orders */}

            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-green-600">
                {statsLoading
                  ? "..."
                  : stats.totalOrders}
              </h3>

              <p className="mt-2 text-gray-600">
                Orders
              </p>
            </div>

            {/* Pending Orders */}

            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-green-600">
                {statsLoading
                  ? "..."
                  : stats.pendingOrders}
              </h3>

              <p className="mt-2 text-gray-600">
                Pending Orders
              </p>
            </div>

            {/* Customers */}

            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-green-600">
                {statsLoading
                  ? "..."
                  : stats.totalCustomers}
              </h3>

              <p className="mt-2 text-gray-600">
                Customers
              </p>
            </div>

          </div>
        </>
      ) : (

        /* ==============================
           NORMAL USER DASHBOARD
        ============================== */

        <>
          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {/* Orders */}

            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-green-600">
                {myOrdersCount}
              </h3>

              <p className="mt-2 text-gray-600">
                Orders
              </p>
            </div>

            {/* Wishlist */}

            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-green-600">
                {wishlistItems.length}
              </h3>

              <p className="mt-2 text-gray-600">
                Wishlist
              </p>
            </div>

            {/* Cart */}

            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-green-600">
                {cartItems.length}
              </h3>

              <p className="mt-2 text-gray-600">
                Cart
              </p>
            </div>

          </div>

          {/* Recent Wishlist */}

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

                {wishlistItems
                  .slice(0, 3)
                  .map((item) => (

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

        </>
      )}

    </div>
  );
};

export default DashboardContent;

