import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import HeroImage from "./HeroImage";

const Hero = () => {
  return (
    <section className="pt-24 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <HeroContent />
          <HeroStats />
        </div>

        {/* Right */}
        <HeroImage />

      </div>

    </section>
  );
};

export default Hero;