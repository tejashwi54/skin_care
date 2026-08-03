import axiosInstance from "./axiosInstance";

// Get All Products
export const getAllProducts = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/products", {
      params,
    });

    console.log("Axios Response:", response);
    console.log("Axios Response Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};

// Get Product By ID
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};