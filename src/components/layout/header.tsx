"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const active = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:text-brand-red",
                  active(item.href) && "text-brand-red",
                )}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full w-56 border border-border bg-white py-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-4 py-2 text-sm text-charcoal hover:bg-surface hover:text-brand-red"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button asChild className="ml-3">
            <Link href="/contact#quote">Get a Quote</Link>
          </Button>
          <Button asChild className="ml-3" variant={"gold"}>
            <Link href="/admin/login">Admin Login</Link>
          </Button>
        </nav>
        <button
          className="rounded p-2 text-charcoal lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          aria-label="Mobile"
          className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-border bg-white px-4 pb-6 lg:hidden"
        >
          {mainNav.map((item) => (
            <div key={item.href} className="border-b border-border py-1">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 font-medium text-charcoal",
                  active(item.href) && "text-brand-red",
                )}
              >
                {item.label}
              </Link>
              {item.children?.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 pl-4 text-sm text-muted-foreground"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          ))}
          <Button asChild className="mt-4 w-full" size="lg">
            <Link href="/contact#quote" onClick={() => setOpen(false)}>
              Get a Quote
            </Link>
          </Button>
          <Button asChild className="mt-4 w-full" size="lg" variant={"gold"}>
            <Link href="/admin/login">Admin Login</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
