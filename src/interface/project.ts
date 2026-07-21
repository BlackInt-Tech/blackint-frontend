export interface ProjectInterface {
  id: string;
  publicId: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullContent: string;
  featuredImage: string;
  galleryImages: string[];
  clientName: string;
  projectUrl: string | null;
  status: "DRAFT" | "PUBLISHED";
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  categoryId: string | null;
  seoTitle: string;
  seoDescription: string;
  isDeleted: boolean;
}