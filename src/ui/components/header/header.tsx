"use client";

import { AlignJustify, CircleHelp } from "lucide-react";
import { useState } from "react";

import { cn } from "~/lib/utils";
import { CartClient } from "~/ui/components/cart-client";
import { ThemeToggle } from "~/ui/components/theme-toggle";
import { Link } from "~/ui/primitives/link";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const buttonClasses = cn(
    "flex items-center justify-center rounded-lg p-2 transition-colors",
    `
      hover:bg-muted/50
      focus:outline-none
      focus-visible:ring-2 focus-visible:ring-primary
      focus-visible:ring-offset-2
    `,
  );

  return (
    <header
      className={cn(
        `
          sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur
          supports-[backdrop-filter]:bg-background/60
        `,
        className,
      )}
    >
      <div
        className={`
          relative container mx-auto flex h-14 items-center justify-between px-4
        `}
      >
        {/* Логотип */}
        <Link className="flex items-center space-x-2" href="/">
          <span className="zavali-text text-xl font-bold tracking-tight">
            ZAVALI!
          </span>
        </Link>

        {/* Навигация всегда видна */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            className={cn(`
              transition-colors
              hover:text-foreground/80
            `)}
            href="/products"
          >
            Товары
          </Link>
        </nav>

        {/* Действия (desktop) */}
        <div
          className={`
            hidden items-center space-x-4
            sm:flex
          `}
        >
          <div className={buttonClasses}>
            <CartClient />
          </div>
          <Link
            aria-label="Связаться с нами"
            className={buttonClasses}
            href="/contact"
          >
            <CircleHelp className="h-6 w-6 text-primary" />
          </Link>
          <div className={buttonClasses}>
            <ThemeToggle />
          </div>
        </div>

        {/* Toggle меню (mobile) */}
        <button
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          className="sm:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          type="button"
        >
          <AlignJustify className="h-6 w-6 text-primary" />
        </button>

        {/* Выпадающее меню (mobile) */}
        {menuOpen && (
          <div
            className={`
              absolute top-full right-4 mt-2 flex w-40 flex-col space-y-2
              rounded-lg bg-card p-4 shadow-lg
            `}
          >
            {/* Cart: only close on wrapper click, not when clicking the icon */}
            <div
              className={buttonClasses}
              onClick={(e) => {
                if (e.target === e.currentTarget) setMenuOpen(false);
              }}
            >
              <CartClient />
            </div>
            <Link
              aria-label="Связаться с нами"
              className={buttonClasses}
              href="/contact"
              onClick={() => setMenuOpen(false)}
            >
              <CircleHelp className="h-6 w-6 text-primary" />
            </Link>
            <div className={buttonClasses} onClick={() => setMenuOpen(false)}>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
