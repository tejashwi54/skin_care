import { motion } from "framer-motion";

const HeroImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex justify-center"
    >
      {/* Main Image */}
      <motion.img
        src="https://res.cloudinary.com/tc5pypyd/image/upload/v1786536773/hero.jpg"
        alt="Clear Skin Hero"
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full max-w-lg rounded-[40px] shadow-2xl object-cover"
      />

      {/* Floating Card - Top */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
          🍊
        </div>

        <div>
          <h4 className="font-semibold text-gray-800">
            Vitamin C
          </h4>

          <p className="text-sm text-gray-500">
            Brighten • Glow
          </p>
        </div>
      </motion.div>

      {/* Floating Card - Bottom */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 right-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
          ☀️
        </div>

        <div>
          <h4 className="font-semibold text-gray-800">
            SPF 50
          </h4>

          <p className="text-sm text-gray-500">
            Daily Shield
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroImage;