import { api } from "./api";
import { Offering } from "../types/offering";

interface OfferingResponse {
  success: boolean;
  message: string;
  data: Offering[];
  status: number;
  timestamp: string;
}

export const getPublishedOfferings = async (): Promise<Offering[]> => {
  const response = await api.get<OfferingResponse>(
    "/api/offerings/getPublished"
  );

  if (!response.data?.data) {
    throw new Error("Invalid API response structure");
  }

  return response.data.data;
};