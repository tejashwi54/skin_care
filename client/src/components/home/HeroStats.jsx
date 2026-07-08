import { motion } from "framer-motion";

const stats = [
  {
    number: "50K+",
    title: "Happy Customers",
  },
  {
    number: "4.9★",
    title: "Avg. Rating",
  },
  {
    number: "100%",
    title: "Cruelty Free",
  },
];

const HeroStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="flex flex-wrap gap-12 mt-12"
    >
      {stats.map((item, index) => (
        <div
          key={index}
          className="relative pr-10"
        >
          {/* Divider */}
          {index !== stats.length - 1 && (
            <div className="absolute top-2 right-0 h-12 w-px bg-gray-300"></div>
          )}

          <h2 className="text-2xl font-bold text-gray-900">
            {item.number}
          </h2>

          <p className="text-gray-500 mt-2">
            {item.title}
          </p>
        </div>
      ))}
    </motion.div>
  );
};

export default HeroStats;