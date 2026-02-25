export interface Insight {
  publicId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  authorName: string;
  status: string;
  isFeatured: boolean;
  readTime: number;
  viewCount: number;
  category: string | null;
  tags: string[];
  publishedAt: string;
  createdAt: string;
}