import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/register",
    userData
  );

  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post(
    "/auth/login",
    loginData
  );

  
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");

  return response.data;
};

export const logoutUser = async () => {
  await axiosInstance.post("/auth/logout");
};

