export type Post = {
  id: string;
  slug: string;
  /** Publication slug; post URLs nest under it: /blog/<publication>/<slug>. */
  publication?: string;
  title: string;
  description: string;
  date: string;
  content: string;
  author?: string;
  hasCoverImage: boolean;
};
