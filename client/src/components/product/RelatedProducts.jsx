import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/productApi";
import ProductCard from "../common/ProductCard";

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [currentProduct]);

  const fetchRelatedProducts = async () => {
  try {
    const response = await getAllProducts();

    const products = response.data.products;

    // Same Category Products
    let related = products.filter(
      (product) =>
        product._id !== currentProduct._id &&
        product.category === currentProduct.category
    );

    // If less than 4, fill with other products
    if (related.length < 4) {
      const remainingProducts = products.filter(
        (product) =>
          product._id !== currentProduct._id &&
          !related.some((item) => item._id === product._id)
      );

      related = [
        ...related,
        ...remainingProducts,
      ].slice(0, 4);
    }

    setRelatedProducts(related);
  } catch (error) {
    console.error(
      "Error fetching related products:",
      error
    );
  }
};
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

      {relatedProducts.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {relatedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          No Related Products Found
        </div>
      )}

    </section>
  );
};

export default RelatedProducts;