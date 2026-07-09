import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ShopHeader from "../components/shop/ShopHeader";
import ShopSidebar from "../components/shop/ShopSidebar";
import ProductGrid from "../components/shop/ProductGrid";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  return (
    <MainLayout>
      <section className="py-20 min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">

          <ShopHeader />

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
              />
            </div>

          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default Shop;