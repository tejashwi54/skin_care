import axiosInstance from "./axiosInstance";

export const getAllProducts = async (params = {}) => {
  const response = await axiosInstance.get("/products", {
    params,
  });

  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(
    `/products/${id}`
  );

  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axiosInstance.post(
    "/products",
    productData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(
    `/products/${id}`,
    productData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(
    `/products/${id}`
  );

  return response.data;
};

export const getBestSellingProducts = async () => {
  const response = await axiosInstance.get(
    "/orders/best-sellers"
  );

  return response.data;
};