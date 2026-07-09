import WishlistCard from "./WishlistCard";

const WishlistGrid = () => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

      <WishlistCard />
      <WishlistCard />
      <WishlistCard />

    </div>
  );
};

export default WishlistGrid;