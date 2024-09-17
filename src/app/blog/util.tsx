import { CopyButton } from "@/components/ui/copy-button";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { ReactElement } from "react";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGFM from "remark-gfm";
import { visit } from "unist-util-visit";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

export type MDXData = {
  metadata: Metadata;
  slug: string;
  content: ReactElement;
};

export const blogPostContentDirectory = path.join(
  process.cwd(),
  "src",
  "app",
  "blog",
  "posts"
);

export function getMDXFiles(directory: string): string[] {
  return fs
    .readdirSync(directory)
    .filter((file) => path.extname(file).toLowerCase() === ".mdx");
}

const Pre = (props: any) => {
  return (
    <pre {...props}>
      {props.children}
      <div>
        <CopyButton text={props.raw} />
      </div>
    </pre>
  );
};

export async function getMDXData(filePath: string): Promise<MDXData> {
  try {
    let fileContent = fs.readFileSync(filePath, "utf-8");
    const { frontmatter, content } = await compileMDX<Metadata>({
      source: fileContent,
      components: { pre: (props) => <Pre {...props} /> },
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGFM],
          rehypePlugins: [
            () => (tree) => {
              visit(tree, (node) => {
                if (node?.type === "element" && node?.tagName === "pre") {
                  const [codeEl] = node.children;

                  if (codeEl.tagName !== "code") return;

                  node.raw = codeEl.children?.[0].value;
                }
              });
            },
            [
              rehypePrettyCode,
              {
                keepBackground: true,
              },
            ],
            rehypeSlug,
            [rehypeAutoLinkHeadings, { behavior: "wrap" }],
            () => (tree) => {
              visit(tree, (node) => {
                if (node?.type === "element" && node?.tagName === "figure") {
                  for (const child of node.children) {
                    if (child.tagName === "pre") {
                      child.properties["raw"] = node.raw;
                    }
                  }
                }
              });
            },
          ],
        },
      },
    });

    return {
      content,
      metadata: frontmatter,
      slug: path.parse(filePath).name,
    };
  } catch (error) {
    throw error;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<MDXData> {
  const fileName = slug + ".mdx";
  const filePath = path.join(blogPostContentDirectory, fileName);
  return await getMDXData(filePath);
}

export async function getBlogPosts(): Promise<MDXData[]> {
  let files = getMDXFiles(blogPostContentDirectory);
  const blogPosts = await Promise.all(
    files.map(
      async (file) =>
        await getMDXData(path.join(blogPostContentDirectory, file))
    )
  );

  return blogPosts;
}

export function sortBlogPostsDescending(blogPostsData: MDXData[]): MDXData[] {
  if (!blogPostsData) return [];

  return blogPostsData.sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  );
}

export function getBlogPostsSlug() {
  const files = getMDXFiles(blogPostContentDirectory);
  const slugs = files.map((file) => ({ slug: path.parse(file).name }));
  return slugs;
}
