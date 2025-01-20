"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const routes = [
  {
    href: "/",
    label: "Meal Planner",
  },
  {
    href: "/mtg-counter",
    label: "MTG Life Counter",
  },
  {
    href: "/todo",
    label: "Todo List",
  },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 mt-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground ${
                    pathname === route.href ? "bg-accent" : ""
                  }`}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">10 second tidy collection</h1>
        </div>
      </div>
    </header>
  );
}
