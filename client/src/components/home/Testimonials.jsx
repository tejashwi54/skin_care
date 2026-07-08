import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { testimonialData } from "../../constants/testimonialData";

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[5px] text-green-600 font-semibold">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Loved by Thousands
          </h2>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
            See why customers trust Clear Skin for their daily skincare routine.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonialData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >

              {/* Rating */}
              <div className="flex gap-1 mb-5">
                {[...Array(item.rating)].map((_, index) => (
                  <FaStar
                    key={index}
                    className="text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 leading-8 italic">
                "{item.review}"
              </p>

              {/* Divider */}
              <div className="w-16 h-1 bg-green-500 rounded-full my-6"></div>

              {/* Customer */}
              <h3 className="font-bold text-xl">
                {item.name}
              </h3>

              <p className="text-green-600 mt-1">
                {item.role}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;