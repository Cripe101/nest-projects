import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.27:5000",
  // http://localhost:5000
  // http://192.168.1.27:5000
  timeout: Infinity,
  headers: { "Content-Type": "application/json" },
});

// Interceptors for request/response
// apiClient.interceptors.request.use((config) => {
//   const token = authState.token;
//   console.log(token);
//   if (token) {
//     config.headers.Authorization = `${token}`;
//   }
//   console.log("returning");

//   return config;
// });

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default apiClient;
