import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { getProductById } from "../api/productApi";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);

      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            Loading Product...
          </h1>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold text-red-500">
            Product Not Found
          </h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-[0.95fr_0.7fr] gap-12 items-start justify-center">

            <ProductGallery product={product} />

            <ProductInfo product={product} />

          </div>

          <div className="mt-24">

            <RelatedProducts
              currentProduct={product}
            />

          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default ProductDetails;