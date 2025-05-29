"use client";

import { cn } from "~/lib/utils";
import { CartClient } from "~/ui/components/cart-client";
import { ThemeToggle } from "~/ui/components/theme-toggle";
import { Link } from "~/ui/primitives/link";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        `
          sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur
          supports-[backdrop-filter]:bg-background/60
        `,
        className
      )}
    >
      <div
        className={`
          container mx-auto flex h-14 items-center justify-between px-4
        `}
      >
        {/* Логотип */}
        <Link className="flex items-center space-x-2" href="/">
          <span className="zavali-text text-xl font-bold tracking-tight">
            ZAVALI
          </span>
        </Link>

        {/* Основная навигация */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            className={`
              transition-colors
              hover:text-foreground/80
            `}
            href="/products"
          >
            Товары
          </Link>
        </nav>

        {/* Правая часть с корзиной и переключателем темы */}
        <div className="flex items-center space-x-4">
          <CartClient className="relative" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
