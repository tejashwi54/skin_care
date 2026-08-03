import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-500 to-lime-400 rounded-[45px] shadow-2xl px-10 lg:px-20 py-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side */}

            <div>

              <p className="uppercase tracking-[6px] text-white/80 text-sm font-semibold">
                Join The Ritual
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold text-white mt-5 leading-tight">
                Get 10% off
                <br />
                your first order.
              </h2>

              <p className="mt-6 text-white/90 text-lg">
                Skincare tips, launches and exclusive rituals —
                sent straight to your inbox.
              </p>

            </div>

            {/* Right Side */}

            <form className="flex flex-col sm:flex-row gap-5">

              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 bg-white rounded-full px-7 py-5 outline-none text-gray-700 shadow-lg"
              />

              <button
                type="submit"
                className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-full font-semibold transition"
              >
                Subscribe
              </button>

            </form>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Newsletter;