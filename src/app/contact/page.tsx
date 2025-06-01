"use client";

import { MessageSquare, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function ContactClient() {
  const [copied, setCopied] = useState(false);

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText("+79934371008");
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <main
      className={`
        relative flex flex-col gap-y-16 overflow-hidden bg-gradient-to-b
        from-muted/50 via-muted/25 to-background
      `}
    >
      {/* Декоративные фигуры */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`
            absolute -top-16 -left-16 h-56 w-56 animate-pulse rounded-full
            bg-indigo-200 opacity-30 mix-blend-multiply
            dark:bg-indigo-800
          `}
        />
        <div
          className={`
            absolute right-0 bottom-0 h-72 w-72 rotate-45 animate-pulse
            rounded-lg bg-pink-200 opacity-30 mix-blend-multiply delay-2000
            dark:bg-pink-800
          `}
        />
      </div>

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
            Контакты
          </h1>
          <p
            className={`
              mx-auto mt-4 max-w-2xl text-lg text-muted-foreground
              md:text-xl
            `}
          >
            Мы всегда на связи и готовы помочь вам.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section
        className={`
          py-12
          md:py-16
        `}
      >
        <div
          className={`
            container mx-auto max-w-3xl px-4
            sm:px-6
            lg:px-8
          `}
        >
          <div
            className={`
              grid grid-cols-1 gap-10
              md:grid-cols-2
            `}
          >
            {/* Phone Card */}
            <a
              className={`
                bg-opacity-50 relative block overflow-hidden rounded-2xl border
                border-gray-200 bg-white p-8 backdrop-blur-sm
                transition-transform
                dark:bg-opacity-50 dark:border-gray-700 dark:bg-gray-900
                hover:scale-[1.02]
              `}
              href="tel:+79934371008"
              onClick={copyPhoneToClipboard}
            >
              <div
                className={`
                  absolute -top-10 -right-10 h-40 w-40 rounded-full
                  bg-indigo-100 opacity-40 mix-blend-multiply
                  dark:bg-indigo-900
                `}
              />
              <div className="flex items-center justify-center gap-x-3">
                <Phone className="h-6 w-6 text-foreground" />
                <span className="text-lg font-medium text-foreground">
                  +7 993 437-10-08
                </span>
              </div>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                10:00–18:00 МСК
              </p>
              <div
                className={`
                  mt-2 text-center text-sm text-green-500 transition-opacity
                  duration-300
                  ${copied ? `opacity-100` : `opacity-0`}
                `}
              >
                Номер скопирован!
              </div>
            </a>

            {/* Telegram Card */}
            <a
              className={`
                bg-opacity-50 relative block overflow-hidden rounded-2xl border
                border-gray-200 bg-white p-8 backdrop-blur-sm
                transition-transform
                dark:bg-opacity-50 dark:border-gray-700 dark:bg-gray-900
                hover:scale-[1.02]
              `}
              href="https://t.me/ZAVALI_support"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div
                className={`
                  absolute -bottom-12 -left-12 h-52 w-52 rotate-45 rounded-lg
                  bg-pink-100 opacity-40 mix-blend-multiply
                  dark:bg-pink-900
                `}
              />
              <div className="flex items-center justify-center gap-x-3">
                <MessageSquare className="h-6 w-6 text-foreground" />
                <span className="text-lg font-medium text-foreground">
                  Telegram
                </span>
              </div>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Можете написать сюда
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
