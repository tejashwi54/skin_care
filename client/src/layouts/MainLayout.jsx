import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1F2937]">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;