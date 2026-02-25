import { api } from "./api";
import { Insight } from "../types/insight";

interface InsightResponse {
  success: boolean;
  message: string;
  data: Insight[];
  status: number;
  timestamp: string;
}

export const getPublishedInsights = async (
  page = 0,
  size = 6
): Promise<Insight[]> => {
  const response = await api.get<InsightResponse>(
    "/api/blogs/published",
    {
      params: { page, size },
    }
  );

  if (!response.data?.data) {
    throw new Error("Invalid API response structure");
  }

  return response.data.data;
};

export const getBlogBySlug = async (slug: string): Promise<Insight> => {
  const response = await api.get(`/api/blogs/${slug}`);

  if (!response.data?.data) {
    throw new Error("Invalid API response structure");
  }

  return response.data.data;
};