import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  description: 'Узнайте больше о миссии, ценностях и команде zavali.',
  title: 'О нас | zavali',
};

export default function AboutPage() {
  return (
    <main className={`
      flex flex-col gap-y-16 bg-gradient-to-b from-muted/50 via-muted/25
      to-background
    `}>
      {/* Hero Section */}
      <section className={`
        relative overflow-hidden py-24
        md:py-32
      `}>
        <div className={`
          bg-grid-black/[0.02] absolute inset-0
          bg-[length:20px_20px]
        `} />
        <div className={`
          relative z-10 container mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        `}>
          <div className={`
            grid items-center gap-10
            lg:grid-cols-2 lg:gap-12
          `}>
            <div className="space-y-4">
              <h1 className={`
                font-display text-4xl font-bold tracking-tight text-foreground
                sm:text-5xl
                md:text-6xl
              `}>
                О нашей компании
              </h1>
              <p className={`
                mt-4 text-lg text-muted-foreground
                md:text-xl
              `}>
                Zavali — это платформа уникальных «анти-подарков», созданных для самых
                смелых и необычных эмоций.
              </p>
            </div>
            <div className={`
              relative mx-auto hidden aspect-square w-full max-w-md
              overflow-hidden rounded-xl border shadow-lg
              lg:block
            `}>
              <Image
                alt="Наша команда"
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src="/about-hero.webp"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className={`
        py-12
        md:py-16
      `}>
        <div className={`
          container mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        `}>
          <h2 className={`
            font-display text-center text-3xl font-bold tracking-tight
            md:text-4xl
          `}>
            Наша миссия
          </h2>
          <p className={`
            mx-auto mt-4 max-w-2xl text-center text-muted-foreground
          `}>
            Дарить неординарные эмоции и воспоминания через самые неожиданные подарки.
          </p>
        </div>
      </section>
      {/* Team Section */}
      <section className={`
        py-12
        md:py-16
      `}>
        <div className={`
          container mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        `}>
          <h2 className={`
            font-display text-center text-3xl font-bold tracking-tight
            md:text-4xl
          `}>
            Наша команда
          </h2>
          <div className={`
            mt-8 grid grid-cols-1 gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          `}>
            {/* Пример участника команды */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <Image
                alt="Имя Фамилия"
                className="rounded-full"
                height={120}
                src="/team/member1.jpg"
                width={120}
              />
              <h3 className="text-lg font-semibold">Имя Фамилия</h3>
              <p className="text-sm text-muted-foreground">CEO & Основатель</p>
            </div>
            {/* Добавьте других участников аналогично */}
          </div>
        </div>
      </section>
    </main>
  );
}