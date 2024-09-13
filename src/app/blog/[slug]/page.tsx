import { baseUrl } from "@/app/sitemap";
import { DAY_IN_SECONDS } from "@/lib/dateUtils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPostsSlug } from "../util";

export const revalidate = DAY_IN_SECONDS;

type BlogPostParams = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return getBlogPostsSlug();
}

export default async function BlogPost({ params }: BlogPostParams) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) notFound();

  return (
    <section className="p-4 md:p-2 lg:p-0">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Nacen's Portfolio",
            },
          }),
        }}
      />
      <header className="text-center md:text-start mb-8">
        <h1 className="font-bold text-4xl tracking-tighter mb-4">
          {post.metadata.title}
        </h1>
        <p className="text-center">{post.metadata.publishedAt}</p>
        {post.metadata.image && (
          <Image src={post.metadata.image} alt={post.metadata.title} />
        )}
      </header>
      <article className="prose dark:prose-invert max-w-none mb-4">
        {post.content}
      </article>
    </section>
  );
}
