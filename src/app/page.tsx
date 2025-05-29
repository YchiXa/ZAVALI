import { ArrowRight, Clock, ShoppingBag, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "~/lib/utils";
import { HeroBadge } from "~/ui/components/hero-badge";
import { ProductCard } from "~/ui/components/product-card";
import { TestimonialsSection } from "~/ui/components/testimonials/testimonials-with-marquee";
import { Button } from "~/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/ui/primitives/card";

import { categories, featuredProductsHomepage, testimonials } from "./mocks";

const featuresWhyChooseUs = [
  {
    description: "Быстрая и надежная доставка до двери бывшего.",
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: "Бесплатная доставка",
  },
  {
    description: "Ваша платежная информация всегда в безопасности.",
    icon: <ShoppingBag className="h-6 w-6 text-primary" />,
    title: "Безопасная оплата",
  },
  {
    description:
      "Наша служба поддержки не всегда готова помочь с любыми вопросами или проблемами.",
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Поддержка в рабочие дни с 10:00 до 18:00",
  },
  {
    description: "Мы гарантируем ужасное качество каждого проданного подарка.",
    icon: <Star className="h-6 w-6 text-primary" />,
    title: "Гарантия плохого качества",
  },
];

export default function HomePage() {
  return (
    <>
      <main
        className={`
          flex min-h-screen flex-col gap-y-16 bg-gradient-to-b from-muted/50
          via-muted/25 to-background
        `}
      >
        {/* Hero Section */}
        <section
          className={`
            relative overflow-hidden py-24
            md:py-32
          `}
        >
          <div
            className={`
              bg-grid-black/[0.02] absolute inset-0
              bg-[length:20px_20px]
            `}
          />
          <div
            className={`
              relative z-10 container mx-auto max-w-7xl px-4
              sm:px-6
              lg:px-8
            `}
          >
            <div
              className={`
                grid items-center gap-10
                lg:grid-cols-2 lg:gap-12
              `}
            >
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <HeroBadge />

                  <h1
                    className={`
                      font-display text-4xl leading-tight font-bold
                      tracking-tight text-foreground
                      sm:text-5xl
                      md:text-6xl
                      lg:leading-[1.1]
                    `}
                  >
                    Анти-подарки для самых{" "}
                    <span className="font-['Neucha'] text-red-500">худших</span>{" "}
                    людей
                  </h1>
                  <p
                    className={`
                      max-w-[700px] text-lg text-muted-foreground
                      md:text-xl
                    `}
                  >
                    Откройте для себя новый мир "подарков", где не нужно думать
                    что подарить. Довертесь нам и человек точно получит эмоции.
                  </p>
                </div>
                <div
                  className={`
                    flex flex-col gap-3
                    sm:flex-row
                  `}
                >
                  <Link href="/products">
                    <Button
                      className={`
                        h-12 gap-1.5 px-8 transition-colors duration-200
                      `}
                      size="lg"
                    >
                      Магазин <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/showcase">
                    <Button
                      className="h-12 px-8 transition-colors duration-200"
                      size="lg"
                      variant="outline"
                    >
                      Примеры работ
                    </Button>
                  </Link>
                </div>
                <div
                  className={`
                    flex flex-wrap gap-5 text-sm text-muted-foreground
                  `}
                >
                  <div className="flex items-center gap-1.5">
                    <Truck className="h-5 w-5 text-primary/70" />
                    <span>Точно бесплатная доставка</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-5 w-5 text-primary/70" />
                    <span>
                      Поддержка иногда работает. Попробуйте позвонить или
                      написать с 10:00 до 18:00
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`
                  relative mx-auto hidden aspect-square w-full max-w-md
                  overflow-hidden rounded-xl border shadow-lg
                  lg:block
                `}
              >
                <div
                  className={`
                    absolute inset-0 z-10 bg-gradient-to-tr from-primary/20
                    via-transparent to-transparent
                  `}
                />
                <Image
                  alt="Shopping experience"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src="/main.webp"
                  unoptimized
                />
              </div>
            </div>
          </div>
          <div
            className={`
              absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent
              via-primary/20 to-transparent
            `}
          />
        </section>

        {/* Featured Categories */}
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
            <div className="mb-8 flex flex-col items-center text-center">
              <h2 className="text-center text-3xl font-bold tracking-tight">
                Покупка по категориям
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                Найдите идеальное решение для мести
              </p>
            </div>
            <div
              className={cn(
                "grid grid-cols-2 gap-4",
                "md:grid-cols-4 md:gap-6",
                "[&>*:last-child]:md:col-start-2"
              )}
            >
              {categories.map((category) => (
                <Link
                  aria-label={`Browse ${category.name} products`}
                  className={cn(
                    "group relative flex flex-col space-y-4 overflow-hidden",
                    `
                      rounded-2xl border bg-card shadow transition-all
                      duration-300
                      hover:shadow-lg
                    `
                  )}
                  href={`/products?category=${encodeURIComponent(
                    category.name
                  )}`}
                  key={category.name}
                >
                  <div className={cn("relative aspect-[4/3] overflow-hidden")}>
                    <div
                      className={cn(
                        `
                          absolute inset-0 z-10 bg-gradient-to-t
                          from-background/80 to-transparent
                        `
                      )}
                    />
                    <div
                      className={cn(
                        `
                          absolute inset-0 transition duration-300
                          group-hover:scale-105
                        `
                      )}
                    >
                      <Image
                        alt={category.name}
                        className="object-cover"
                        fill
                        src={`/${
                          category.color === "gradient-red-black"
                            ? "incredibly.webp"
                            : category.color === "purple"
                            ? "nothink.webp"
                            : category.color === "green"
                            ? "weakly.webp"
                            : category.color === "orange"
                            ? "medium.webp"
                            : category.color === "red"
                            ? "strongly.webp"
                            : "placeholder.svg"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.productCount} товаров
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section
          className={`
            bg-muted/50 py-12
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
            <div className="mb-8 flex flex-col items-center text-center">
              <h2
                className={`
                  font-display text-3xl leading-tight font-bold tracking-tight
                  md:text-4xl
                `}
              >
                Популярные товары
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                Ознакомьтесь с нашими новейшими и популярными услугами
              </p>
            </div>
            <div
              className={`
                grid grid-cols-1 gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              `}
            >
              {featuredProductsHomepage.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link href="/products">
                <Button className="group h-12 px-8" size="lg" variant="outline">
                  Смотреть все услуги
                  <ArrowRight
                    className={`
                      ml-2 h-4 w-4 transition-transform duration-300
                      group-hover:translate-x-1
                    `}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className={`
            py-12
            md:py-16
          `}
          id="features"
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
                className={`
                  font-display text-3xl leading-tight font-bold tracking-tight
                  md:text-4xl
                `}
              >
                Почему выбирают нас?
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p
                className={`
                  mt-4 max-w-2xl text-center text-muted-foreground
                  md:text-lg
                `}
              >
                Да потому что больше нет таких дураков, которые бы решились на
                воплощение этого!
              </p>
            </div>
            <div
              className={`
                grid gap-8
                md:grid-cols-2
                lg:grid-cols-4
              `}
            >
              {featuresWhyChooseUs.map((feature) => (
                <Card
                  className={`
                    rounded-2xl border-none bg-background shadow transition-all
                    duration-300
                    hover:shadow-lg
                  `}
                  key={feature.title}
                >
                  <CardHeader className="pb-2">
                    <div
                      className={`
                        mb-3 flex h-12 w-12 items-center justify-center
                        rounded-full bg-primary/10
                      `}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          className={`
            bg-muted/50 py-12
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
            <TestimonialsSection
              className="py-0"
              description="Не верьте нам на слово - послушайте наших 'довольных' клиентов"
              testimonials={testimonials}
              title="Что говорят наши клиенты"
            />
          </div>
        </section>

        {/* CTA Section */}
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
                relative overflow-hidden rounded-xl bg-primary/10 p-8 shadow-lg
                md:p-12
              `}
            >
              <div
                className={`
                  bg-grid-white/[0.05] absolute inset-0
                  bg-[length:16px_16px]
                `}
              />
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h2
                  className={`
                    font-display text-3xl leading-tight font-bold tracking-tight
                    md:text-4xl
                  `}
                >
                  Готовы почувствовать себя безнаказанным и счастливым?
                </h2>
                <p
                  className={`
                    mt-4 text-lg text-muted-foreground
                    md:text-xl
                  `}
                >
                  Присоединяйтесь к другим таким же и делайте то о чем потом не
                  пожалеете. Начните прямо сейчас!
                </p>
                <div
                  className={`
                    mt-6 flex flex-col items-center justify-center gap-3
                    sm:flex-row
                  `}
                >
                  <Link href="/products">
                    <Button size="lg">Смотреть товары</Button>
                  </Link>
                  <Link href="/showcase">
                    <Button
                      className="h-12 px-8 transition-colors duration-200"
                      size="lg"
                      variant="outline"
                    >
                      Примеры работ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
