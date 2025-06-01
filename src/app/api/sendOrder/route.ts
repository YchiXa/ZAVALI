// src/app/api/sendOrder/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";

// 1) Zod-схема для валидации тела запроса
const orderSchema = z.object({
  deliveryDate: z.string(), // ISO-строка даты
  deliveryTime: z.string().min(1, "Выберите время доставки"),
  entrance: z.string().optional(),
  house: z.string().min(1, "Введите номер дома"),
  items: z.array(z.string()).min(1, "Список товаров не может быть пустым"),
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  street: z.string().min(5, "Введите адрес"),
  total: z.number(), // общая сумма (в рублях)
});

// 3) Интерфейс для ответа Telegram API
interface TelegramResponse {
  [key: string]: any;
  description?: string;
  ok: boolean;
}

// 4) Обработчик POST-запроса
export async function POST(request: Request) {
  try {
    console.log("→ /api/sendOrder: получен запрос");

    // Логируем переменные окружения, чтобы убедиться, что токены читаются
    console.log("→ TELEGRAM_BOT_TOKEN =", process.env.TELEGRAM_BOT_TOKEN);
    console.log("→ TELEGRAM_CHAT_ID =", process.env.TELEGRAM_CHAT_ID);

    // 5) Парсим JSON-тело
    const rawBody: unknown = await request.json();
    console.log("→ BODY (raw):", rawBody);

    // 6) Валидация через Zod
    const parsed = orderSchema.safeParse(rawBody);
    if (!parsed.success) {
      console.log("→ Zod-ошибки:", parsed.error.format());
      return NextResponse.json(
        {
          errors: parsed.error.format(),
          success: false,
        },
        { status: 400 },
      );
    }

    // 7) Деструктурируем проверенные данные
    const {
      deliveryDate,
      deliveryTime,
      entrance,
      house,
      items,
      name,
      phone,
      street,
      total,
    } = parsed.data;

    // Преобразуем ISO-дату в формат "ДД.MM.ГГГГ"
    const dateObj = new Date(deliveryDate);
    const humanDate = dateObj.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Собираем список товаров
    const itemsList = items
      .map((itemName) => `- ${escapeHtml(itemName)}`)
      .join("\n");

    // 8) Формируем HTML-текст для Telegram
    const text = `
<b>Новый Заказ! "ZAVALI!"</b>

Имя: ${escapeHtml(name)}
Телефон: ${escapeHtml(phone)}
Город: Нижний Новгород
Улица: ${escapeHtml(street)}
Дом: ${escapeHtml(house)}
Подъезд/Кв: ${escapeHtml(entrance ?? "не указан")}
Дата доставки: ${humanDate}
Время доставки: ${escapeHtml(deliveryTime)}

<b>Сумма заказа:</b> ${total} ₽

<b>Товары:</b>
${itemsList}
    `.trim();

    console.log("→ Сформированный text для Telegram:\n", text);

    // 9) Проверяем переменные окружения для бота
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) {
      throw new Error("Не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID");
    }

    // 10) Отправляем запрос к Telegram Bot API (в том числе в режиме разработки)
    let telegramResponse: Response;
    try {
      telegramResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          body: JSON.stringify({
            chat_id: chatId,
            parse_mode: "HTML",
            text,
          }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        },
      );
    } catch (networkError: unknown) {
      console.error("Ошибка сети при отправке в Telegram:", networkError);
      return NextResponse.json(
        {
          error: "Ошибка соединения с Telegram. Попробуйте позже.",
          success: false,
        },
        { status: 502 },
      );
    }

    const telegramResult = (await telegramResponse.json()) as TelegramResponse;
    console.log(
      "→ Telegram API status:",
      telegramResponse.status,
      "body:",
      telegramResult,
    );

    if (!telegramResponse.ok || !telegramResult.ok) {
      console.error("Ошибка Telegram API:", telegramResult);
      throw new Error(
        telegramResult.description ||
          "Не удалось отправить сообщение в Telegram",
      );
    }

    // 11) Успешно отправлено
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    console.error("Ошибка отправки заявки:", e);
    const message =
      e instanceof Error ? e.message : "Unknown error during sendOrder";
    return NextResponse.json(
      {
        error: message,
        success: false,
      },
      { status: 500 },
    );
  }
}

// 2) Утилита для экранирования HTML-спецсимволов
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
