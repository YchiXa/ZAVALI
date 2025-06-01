import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import { cn } from "~/lib/utils";
import { Button } from "~/ui/primitives/button";

export const metadata: Metadata = {
  description: "Посмотрите галерею наших выполненных анти-подарков.",
  title: "Примеры работ | zavali",
};

// Массив примеров выполненных работ
const examples = [
  {
    href: "/showcase/1",
    id: 1,
    image: "/showcase/1.webp",
    title: "Упаковка-сюрприз",
  },
  {
    href: "/showcase/2",
    id: 2,
    image: "/showcase/2.webp",
    title: "Нестандартный набор",
  },
  {
    href: "/showcase/3",
    id: 3,
    image: "/showcase/3.webp",
    title: "Креативная коробка",
  },
  {
    href: "/showcase/4",
    id: 4,
    image: "/showcase/4.webp",
    title: "Сборка для мести",
  },
  // добавьте больше примеров по необходимости
];

export default function ShowcasePage() {
  return (
    <main
      className={cn(
        "flex flex-col gap-y-16",
        "min-h-screen bg-gradient-to-b from-muted/50 via-muted/25 to-background",
      )}
    >
      {/* Hero Section */}
      <section
        className={`
          py-24
          md:py-32
        `}
      >
        <div
          className={`
            container mx-auto max-w-7xl px-4 text-center
            sm:px-6
            lg:px-8
          `}
        >
          <h1
            className={`
              font-display text-4xl font-bold tracking-tight text-foreground
              sm:text-5xl
              md:text-6xl
            `}
          >
            Примеры работ
          </h1>
          <p
            className={`
              mx-auto mt-4 max-w-2xl text-lg text-muted-foreground
              md:text-xl
            `}
          >
            Галерея наших завершённых анти-подарков: идеи и вдохновение.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        className={`
          py-12
          md:py-16
        `}
      >
        <div
          className={`
            container mx-auto max-w-7xl px-4
            sm:px-6
            lg:px-8
          `}
        >
          <div
            className={`
              grid grid-cols-1 gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            `}
          >
            {examples.map((item) => (
              <Link
                className={cn(
                  "group relative block overflow-hidden rounded-2xl",
                  "border bg-card shadow transition-transform duration-200",
                  "hover:scale-105 hover:shadow-lg",
                )}
                href={item.href}
                key={item.id}
              >
                <div className="relative aspect-square w-full">
                  <Image
                    alt={item.title}
                    blurDataURL="/placeholder.png"
                    className="object-cover"
                    fill
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    src={item.image}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`
          py-12
          md:py-16
        `}
      >
        <div
          className={`
            container mx-auto max-w-7xl px-4 text-center
            sm:px-6
            lg:px-8
          `}
        >
          <p className="text-lg text-muted-foreground">
            Хочешь заказать анти-подарок?
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/products">
              <Button size="lg">Так сделай это!</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
