import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// Get Fresh CSRF Token
// ==============================

const getCsrfToken = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/csrf-token`,
    {
      withCredentials: true,
    }
  );

  return response.data.data.csrfToken;
};

// ==============================
// Request Interceptor
// ==============================

axiosInstance.interceptors.request.use(
  async (config) => {
    const method = config.method?.toLowerCase();

    const stateChangingMethods = [
      "post",
      "put",
      "patch",
      "delete",
    ];

    if (stateChangingMethods.includes(method)) {
      const csrfToken = await getCsrfToken();

      config.headers["X-CSRF-Token"] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==============================
// Response Interceptor
// ==============================

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;