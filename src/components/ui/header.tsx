"use client";

import { Navbar } from "./nav";
import { ThemeModeToggle } from "./theme-mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 flex">
      <Navbar />
      <div className="ml-auto">
        <ThemeModeToggle />
      </div>
    </header>
  );
}
