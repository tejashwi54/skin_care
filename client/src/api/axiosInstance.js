import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api",
=======
  baseURL: "http://localhost:5000/api",
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

<<<<<<< HEAD
// ==============================
// Request Interceptor
// ==============================
// No Authorization header required.
// Browser automatically sends the
// httpOnly cookie with every request.
axiosInstance.interceptors.request.use(
  (config) => {
=======
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
    return config;
  },
  (error) => Promise.reject(error)
);

<<<<<<< HEAD
// ==============================
// Response Interceptor
// ==============================
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");

      // Optional:
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

=======
>>>>>>> 4297b140f2a3977b2f58d6d7afeb664198ab37df
export default axiosInstance;