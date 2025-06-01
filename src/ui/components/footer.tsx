import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";

import { SEO_CONFIG } from "~/app";
import { cn } from "~/lib/cn";
import { Button } from "~/ui/primitives/button";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div
        className={`
          container mx-auto max-w-7xl px-4 py-12
          sm:px-6
          lg:px-8
        `}
      >
        <div
          className={`
            grid grid-cols-1 gap-8
            md:grid-cols-4
          `}
        >
          {/* 1. Логотип, описание и социальные ссылки */}
          <div className="space-y-4">
            <Link className="flex items-center gap-2" href="/">
              <span className="zavali-text text-xl font-bold tracking-tight">
                {SEO_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Ваш уникальный магазин эмоций. Необычные услуги для необычных
              людей.
            </p>
            <div className="flex space-x-4">
              <Button
                className="h-8 w-8 rounded-full"
                size="icon"
                variant="ghost"
              >
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
              <Button
                className="h-8 w-8 rounded-full"
                size="icon"
                variant="ghost"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>

          {/* 2 & 3: вместо пустого div используем автопозиционирование */}
          <div className="md:col-start-3">
            <h3 className="mb-4 text-sm font-semibold">Магазин</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="/products"
                >
                  Все товары
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="/products?category=Не%20думая"
                >
                  Не думая
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="/products?category=Слабо"
                >
                  Слабо
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="/products?category=Среднее"
                >
                  Среднее
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="/products?category=Жестко"
                >
                  Жестко
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="/products?category=Невероятно"
                >
                  Невероятно
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-start-4">
            <h3 className="mb-4 text-sm font-semibold">Компания</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="/about"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="/blog"
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="/contact"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div
            className={`
              flex flex-col items-center justify-between gap-4
              md:flex-row
            `}
          >
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {SEO_CONFIG.name}. Все права
              защищены.
            </p>
            <div
              className={`flex items-center gap-4 text-sm text-muted-foreground`}
            >
              <Link className="hover:text-foreground" href="/privacy">
                Конфиденциальность
              </Link>
              <Link className="hover:text-foreground" href="/terms">
                Условия
              </Link>
              <Link className="hover:text-foreground" href="/cookies">
                Куки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
