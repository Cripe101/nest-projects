import type { IInventoryPost } from "../interfaces/IInventory";
import apiClient from "./ApiClient";

const token = localStorage.getItem("accessToken");
export const createInventory = async (data: IInventoryPost) => {
  const response = await apiClient.post("/inventories", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateOneInventory = async ({
  id,
  data,
}: {
  id: string;
  data: IInventoryPost;
}) => {
  const response = await apiClient.put("/inventories/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const addInventoryStock = async (id: string, quantity: number) => {
  const response = await apiClient.put(
    "/inventories/add-stock/" + id,
    quantity,
  );

  return response.data;
};

export const deleteOneInventory = async (id: string) => {
  const response = await apiClient.delete("/inventories/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getAllInventory = async () => {
  const response = await apiClient.get("/inventories");

  return response.data;
};

export const getOneInventory = async (id: string) => {
  const response = await apiClient.get("/inventories/" + id);

  return response.data;
};
