import { ProjectData } from "../data/project";
import { ProjectInterface } from "../interface/project";

/**
 * Get all published projects
 */
export const getPublishedProjects = async (): Promise<ProjectInterface[]> => {
  return ProjectData
    .filter(
      (project) =>
        project.status === "PUBLISHED" &&
        !project.isDeleted
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? 0).getTime() -
        new Date(a.publishedAt ?? 0).getTime()
    );
};

/**
 * Get project by slug
 */
export const getProjectBySlug = async (
  slug: string
): Promise<ProjectInterface> => {
  const project = ProjectData.find(
    (item) =>
      item.slug === slug &&
      item.status === "PUBLISHED" &&
      !item.isDeleted
  );

  if (!project) {
    throw new Error("Project not found.");
  }

  return project;
};

/**
 * Get featured projects
 */
export const getFeaturedProjects = async (
  limit = 6
): Promise<ProjectInterface[]> => {
  return ProjectData
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

/**
 * Get related projects
 */
export const getRelatedProjects = async (
  currentSlug: string,
  limit = 3
): Promise<ProjectInterface[]> => {
  const current = ProjectData.find(
    (item) => item.slug === currentSlug
  );

  if (!current) return [];

  return ProjectData
    .filter(
      (item) =>
        item.slug !== currentSlug &&
        item.status === "PUBLISHED" &&
        !item.isDeleted &&
        item.categoryId === current.categoryId
    )
    .slice(0, limit);
};