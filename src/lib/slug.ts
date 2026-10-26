/**
 * Pure heading slugger shared by the posts loader (server) and the MDX
 * heading component (client). No imports: this file must stay free of
 * server-only modules so client components can use it.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
