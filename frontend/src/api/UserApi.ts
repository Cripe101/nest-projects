import apiClient from "./ApiClient";

const token = localStorage.getItem("accessToken");
export const getAllUsers = async () => {
  const response = await apiClient.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
