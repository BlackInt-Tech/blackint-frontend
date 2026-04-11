import { api } from "./api";

let cachedData: any = null;

export const getHomepageData = async () => {

  if (cachedData) return cachedData;

  const response = await api.get("/homepage-data");

  const data = response.data.data;

  cachedData = {
    projects: data.projects,
    services: data.offerings.services || [],
    packages: data.offerings.packages || [],
    insights: data.insights
  };

  return cachedData;
};