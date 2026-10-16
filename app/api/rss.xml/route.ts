import { getPublishedPosts } from "@/lib/blog/data";
export const revalidate = 60;
const escape = (value: string) => value.replace(/[<>&"']/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]!);
export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://saurengineering.in";
  const posts = (await getPublishedPosts()).filter((post) => !post.seoNoIndex && (!post.seoCanonicalUrl || post.seoCanonicalUrl === `${base}/blog/${post.slug}`));
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Saur Engineering Journal</title><link>${escape(base)}/blog</link><description>Engineering insights and practical perspectives from Saur Engineering &amp; Consultancy.</description><language>en</language>${posts.map((post) => `<item><title>${escape(post.title)}</title><link>${escape(base)}/blog/${post.slug}</link><guid isPermaLink="true">${escape(base)}/blog/${post.slug}</guid><description>${escape(post.excerpt)}</description>${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ""}${post.categories.map((category) => `<category>${escape(category)}</category>`).join("")}</item>`).join("")}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=60" } });
}
