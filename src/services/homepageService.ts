import { api } from "./api";

let cachedData: any = null;

export const getHomepageData = async () => {
  // RETURN CACHE IF EXISTS
  if (cachedData) {
    return cachedData;
  }

  const response = await api.get("/homepage-data");

  // API structure: { success, data }
  cachedData = response.data.data;

  return cachedData;
};