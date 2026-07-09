import MainLayout from "../layouts/MainLayout";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <MainLayout>
      <section className="py-20 bg-gray-50 min-h-screen">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-[280px_1fr] gap-10">

            <DashboardSidebar />

            <DashboardContent />

          </div>

        </div>

      </section>
    </MainLayout>
  );
};

export default Dashboard;