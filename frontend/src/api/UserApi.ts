import type { IUserPost } from "../interfaces/IUser";
import apiClient from "./ApiClient";

export const createUser = async (data: IUserPost) => {
  const response = await apiClient.post("/users", data);

  return response.data;
};

export const getAllUsers = async () => {
  const response = await apiClient.get("/users");

  return response.data;
};
