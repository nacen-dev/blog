"use client";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

type NavLink = {
  title: string;
  href: string;
};

const navLinks: NavLink[] = [
  {
    title: "Home",
    href: "/",
  },
];

export function Navbar() {
  const pathName = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navLinks.map((navLink) => (
          <NavigationMenuItem key={navLink.href}>
            <NavigationMenuLink asChild active={navLink.href === pathName}>
              <Link
                href={navLink.href}
                className={`${navigationMenuTriggerStyle()} md:text-xl`}
                scroll={false}
              >
                {navLink.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
