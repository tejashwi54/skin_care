
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const menuItems = [
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

  const handleClick = (id) => {
  console.log("Clicked:", id);

  if (id === "wishlist") {
    navigate("/wishlist");
  } else {
    setActiveTab(id);
  }
};

  return (
    <div className="bg-white rounded-3xl shadow-md p-8 sticky top-28">

      <h2 className="text-3xl font-bold mb-8">
        My Account
      </h2>

      <div className="space-y-3">

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

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 p-4 rounded-xl text-red-500 hover:bg-red-50 transition-all cursor-pointer"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  );
};

export default DashboardSidebar;