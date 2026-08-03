import axiosInstance from "./axiosInstance";

<<<<<<< HEAD
// ==============================
// Register User
// ==============================
export const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// ==============================
// Login User
// ==============================
export const loginUser = async (loginData) => {
  const response = await axiosInstance.post(
    "/auth/login",
    loginData
  );

  // Store only user information
=======
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);

  localStorage.setItem("token", response.data.data.token);
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.data.user)
  );

  return response.data;
};

<<<<<<< HEAD
// ==============================
// Get Current User
// ==============================
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");

  return response.data;
};

// ==============================
// Logout User
// ==============================
export const logoutUser = async () => {
  await axiosInstance.post("/auth/logout");

=======
export const logoutUser = () => {
  localStorage.removeItem("token");
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
  localStorage.removeItem("user");
};