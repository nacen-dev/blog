import { afterEach } from "node:test";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { formatDate } from "./dateUtils";

describe("formatDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should formate date", () => {
    const formattedDate = formatDate("2024-09-24");
    expect(formattedDate).toEqual("September 24, 2024");
  });

  it("should format date and include relative time 1 day from the date", () => {
    const currentDate = new Date(2024, 8, 25);
    vi.setSystemTime(currentDate);
    const formattedDate = formatDate("2024-09-24", true);
    expect(formattedDate).toEqual("September 24, 2024 (1 day ago)");
  });

  it("should format date and include relative time 5 days from the date", () => {
    const currentDate = new Date(2024, 8, 29);
    vi.setSystemTime(currentDate);
    const formattedDate = formatDate("2024-09-24", true);
    expect(formattedDate).toEqual("September 24, 2024 (5 days ago)");
  });

  it("should format date and include relative time 1 month from the date", () => {
    const currentDate = new Date(2024, 9, 24);
    vi.setSystemTime(currentDate);
    const formattedDate = formatDate("2024-09-24", true);
    expect(formattedDate).toEqual("September 24, 2024 (1 month ago)");
  });

  it("should format date and include relative time 3 months from the date", () => {
    const currentDate = new Date(2024, 11, 25);
    vi.setSystemTime(currentDate);
    const formattedDate = formatDate("2024-09-24", true);
    expect(formattedDate).toEqual("September 24, 2024 (3 months ago)");
  });

  it("should format date and include relative time 1 year from the date", () => {
    const currentDate = new Date(2025, 8, 26);
    vi.setSystemTime(currentDate);
    const formattedDate = formatDate("2024-09-24", true);
    expect(formattedDate).toEqual("September 24, 2024 (1 year ago)");
  });

  it("should format date and include relative time 3 years from the date", () => {
    const currentDate = new Date(2027, 8, 25);
    vi.setSystemTime(currentDate);
    const formattedDate = formatDate("2024-09-24", true);
    expect(formattedDate).toEqual("September 24, 2024 (3 years ago)");
  });
});
