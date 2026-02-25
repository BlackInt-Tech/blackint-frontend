import { api } from "./api";

export interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  budget: string;
  projectIdea: string;
  message: string;
}

export const submitContact = async (data: ContactRequest) => {
  const response = await api.post(
    "/api/contacts/submit",{
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      services: data.services,
      budget: data.budget,
      projectIdea: data.projectIdea,
      message: data.message
    }
    
  );

  return response.data;
};