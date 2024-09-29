import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ThemeProvider } from "../theme-provider";
import { ThemeModeToggle } from "./theme-mode-toggle";

describe("ThemeModeToggle", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  test("should toggle theme from light to dark", async () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    const user = userEvent.setup();

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ThemeModeToggle />
      </ThemeProvider>
    );

    const htmlElement = document.documentElement;
    waitFor(() => {
      expect(htmlElement).toHaveStyle({ "color-scheme ": "light" });
    });

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("menuitem", { name: /dark/i }));

    waitFor(() => {
      expect(document.documentElement).toHaveStyle({ "color-scheme": "dark" });
    });
  });

  test("should toggle theme from dark to light", async () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const user = userEvent.setup();

    render(
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ThemeModeToggle />
      </ThemeProvider>
    );

    const htmlElement = document.documentElement;
    waitFor(() => {
      expect(htmlElement).toHaveStyle({ "color-scheme": "dark" });
    });

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("menuitem", { name: /light/i }));

    expect(htmlElement).toHaveStyle({ "color-scheme": "light" });
  });

  test("should check current theme and then toggle system theme (light)", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: light)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ThemeModeToggle />
      </ThemeProvider>
    );

    const htmlElement = document.documentElement;

    waitFor(() => {
      expect(htmlElement).toHaveStyle({ "color-scheme": "dark" });
    });

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("menuitem", { name: /system/i }));

    await waitFor(() => {
      expect(document.documentElement).toHaveStyle({ "color-scheme": "light" });
    });
  });

  test("should check current theme and then toggle system theme (dark)", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ThemeModeToggle />
      </ThemeProvider>
    );

    const htmlElement = document.documentElement;

    waitFor(() => {
      expect(htmlElement).toHaveStyle({ "color-scheme": "light" });
    });

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("menuitem", { name: /system/i }));

    waitFor(() => {
      expect(htmlElement).toHaveStyle({ "color-scheme": "dark" });
    });
  });
});
