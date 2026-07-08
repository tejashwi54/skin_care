import { motion } from "framer-motion";
import { whyChooseData } from "../../constants/whyChooseData";

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[5px] text-green-600 font-semibold">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Healthy Skin Starts Here
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            We combine premium ingredients, scientific research and
            customer satisfaction to deliver skincare you can trust.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {whyChooseData.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-3xl p-8 shadow-md hover:shadow-xl transition"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
                  <Icon />
                </div>

                <h3 className="text-2xl font-bold mt-6">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-4">
                  {item.description}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;