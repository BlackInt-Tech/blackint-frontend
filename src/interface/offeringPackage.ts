export interface OfferingPackageInterface {
  id: string;
  publicId: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  icon: string | null;
  badge: string | null;
  price: string;
  priceLabel: string;
  packageType: "STARTER" | "GROWTH" | "BUSINESS" | "ENTERPRISE";
  features: string[];
  buttonText: string;
  isPopular: boolean;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED";
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  isDeleted: boolean;
}