import { api } from "./api";

export interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  offeringType: "PACKAGE" | "SERVICE";
  offeringName: string;
  offeringPrice: string;
  projectIdea: string;
}

export const submitContact = async (data: ContactRequest) => {
  const response = await api.post(
    "/contacts/submit",
    {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      offeringType: data.offeringType,
      offeringName: data.offeringName,
      offeringPrice: data.offeringPrice,
      projectIdea: data.projectIdea,
    }
  );

  return response.data;
};