export interface InsightInterface {
  id: string;
  publicId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: String;
  featuredImage: string;
  authorName: string;
  status: "DRAFT" | "PUBLISHED";
  isFeatured: boolean;
  readTime: number;
  viewCount: number;
  metaTitle: string;
  metaDescription: string;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  scheduledAt: string | null;
  isDeleted: boolean;
}