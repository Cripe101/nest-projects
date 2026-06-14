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

export const getOneProduct = async (id: string) => {
  const response = await apiClient.get("/products/" + id);

  return response.data;
};

export const updateOneProduct = async (id: string, data: IProductPost) => {
  const response = await apiClient.put("/products/" + id, data);

  return response.data;
};

export const deleteOneProduct = async (id: string) => {
  const response = await apiClient.delete("/products/" + id);

  return response.data;
};
