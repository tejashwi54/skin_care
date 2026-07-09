import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <MainLayout>
      <section className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="flex flex-col lg:flex-row gap-8">

            <div className="w-full lg:w-[280px] flex-shrink-0">
              <DashboardSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

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