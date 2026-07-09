import { productData } from "../../constants/productData";
import ProductCard from "../common/ProductCard";

const RelatedProducts = ({ currentProduct }) => {
  // Show all products except the current one
  const relatedProducts = productData
    .filter((product) => product.id !== currentProduct.id)
    .slice(0, 4);

  return (
    <section className="mt-28">

      {/* Heading */}
      <div className="text-center mb-14">

        <p className="uppercase tracking-[4px] text-green-600 font-semibold">
          You May Also Like
        </p>

        <h2 className="text-5xl font-bold mt-4 text-gray-900">
          Related Products
        </h2>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Discover more dermatologist-inspired skincare products
          carefully selected to complement your skincare routine.
        </p>

      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
};

export default RelatedProducts;