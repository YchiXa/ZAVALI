<<<<<<< HEAD
# ZAVALI
=======
# ZAVALI

ZAVALI is a robust eCommerce template built with Next.js. It's designed for developers who want a fast, modern, and scalable foundation without reinventing the backend.

## Features

1. 🚀 **Next.js 14**: App Router, Server Components, and more
2. 🎨 **UI**: [shadcn/ui](https://ui.shadcn.com)
3. 📦 **Database**: [Drizzle](https://orm.drizzle.team)
4. 📝 **Content**: [MDX](https://mdxjs.com)
5. 🎨 **Styling**: [Tailwind CSS](https://tailwindcss.com)
6. 📱 **Mobile**: Responsive design
7. 🌐 **SEO**: Metadata, OpenGraph, and more
8. 🔒 **Security**: HTTPS, CSP, and more

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up your environment variables:

   ```bash
   cp .env.example .env
   ```

4. Set up your database:

   ```bash
   bun db:push
   ```

5. Start the development server:

   ```bash
   bun dev
   ```

## Database

The project uses Drizzle ORM with a PostgreSQL database. You can use any PostgreSQL provider of your choice.

### Database Commands

| Command        | Description                    |
| -------------- | ------------------------------ |
| `bun db:push`  | push schema changes to db      |
| `bun db:studio` | open Drizzle Studio          |

## License

MIT
>>>>>>> 724e0b5 (Initial commit)
