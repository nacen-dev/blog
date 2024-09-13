import { BlogPosts } from "@/components/ui/blog-posts";
import { DAY_IN_SECONDS } from "@/lib/dateUtils";
import { getBlogPosts, MDXData } from "./util";

// Revalidate cache after a day
export const revalidate = DAY_IN_SECONDS;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  return await getBlogPosts();
}

export const metadata = {
  title: "Vincent's blog",
  description:
    "Explore a diverse range of topics on my personal blog, from programming and web development to books, games, and personal insights, as I share my journey of learning and discovery.",
};

type Props = {
  blogPosts: MDXData[];
};

export default async function BlogPage({ blogPosts }: Props) {
  return <BlogPosts blogPosts={blogPosts} />;
}
