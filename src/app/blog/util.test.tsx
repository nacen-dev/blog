import { vol } from "memfs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getMDXFiles } from "./util";

vi.mock("node:fs");
vi.mock("node:fs/promises");

beforeEach(() => {
  vol.reset();
});

describe("getMDXFiles", () => {
  it("Should only get mdx files from the directory specified", () => {
    vol.fromJSON(
      {
        "./mdx-test/test.txt": "Test",
        "./mdx-test/test2.mdx": "Test 2",
        "./mdx-test/test3.md": "Test 3",
        "./mdx-test/test4.mdx": "Test 4",
      },
      "/tmp"
    );
    const result = getMDXFiles("/tmp/mdx-test");
    expect(result).toEqual(["test2.mdx", "test4.mdx"]);
  });
});
