
import { api } from "./api";
import { Project } from "../types/project";

interface ProjectResponse {
  success: boolean;
  message: string;
  data: Project[];
  status: number;
  timestamp: string;
}

export const getPublishedProjects = async (): Promise<Project[]> => {

  const response = await api.get<ProjectResponse>(
    "/projects/getPublished"
  );

  if (!response.data?.data) {
    throw new Error("Invalid API response structure");
  }

  return response.data.data;
};

export const getProjectBySlug = async (
  slug: string
): Promise<Project> => {

  const response = await api.get(`/projects/getBySlug/${slug}`);

  if (!response.data?.data) {
    throw new Error("Invalid API response");
  }

  return response.data.data;
};
