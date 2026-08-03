import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("profile");

  return (
    <MainLayout>
      <section className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Welcome Section */}
          <div className="mb-8 bg-white rounded-3xl shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome Back,
              <span className="text-green-600">
                {" "}
                {user?.name || "User"}
              </span>
              👋
            </h1>

            <p className="mt-3 text-gray-500 text-lg">
              Manage your profile, orders and wishlist from your dashboard.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <div className="w-full lg:w-[280px] flex-shrink-0">
              <DashboardSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* Dashboard Content */}
            <div className="flex-1">
              <DashboardContent activeTab={activeTab} />
            </div>

          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;