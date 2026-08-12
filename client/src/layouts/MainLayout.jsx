import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;

