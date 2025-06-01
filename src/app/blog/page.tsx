import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  description: 'Читайте последние статьи и новости нашей компании.',
  title: 'Блог | zavali',
};

const posts = [
  { excerpt: 'Советы и лайфхаки для самых смелых сюрпризов.', href: '/blog/1', id: 1, image: '/blog/post1.webp', title: 'Как выбрать анти-подарок' },
  { excerpt: 'Погружение в путь нашей команды.', href: '/blog/2', id: 2, image: '/blog/post2.webp', title: 'История создания zavali' },
  // добавьте другие посты по необходимости
];

export default function BlogPage() {
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
            Блог
          </h1>
          <p className={`
            mx-auto mt-4 max-w-2xl text-lg text-muted-foreground
            md:text-xl
          `}>
            Последние статьи, советы и новости о «анти-подарках».
          </p>
        </div>
      </section>
      {/* Posts Grid */}
      <section className={`
        py-12
        md:py-16
      `}>
        <div className={`
          container mx-auto max-w-7xl px-4
          sm:px-6
          lg:px-8
        `}>
          <div className={`
            grid grid-cols-1 gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          `}>
            {posts.map((post) => (
              <div className={`
                group rounded-2xl border bg-card shadow transition
                hover:shadow-lg
              `} key={post.id}>
                <div className={`
                  relative aspect-video overflow-hidden rounded-t-2xl
                `}>
                  <Image
                    alt={post.title}
                    className={`
                      object-cover transition
                      group-hover:scale-105
                    `}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src={post.image}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <Link
                    className={`
                      mt-4 inline-flex items-center text-primary
                      hover:underline
                    `}
                    href={post.href}
                  >
                    Читать дальше <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
