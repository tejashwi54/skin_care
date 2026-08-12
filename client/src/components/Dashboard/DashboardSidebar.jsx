import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaBoxOpen,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  // ==============================
  // Normal User Menu
  // ==============================

  const userMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaHome />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <FaUser />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <FaShoppingBag />,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: <FaHeart />,
    },
    {
      id: "address",
      label: "Addresses",
      icon: <FaMapMarkerAlt />,
    },
  ];

  // ==============================
  // Admin Menu
  // ==============================

  const adminMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaHome />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <FaUser />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <FaShoppingBag />,
    },
    {
      id: "products",
      label: "Products",
      icon: <FaBoxOpen />,
    },
  ];

  // ==============================
  // Select Menu
  // ==============================

  const menuItems =
    user?.role === "admin"
      ? adminMenuItems
      : userMenuItems;

  // ==============================
  // Menu Click
  // ==============================

  const handleClick = (id) => {
    if (id === "wishlist") {
      navigate("/wishlist");
      return;
    }

    setActiveTab(id);
  };

  // ==============================
  // Logout
  // ==============================

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });

      window.history.pushState(null, "", "/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">

      {/* Sidebar Title */}

      <h2 className="text-2xl font-bold mb-6">
        {user?.role === "admin"
          ? "Admin Account"
          : "My Account"}
      </h2>

      <div className="space-y-3">

        {/* Menu Items */}

        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === item.id
                ? "bg-green-500 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item.icon}

            <span>{item.label}</span>
          </button>
        ))}

        {/* Logout */}

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 rounded-xl text-red-500 hover:bg-red-50 transition-all cursor-pointer"
        >
          <FaSignOutAlt />

          <span>Logout</span>
        </button>

      </div>
    </div>
  );
};

export default DashboardSidebar;

