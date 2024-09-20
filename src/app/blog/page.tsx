import { BlogPosts } from "@/components/ui/blog-posts";
import { blogPostContentDirectory, getBlogPosts } from "./util";

export const metadata = {
  title: "Vincent's blog",
  description:
    "Explore a diverse range of topics on my personal blog, from programming and web development to books, games, and personal insights, as I share my journey of learning and discovery.",
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts(blogPostContentDirectory);
  return <BlogPosts blogPosts={blogPosts} />;
}
