export interface OfferingIndividualInterface {
  id: string;
  publicId: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullContent: string;
  icon: string | null;
  featuredImage: string;
  price: string | null;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED";
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  isDeleted: boolean;
}