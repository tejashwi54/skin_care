import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1F2937]">
      <Navbar />

      <main>{children}</main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;