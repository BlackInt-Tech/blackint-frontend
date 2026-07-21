import { InsightData } from "../data/insight";
import { InsightInterface } from "../interface/insight";


/**
 * Get published insights with pagination
 */
export const getPublishedInsights = async (
  page = 0,
  size = 6
): Promise<InsightInterface[]> => {
  const publishedInsights = InsightData
    .filter(
      (item) => item.status === "PUBLISHED" && !item.isDeleted
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? 0).getTime() -
        new Date(a.publishedAt ?? 0).getTime()
    );

  const start = page * size;
  const end = start + size;

  return publishedInsights.slice(start, end);
};

/**
 * Get blog by slug
 */
export const getBlogBySlug = async (
  slug: string
): Promise<InsightInterface> => {
  const blog = InsightData.find(
    (item) =>
      item.slug === slug &&
      item.status === "PUBLISHED" &&
      !item.isDeleted
  );

  if (!blog) {
    throw new Error("Blog not found.");
  }

  return blog;
};

/**
 * Get all published insights
 */
export const getAllPublishedInsights = async (): Promise<InsightInterface[]> => {
  return InsightData.filter(
    (item) => item.status === "PUBLISHED" && !item.isDeleted
  );
};

/**
 * Get featured insights
 */
export const getFeaturedInsights = async (
  limit = 3
): Promise<InsightInterface[]> => {
  return InsightData
    .filter(
      (item) =>
        item.isFeatured &&
        item.status === "PUBLISHED" &&
        !item.isDeleted
    )
    .slice(0, limit);
};

/**
 * Get related insights
 */
export const getRelatedInsights = async (
  currentSlug: string,
  limit = 3
): Promise<InsightInterface[]> => {
  return InsightData
    .filter(
      (item) =>
        item.slug !== currentSlug &&
        item.status === "PUBLISHED" &&
        !item.isDeleted
    )
    .slice(0, limit);
};