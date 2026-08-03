import {
  createContext,
  useContext,
<<<<<<< HEAD
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
=======
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
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
  const isInWishlist = (id) => {
    return wishlistItems.some(
      (item) => item._id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
<<<<<<< HEAD
        loading,
        fetchWishlist,
=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
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

<<<<<<< HEAD
export const useWishlist = () =>
  useContext(WishlistContext);
=======
export const useWishlist = () => useContext(WishlistContext);
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
