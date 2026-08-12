import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { getId } from "../utils/getId";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

const GUEST_WISHLIST_KEY = "wishlist_guest";

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const wishlistKey = user
      ? `wishlist_${user._id}`
      : GUEST_WISHLIST_KEY;

    const saved = localStorage.getItem(wishlistKey);

    setWishlistItems(
      saved ? JSON.parse(saved) : []
    );
  }, [user]);

  useEffect(() => {
    const wishlistKey = user
      ? `wishlist_${user._id}`
      : GUEST_WISHLIST_KEY;

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems, user]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some(
        (item) => getId(item) === getId(product)
      );

      if (exists) return prev;

      return [...prev, product];
    });
  };

  const removeFromWishlist = (product) => {
    setWishlistItems((prev) =>
      prev.filter(
        (item) => getId(item) !== getId(product)
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some(
        (item) => getId(item) === getId(product)
      );

      if (exists) {
        return prev.filter(
          (item) => getId(item) !== getId(product)
        );
      }

      return [...prev, product];
    });
  };

  const isInWishlist = (product) => {
    return wishlistItems.some(
      (item) => getId(item) === getId(product)
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);