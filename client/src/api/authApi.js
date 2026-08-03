import axiosInstance from "./axiosInstance";

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
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.data.user)
  );

  return response.data;
};

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

  localStorage.removeItem("user");
};