import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ShopHeader from "../components/shop/ShopHeader";
import ShopSidebar from "../components/shop/ShopSidebar";
import ProductGrid from "../components/shop/ProductGrid";

const Shop = () => {
  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const categoryParam = searchParams.get("category");

  const [category, setCategory] = useState(
    categoryParam || "All"
  );

  // Update category when URL changes
  useEffect(() => {
    setCategory(categoryParam || "All");
  }, [categoryParam]);

  return (
    <MainLayout>
      <section className="py-20 min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">

        <div className="max-w-7xl mx-auto px-6">

          <ShopHeader />

          {type === "bestseller" ? (

            <div className="mt-16">

              <ProductGrid
                search={search}
                category={category}
                type={type}
              />

            </div>

          ) : (

            <div className="mt-16 grid lg:grid-cols-4 gap-10">

              <div className="lg:col-span-1">

                <ShopSidebar
                  search={search}
                  setSearch={setSearch}
                  category={category}
                  setCategory={setCategory}
                />

              </div>

              <div className="lg:col-span-3">

                <ProductGrid
                  search={search}
                  category={category}
                  type={type}
                />

              </div>

            </div>

          )}

        </div>

      </section>
    </MainLayout>
  );
};

export default Shop;