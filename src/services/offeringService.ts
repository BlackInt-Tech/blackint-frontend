import { api } from "./api";
import { Project } from "../types/project";

export const getPublishedOfferings = async (): Promise<Project[]> => {
  const response = await api.get("/api/offerings/published");

  if (!response.data?.data) {
  throw new Error("Invalid API response structure");
}

return response.data.data;
};