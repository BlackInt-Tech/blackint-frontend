import { api } from "./api";

export const getPublishedInsights = async () => {
  const response = await api.get("/api/contacts/published");

  if (!response.data?.data) {
  throw new Error("Invalid API response structure");
}

return response.data.data;
};