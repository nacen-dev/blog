import { BlogPosts } from "@/components/ui/blog-posts";

export const metadata = {
  title: "Vincent's blog",
  description:
    "Explore a diverse range of topics on my personal blog, from programming and web development to books, games, and personal insights, as I share my journey of learning and discovery.",
};

export default function BlogPage() {
  return (
    <section>
      <BlogPosts />
    </section>
  );
}
