import apiClient from "./ApiClient";

export const createProductSale = async (data: {
  productId: string;
  quantity: number;
}) => {
  const response = await apiClient.post("/product-sales", data);

  return response.data;
};

export const deleteOneSale = async (id: string) => {
  const response = await apiClient.delete("/product-sales/" + id);

  return response.data;
};

export const getOneSale = async (id: string) => {
  const response = await apiClient.get("/product-sales/" + id);

  return response.data;
};

export const getAllProductSale = async () => {
  const response = await apiClient.get("/product-sales");

  return response.data;
};

export const getTotalSale = async () => {
  const response = await apiClient.get("/product-sales/total-sale");

  return response.data;
};

export const getTotalSaleProfit = async () => {
  const response = await apiClient.get("/product-sales/total-profit");

  return response.data;
};
