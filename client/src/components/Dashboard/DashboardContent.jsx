const DashboardContent = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm p-10">

      <h2 className="text-4xl font-bold">
        Welcome Back 👋
      </h2>

      <p className="mt-4 text-gray-500">
        Manage your profile, orders, wishlist, and addresses from your dashboard.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-green-50 rounded-2xl p-6">
          <h3 className="text-3xl font-bold">12</h3>
          <p className="text-gray-600 mt-2">Orders</p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6">
          <h3 className="text-3xl font-bold">5</h3>
          <p className="text-gray-600 mt-2">Wishlist</p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6">
          <h3 className="text-3xl font-bold">2</h3>
          <p className="text-gray-600 mt-2">Addresses</p>
        </div>

      </div>

    </div>
  );
};

export default DashboardContent;