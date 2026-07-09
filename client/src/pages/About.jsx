import MainLayout from "../layouts/MainLayout";
import AboutHero from "../components/about/AboutHero";
import AboutStory from "../components/about/AboutStory";
import WhyChooseUs from "../components/about/WhyChooseUs";

const About = () => {
  return (
    <MainLayout>
      <section className="bg-gray-50 min-h-screen py-20">

        <div className="max-w-7xl mx-auto px-6">

          <AboutHero />

          <AboutStory />

          <WhyChooseUs />

        </div>

      </section>
    </MainLayout>
  );
};

export default About;