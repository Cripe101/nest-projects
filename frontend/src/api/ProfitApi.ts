import apiClient from "./ApiClient";

export const addProfit = async (data: {
  date: string | undefined;
  description: string;
  amount: number;
}) => {
  const response = await apiClient.post("/profits", data);

  return response.data;
};

export const getProfit = async () => {
  const response = await apiClient.get("/profits");

  return response.data;
};

export const getTotalProfit = async () => {
  const response = await apiClient.get("/profits/total");

  return response.data;
};

export const getProfitByDay = async () => {
  const response = await apiClient.get("/profits/day");

  return response.data;
};

export const getProfitByMonth = async () => {
  const response = await apiClient.get("/profits/month");

  return response.data;
};

export const getPhoneTotalProfit = async () => {
  const response = await apiClient.get("/profits/phone");

  return response.data;
};

export const getGcashTotalProfit = async () => {
  const response = await apiClient.get("/profits/g-cash");

  return response.data;
};

export const updateProfit = async (
  id: string,
  data: {
    date: string | undefined;
    description: string;
    amount: number;
  },
) => {
  const response = await apiClient.put("/profits/" + id, data);

  return response.data;
};

export const deleteProfit = async (id: string) => {
  const response = await apiClient.delete("/profits/" + id);

  return response.data;
};
