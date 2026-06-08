import type { IProductPost } from "../interfaces/ProductInterface";
import apiClient from "./ApiClient";

const token = localStorage.getItem("accessToken");

export const createProduct = async (data: IProductPost) => {
  const response = await apiClient.post("/products", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getAllProducts = async () => {
  const response = await apiClient.get("/products", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
