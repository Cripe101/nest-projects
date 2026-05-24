import apiClient from "./ApiClient";

export const createProductSale = async (data: {
  productId: string;
  quantity: number;
}) => {
  const response = await apiClient.post("/product-sales", data);

  return response.data;
};
