"use client";

import { Navbar, NavLink } from "./nav";
import { ThemeModeToggle } from "./theme-mode-toggle";

const navLinks: NavLink[] = [
  {
    title: "Home",
    href: "/",
  },
];

export function Header() {
  return (
    <header className="flex">
      <Navbar navLinks={navLinks} />
      <div className="ml-auto">
        <ThemeModeToggle />
      </div>
    </header>
  );
}
