import MainLayout from "../layouts/MainLayout";
import WishlistHeader from "../components/wishlist/WishlistHeader";
import WishlistGrid from "../components/wishlist/WishlistGrid";

const Wishlist = () => {
  return (
    <MainLayout>
      <section className="py-20 bg-gray-50 min-h-screen">

        <div className="max-w-7xl mx-auto px-6">

          <WishlistHeader />

          <div className="mt-14">
            <WishlistGrid />
          </div>

        </div>

      </section>
    </MainLayout>
  );
};

export default Wishlist;