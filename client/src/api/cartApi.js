import axiosInstance from "./axiosInstance";

// Get Cart
export const getCart = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};

// Add To Cart
export const addToCart = async (productId, quantity = 1) => {
  const response = await axiosInstance.post("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

// Update Quantity
export const updateCartQuantity = async (
  productId,
  quantity
) => {
  const response = await axiosInstance.put(
    `/cart/${productId}`,
    {
      quantity,
    }
  );

  return response.data;
};

// Remove Product
export const removeFromCart = async (
  productId
) => {
  const response = await axiosInstance.delete(
    `/cart/${productId}`
  );

  return response.data;
};

// Clear Cart
export const clearCart = async () => {
  const response = await axiosInstance.delete(
    "/cart"
  );

  return response.data;
};