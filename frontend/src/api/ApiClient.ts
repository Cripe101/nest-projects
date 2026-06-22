import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  // http://localhost:5000
  // http://192.168.1.27:5000
  // https://nest-projects-qv3i.onrender.com
  timeout: Infinity,
  headers: { "Content-Type": "application/json" },
});

// Interceptors for request/response
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default apiClient;
