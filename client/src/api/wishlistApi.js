import axiosInstance from "./axiosInstance";

// Get Wishlist
export const getWishlist = async () => {
  const response = await axiosInstance.get("/wishlist");
  return response.data;
};

// Toggle Wishlist
export const toggleWishlist = async (productId) => {
  const response = await axiosInstance.post("/wishlist", {
    productId,
  });

  return response.data;
};