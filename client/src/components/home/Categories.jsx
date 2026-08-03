import { motion } from "framer-motion";
import { categoryData } from "../../constants/categoryData";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
{/* Section Heading */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="mb-16 text-center"
>
  {/* Main Heading */}

  <h2 className="text-5xl lg:text-6xl font-extrabold uppercase bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
    SHOP BY CATEGORY
  </h2>

  {/* Subtitle */}

  <h3 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900">
    Rituals for every skin.
  </h3>

  {/* Description */}

  <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-500">
    Discover dermatologist-inspired skincare essentials crafted to
    cleanse, nourish, protect, and reveal naturally healthy,
    glowing skin every day.
  </p>
</motion.div>

        {/* Category Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {categoryData.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;