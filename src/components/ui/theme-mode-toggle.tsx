"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
export function ThemeModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun
                  className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 `}
                />
                <Moon
                  className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 `}
                />
                <span className={`sr-only`}>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle theme</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          className="p-0"
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuItem
            className={`flex gap-2 rounded-none ${
              theme === "light" ? "text-primary" : ""
            }`}
            onClick={() => setTheme("light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
            <p>Light</p>
          </DropdownMenuItem>

          <DropdownMenuItem
            className={`flex gap-2 rounded-none ${
              theme === "dark" ? "text-primary" : ""
            }`}
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
            <p>Dark</p>
          </DropdownMenuItem>

          <DropdownMenuItem
            className={`flex gap-2 rounded-none ${
              theme === "system" ? "text-primary" : ""
            }`}
            onClick={() => setTheme("system")}
          >
            <Monitor className="h-[1.2rem] w-[1.2rem]" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
