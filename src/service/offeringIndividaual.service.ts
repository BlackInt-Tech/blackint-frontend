import { OfferingIndividualInterface } from "../interface/offeringIndividual";
import { offeringIndividualData } from "../data/offeringIndividual";

/**
 * Get all published services
 */
export const getPublishedOfferings = async (): Promise<OfferingIndividualInterface[]> => {
  return offeringIndividualData
    .filter(
      (item) =>
        item.status === "PUBLISHED" &&
        !item.isDeleted
    )
    .sort(
      (b, a) =>
        new Date(b.publishedAt ?? 0).getTime() -
        new Date(a.publishedAt ?? 0).getTime()
    );
};

/**
 * Get service by slug
 */
export const getOfferingBySlug = async (
  slug: string
): Promise<OfferingIndividualInterface> => {

  const offering = offeringIndividualData.find(
    (item) =>
      item.slug === slug &&
      item.status === "PUBLISHED" &&
      !item.isDeleted
  );

  if (!offering) {
    throw new Error("Service not found.");
  }

  return offering;
};

/**
 * Get featured services
 */
export const getFeaturedOfferings = async (
  limit = 6
): Promise<OfferingIndividualInterface[]> => {

  return offeringIndividualData
    .filter(
      (item) =>
        item.isFeatured &&
        item.status === "PUBLISHED" &&
        !item.isDeleted
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? 0).getTime() -
        new Date(a.publishedAt ?? 0).getTime()
    )
    .slice(0, limit);
};