export interface Project {
  publicId: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullContent: string;
  featuredImage: string;
  galleryImages?: string[];
  clientName: string;
  projectUrl: string;
  status: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string | null;
  publishedAt: string;
}