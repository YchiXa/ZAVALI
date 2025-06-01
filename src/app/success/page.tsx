// src/app/success/page.tsx

import Link from "next/link";
import React from "react";

import { Button } from "~/ui/primitives/button";

export default function SuccessPage() {
  return (
    <div
      className={`
      flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4
      py-8
    `}
    >
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-3xl font-bold text-green-600">
          Спасибо за заказ!
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          Ваша заявка успешно принята. Мы свяжемся с вами в ближайшее время для
          подтверждения деталей доставки.
        </p>
        <Link href="/">
          <Button className="px-6 py-3">Вернуться на главную</Button>
        </Link>
      </div>
    </div>
  );
}
