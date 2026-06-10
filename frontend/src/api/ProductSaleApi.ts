import apiClient from "./ApiClient";

const token = localStorage.getItem("accessToken");

export const createProductSale = async (data: {
  productId: string;
  quantity: number;
}) => {
  const response = await apiClient.post("/product-sales", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const deleteOneSale = async (id: string) => {
  const response = await apiClient.delete("/product-sales/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getOneSale = async (id: string) => {
  const response = await apiClient.get("/product-sales/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getAllProductSale = async () => {
  const response = await apiClient.get("/product-sales", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
