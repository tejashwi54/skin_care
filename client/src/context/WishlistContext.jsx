import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));

const wishlistKey = user
  ? `wishlist_${user._id}`
  : "wishlist_guest";

const saved = localStorage.getItem(wishlistKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

const wishlistKey = user
  ? `wishlist_${user._id}`
  : "wishlist_guest";

localStorage.setItem(
  wishlistKey,
  JSON.stringify(wishlistItems)
);
  }, [wishlistItems]);

  // Add Product
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some(
        (item) => item._id === product._id
      );

      if (exists) return prev;

      return [...prev, product];
    });
  };

  // Remove Product
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return prev.filter(
          (item) => item._id !== product._id
        );
      }

      return [...prev, product];
    });
  };

  // Check Wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some(
      (item) => item._id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);