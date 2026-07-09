import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { productData } from "../constants/productData";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";


const ProductDetails = () => {
  const { id } = useParams();

  const product = productData.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">
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