import apiClient from "./ApiClient";

export const getAllUsers = async () => {
  const response = await apiClient.get("/users");

  return response.data;
};
