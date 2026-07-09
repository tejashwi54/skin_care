import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardSidebar = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm p-8">

      <h2 className="text-3xl font-bold">
        My Account
      </h2>

      <div className="mt-10 space-y-4">

        <button className="w-full text-left p-4 rounded-xl bg-green-500 text-white flex items-center gap-3">
          <FaUser />
          Profile
        </button>

        <button className="w-full text-left p-4 rounded-xl hover:bg-gray-100 flex items-center gap-3">
          <FaShoppingBag />
          Orders
        </button>

        <button className="w-full text-left p-4 rounded-xl hover:bg-gray-100 flex items-center gap-3">
          <FaHeart />
          Wishlist
        </button>

        <button className="w-full text-left p-4 rounded-xl hover:bg-gray-100 flex items-center gap-3">
          <FaMapMarkerAlt />
          Addresses
        </button>

        <button className="w-full text-left p-4 rounded-xl hover:bg-red-50 text-red-500 flex items-center gap-3">
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
};

export default DashboardSidebar;