import type { IProductPost } from "../interfaces/ProductInterface";
import apiClient from "./ApiClient";

export const createProduct = async (data: IProductPost) => {
  const response = await apiClient.post("/products", data);

  return response.data;
};

export const getAllProducts = async () => {
  const response = await apiClient.get("/products");

  return response.data;
};
