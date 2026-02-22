import { api } from "./api";
import { Insight } from "../types/insight";

export const getPublishedInsights = async (): Promise<Insight[]> => {
  const response = await api.get("/api/blogs/published");
  
  if (!response.data?.data) {
  throw new Error("Invalid API response structure");
}

return response.data.data;
};