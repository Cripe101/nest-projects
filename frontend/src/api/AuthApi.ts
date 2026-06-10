import apiClient from "./ApiClient";

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await apiClient.post("/auth/login", { username, password });

  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("user", response.data.user.role);

  return response.data;
};
