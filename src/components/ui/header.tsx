"use client";

import { Navbar } from "./nav";
import { ThemeModeToggle } from "./theme-mode-toggle";

export function Header() {
  return (
    <header className="flex">
      <Navbar />
      <div className="ml-auto">
        <ThemeModeToggle />
      </div>
    </header>
  );
}
