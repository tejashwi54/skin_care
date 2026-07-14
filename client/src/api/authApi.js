import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);

  localStorage.setItem("token", response.data.data.token);
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.data.user)
  );

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};