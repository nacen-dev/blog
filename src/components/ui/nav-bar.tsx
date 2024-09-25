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

export type NavLink = {
  title: string;
  href: string;
};

type Props = {
  navLinks: NavLink[];
};

export function Navbar({ navLinks }: Props) {
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
