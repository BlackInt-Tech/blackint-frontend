import { OfferingPackageInterface } from "../interface/offeringPackage";
import { offeringsPackageData } from "../data/offeringPackage";

/**
 * Get all published packages
 */
export const getPublishedPackages = async (): Promise<OfferingPackageInterface[]> => {
  return offeringsPackageData
    .filter(
      (item) =>
        item.status === "PUBLISHED" &&
        !item.isDeleted
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? 0).getTime() -
        new Date(a.publishedAt ?? 0).getTime()
    );
};

/**
 * Get package by slug
 */
export const getPackageBySlug = async (
  slug: string
): Promise<OfferingPackageInterface> => {

  const pkg = offeringsPackageData.find(
    (item) =>
      item.slug === slug &&
      item.status === "PUBLISHED" &&
      !item.isDeleted
  );

  if (!pkg) {
    throw new Error("Package not found.");
  }

  return pkg;
};

/**
 * Get featured packages
 */
export const getFeaturedPackages = async (
  limit = 4
): Promise<OfferingPackageInterface[]> => {

  return offeringsPackageData
    .filter(
      (item) =>
        item.isFeatured &&
        item.status === "PUBLISHED" &&
        !item.isDeleted
    )
    .slice(0, limit);
};