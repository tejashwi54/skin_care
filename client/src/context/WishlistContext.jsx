import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWishlist,
  toggleWishlist as toggleWishlistApi,
} from "../api/wishlistApi";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===========================
  // Fetch Wishlist
  // ===========================
  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const response = await getWishlist();

      setWishlistItems(response.data.products || []);
    } catch (error) {
      console.error("Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ===========================
  // Toggle Wishlist
  // ===========================
  const toggleWishlist = async (product) => {
    try {
      const response = await toggleWishlistApi(product._id);

      setWishlistItems(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  // ===========================
  // Add Product
  // ===========================
  const addToWishlist = async (product) => {
    if (!isInWishlist(product._id)) {
      await toggleWishlist(product);
    }
  };

  // ===========================
  // Remove Product
  // ===========================
  const removeFromWishlist = async (id) => {
    const product = { _id: id };
    await toggleWishlist(product);
  };

  // ===========================
  // Check Wishlist
  // ===========================
  const isInWishlist = (id) => {
    return wishlistItems.some(
      (item) => item._id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        fetchWishlist,
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

export const useWishlist = () =>
  useContext(WishlistContext);