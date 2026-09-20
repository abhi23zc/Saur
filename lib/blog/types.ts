export type PostStatus = "draft" | "scheduled" | "published";
export type BlogSchemaType = "Article" | "BlogPosting" | "NewsArticle";

export type MediaAsset = { id: string; storagePath: string; publicUrl: string; fileName: string; mimeType: string; width: number | null; height: number | null; altText: string; caption: string | null; createdAt: string };

export type RichTextNode = {
  type: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  content?: RichTextNode[];
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: RichTextNode;
  coverImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoFocusKeyword: string | null;
  seoCanonicalUrl: string | null;
  seoOgTitle: string | null;
  seoOgDescription: string | null;
  seoOgImage: string | null;
  seoTwitterTitle: string | null;
  seoTwitterDescription: string | null;
  seoTwitterImage: string | null;
  seoSchemaType: BlogSchemaType;
  seoNoIndex: boolean;
  authorName: string;
  authorRole: string | null;
  status: PostStatus;
  publishedAt: string | null;
  scheduledFor?: string | null;
  originalPublishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  categories: string[];
  tags: string[];
  techTakeaways: string[];
  relatedPostIds: string[];
};

export type BlogPostInput = Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "publishedAt"> & {
  id?: string;
  publishedAt?: string | null;
};
