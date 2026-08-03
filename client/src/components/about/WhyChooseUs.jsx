import {
  FiShield,
  FiAward,
  FiHeart,
} from "react-icons/fi";

const WhyChooseUs = () => {
  return (
    <section className="mt-24">

      <h2 className="text-4xl font-bold text-center">
        Why Choose Clear Skin?
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mt-14">

        <div className="bg-white rounded-[32px] p-10 shadow-sm text-center">

          <FiShield className="text-5xl text-green-500 mx-auto" />

          <h3 className="text-2xl font-bold mt-6">
            Safe Ingredients
          </h3>

          <p className="mt-4 text-gray-600">
            Dermatologist-tested formulas with premium ingredients.
          </p>

        </div>

        <div className="bg-white rounded-[32px] p-10 shadow-sm text-center">

          <FiAward className="text-5xl text-green-500 mx-auto" />

          <h3 className="text-2xl font-bold mt-6">
            Trusted Quality
          </h3>

          <p className="mt-4 text-gray-600">
            Loved by thousands of skincare enthusiasts.
          </p>

        </div>

        <div className="bg-white rounded-[32px] p-10 shadow-sm text-center">

          <FiHeart className="text-5xl text-green-500 mx-auto" />

          <h3 className="text-2xl font-bold mt-6">
            Customer First
          </h3>

          <p className="mt-4 text-gray-600">
            We prioritize customer satisfaction above everything.
          </p>

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;