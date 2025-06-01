import { Metadata } from 'next';

import { Button } from '~/ui/primitives/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/ui/primitives/card';

export const metadata: Metadata = {
  description: 'Откройте для себя карьерные возможности в zavali.',
  title: 'Карьера | zavali',
};

const positions = [
  { description: 'React, Next.js, Tailwind CSS', id: 1, location: 'Remote', title: 'Frontend-разработчик' },
  { description: 'Node.js, Drizzle ORM, PostgreSQL', id: 2, location: 'Москва', title: 'Backend-разработчик' },
  // добавьте другие позиции по необходимости
];

export default function CareerPage() {
  return (
    <main className={`
      flex flex-col gap-y-16 bg-gradient-to-b from-muted/50 via-muted/25
      to-background
    `}>
      {/* Hero Section */}
      <section className={`
        py-24
        md:py-32
      `}>
        <div className={`
          container mx-auto max-w-7xl px-4 text-center
          sm:px-6
          lg:px-8
        `}>
          <h1 className={`
            font-display text-4xl font-bold tracking-tight text-foreground
            sm:text-5xl
            md:text-6xl
          `}>
            Присоединяйтесь к нашей команде
          </h1>
          <p className={`
            mx-auto mt-4 max-w-2xl text-lg text-muted-foreground
            md:text-xl
          `}>
            Мы ищем талантливых людей, готовых создавать необычные решения и менять представление о подарках.
          </p>
        </div>
      </section>
      {/* Open Positions Section */}
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
            Открытые позиции
          </h2>
          <div className={`
            mt-8 grid grid-cols-1 gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          `}>
            {positions.map((pos) => (
              <Card className={`
                rounded-2xl border-none bg-background shadow transition
                hover:shadow-lg
              `} key={pos.id}>
                <CardHeader>
                  <CardTitle>{pos.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{pos.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground">{pos.description}</p>
                </CardContent>
                <div className="p-4 pt-0">
                  <Button asChild variant="outline">
                    <a href={`mailto:hr@zavali.com?subject=Вакансия ${encodeURIComponent(pos.title)}`}>Откликнуться</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
