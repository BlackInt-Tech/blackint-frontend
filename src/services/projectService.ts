export async function getPublishedProjects() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);

  const data = await res.json();

  return data.filter(
    (project: any) =>
      project.status === "PUBLISHED" && project.isFeatured === true
  );
}
