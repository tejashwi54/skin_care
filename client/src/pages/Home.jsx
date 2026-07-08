import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </MainLayout>
  );
};

export default Home;