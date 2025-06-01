import Image from "next/image";
import Link from "next/link";

import { categories } from "~/app/mocks";
import { cn } from "~/lib/utils";

export function CategorySection() {
  return (
    <section
      aria-labelledby="categories-title"
      className={`
        py-12
        md:py-16
      `}
      id="categories-section"
    >
      <div
        className={`
        container mx-auto max-w-7xl px-4
        sm:px-6
        lg:px-8
      `}
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <h2
            className="text-3xl font-bold tracking-tight text-foreground"
            id="categories-title"
          >
            Покупка по категориям
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Найдите идеальное решение для мести в нашей коллекции анти-подарков
          </p>
        </div>
        <div
          className={cn(
            `
              grid grid-cols-1 gap-8
              md:grid-cols-2
              lg:grid-cols-4
            `,
            "justify-items-center",
          )}
        >
          {categories.map((category) => (
            <Link
              aria-describedby={`category-${category.name}-desc`}
              className={cn(
                `
                  group relative flex w-full max-w-lg flex-col space-y-6
                  overflow-hidden
                `,
                `
                  rounded-3xl border bg-card shadow transition-transform
                  duration-200
                `,
                `
                  transform-gpu
                  hover:scale-105 hover:shadow-lg
                `,
                `
                  focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-primary
                  focus-visible:ring-offset-2
                `,
                "cursor-pointer",
              )}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              key={category.name}
              role="group"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <div
                  className={`
                  absolute inset-0 z-10 bg-gradient-to-t from-background/90
                  to-transparent
                `}
                />
                <Image
                  alt={category.name}
                  blurDataURL="/placeholder.png"
                  className="object-cover"
                  fill
                  loading="lazy"
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src={`/${getImageForColor(category.color)}`}
                />
              </div>
              <div className="px-6 py-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {category.name}
                </h3>
                <p
                  className="mt-2 text-base text-muted-foreground"
                  id={`category-${category.name}-desc`}
                >
                  {category.productCount} товаров
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function getImageForColor(color: string) {
  switch (color) {
    case "gradient-red-black":
      return "incredibly.webp";
    case "green":
      return "weakly.webp";
    case "orange":
      return "medium.webp";
    case "purple":
      return "nothink.webp";
    case "red":
      return "strongly.webp";
    default:
      return "placeholder.svg";
  }
}
