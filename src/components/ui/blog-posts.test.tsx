import { MDXData } from "@/app/blog/util";
import { formatDate } from "@/lib/dateUtils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BlogPosts } from "./blog-posts";

describe("BlogPosts", async () => {
  const testDataList: MDXData[] = [
    {
      slug: "test-1",
      content: { props: {}, key: "Test 1", type: "" },
      metadata: {
        title: "Test 1",
        publishedAt: "2024-09-20",
        summary: "This is a test meta data # 1",
      },
    },
    {
      slug: "test-2",
      content: { props: {}, key: "Test 2", type: "" },
      metadata: {
        title: "Test 2",
        publishedAt: "2024-09-20",
        summary: "This is a test meta data # 2",
      },
    },
  ];

  it("should render no blog post found when there are no blog posts", () => {
    render(<BlogPosts blogPosts={[]} />);
    expect(screen.getByText(/no blog post found/i)).toBeInTheDocument();
  });

  it("should render a list of blog post that have published at and title", () => {
    render(<BlogPosts blogPosts={testDataList} />);

    for (const testData of testDataList) {
      const title = screen.getAllByText(testData.metadata.title);
      expect(title[0]).toBeInTheDocument();

      const publishedAt = screen.getAllByText(
        formatDate(testData.metadata.publishedAt)
      );

      expect(publishedAt[0]).toBeInTheDocument();
    }
  });

  it("should change color when a blog post title is hovered and returns to previous color when unhovered", async () => {
    const user = userEvent.setup();

    render(<BlogPosts blogPosts={testDataList} />);

    const hoveredTitle = screen.getAllByText(testDataList[0].metadata.title)[0];
    await user.hover(hoveredTitle);

    expect(hoveredTitle).toHaveStyle("color: var(--primary)");

    await user.unhover(hoveredTitle);
    expect(hoveredTitle).toHaveStyle("color: var(--foreground)");
  });
});
