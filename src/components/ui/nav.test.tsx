import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Navbar, NavLink } from "./nav-bar";

describe("Navbar", () => {
  it("should provide links based on props passed to component", () => {
    const navLinks: NavLink[] = [
      { title: "home", href: "/" },
      { title: "contact", href: "/contact" },
      { title: "blog", href: "/blog" },
    ];
    const { getAllByRole } = render(<Navbar navLinks={navLinks} />);

    const links = getAllByRole("link").map((link) => ({
      title: link.textContent,
      href: link.getAttribute("href"),
    }));

    expect(links).toEqual(navLinks);
  });
});
