import { blogPostContentDirectory, getBlogPosts } from "./blog/util";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  let blogs = (await getBlogPosts(blogPostContentDirectory)).map((post) => ({
    url: `${baseUrl}/blog/${post?.slug}`,
    lastModified: post?.metadata.publishedAt,
  }));

  let routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
