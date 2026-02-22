import { api } from "./api";
import { Project } from "../types/project";

export const getPublishedProjects = async (): Promise<Project[]> => {
  const response = await api.get("/api/projects/published");
  
  if (!response.data?.data) {
  throw new Error("Invalid API response structure");
}

return response.data.data;
};