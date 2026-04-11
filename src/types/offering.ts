export interface Offering {
  publicId: string;
  title: string;
  slug: string;
  shortDescription: string[];
  fullContent: string;
  offeringType: "PACKAGE" | "SERVICE";
  icon: string;
  featuredImage: string;
  price: string;
  isFeatured: boolean;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  publishedAt: string | null;
}