import { motion } from "framer-motion";

const HeroContent = () => {
  return (
    <>
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-md border border-gray-100"
      >
        <span className="w-3 h-3 rounded-full bg-green-500"></span>

        <span className="text-sm font-medium text-gray-700">
          Premium Skincare Collection
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-8 text-2xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-gray-900"
      >
        Reveal{" "}

        <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 bg-clip-text text-transparent italic">
          Naturally
        </span>
        <br />

        Beautiful Skin.
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-7 max-w-xl text-base leading-9 text-gray-500"
      >
        Clean ingredients. Effective skincare. A healthy glow
        starts with dermatologist-inspired products made to
        nourish, protect and transform your skin naturally.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-5 mt-9"
      >
        <button className="group bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <span className="flex items-center gap-2">
            Shop Now

            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </span>
        </button>

        <button className="px-8 py-4 rounded-full border border-gray-300 bg-white text-base font-semibold text-gray-800 shadow-md hover:border-green-500 hover:text-green-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          Explore Collection
        </button>
      </motion.div>
    </>
  );
};

export default HeroContent;