import { MDXData, sortBlogPostsDescending } from "@/app/blog/util";
import { formatDate } from "@/lib/dateUtils";
import Link from "next/link";

type Props = {
  blogPosts: MDXData[];
};

export function BlogPosts({ blogPosts }: Props) {
  if (blogPosts.length === 0) return <p>No blog post found</p>;

  return (
    <section>
      {sortBlogPostsDescending(blogPosts).map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-foreground max-w-[250px] tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-foreground hover:text-primary tracking-tight">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
