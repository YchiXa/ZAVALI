"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { useCart } from "~/lib/hooks/use-cart";
import { Button } from "~/ui/primitives/button";
import { Input } from "~/ui/primitives/input";
import { Separator } from "~/ui/primitives/separator";
import { Slider } from "~/ui/primitives/slider";

/* -------------------------------------------------------------------------- */
/*                               Type declarations                            */
/* -------------------------------------------------------------------------- */

interface Product {
  category: string;
  description: string;
  features: string[];
  id: string;
  image: string;
  inStock: boolean;
  name: string;
  originalPrice?: number;
  price: number;
  rating: number;
  specs: Record<string, string>;
}

/* -------------------------------------------------------------------------- */
/*                         Helpers (shared, memo-safe)                        */
/* -------------------------------------------------------------------------- */

const CURRENCY_FORMATTER = new Intl.NumberFormat("ru-RU", {
  currency: "RUB",
  style: "currency",
});

/** `feature -> feature` ➜ `feature-feature` (for React keys) */
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

/* -------------------------------------------------------------------------- */
/*                        Static product data (demo only)                     */
/* -------------------------------------------------------------------------- */

const products: Product[] = [
  {
    category: "Слабо",
    description:
      "Премиальные беспроводные наушники с активным шумоподавлением и премиальным звуком.",
    features: [
      "Активное шумоподавление",
      "30 часов автономной работы",
      "Водонепроницаемость IPX4",
      "Bluetooth 5.0",
      "Встроенный микрофон",
      "Сенсорное управление",
    ],
    id: "1",
    image: "/flower.webp",
    inStock: true,
    name: "Ужасный Букет, Не Менее УЖАСНОМУ Человеку(",
    originalPrice: 249.99,
    price: 199.99,
    rating: 5,
    specs: {
      batteryLife: "30 часов",
      brand: "SoundPro",
      connectivity: "Bluetooth 5.0",
      model: "AirPods Pro",
      noiseCancellation: "Активное",
      warranty: "1 год",
      waterResistance: "IPX4",
    },
  },
  {
    category: "Среднее",
    description:
      "Оставайтесь на связи и отслеживайте свои фитнес-цели с нашими продвинутыми умными часами. Функции мониторинга здоровья, GPS-отслеживание и красивый всегда включенный дисплей.",
    features: [
      "Мониторинг здоровья (пульс, ЭКГ, сон)",
      "Водонепроницаемость до 50м",
      "GPS-отслеживание",
      "7-дневное время работы от батареи",
      "Всегда включенный дисплей Retina",
      "Настраиваемые циферблаты",
    ],
    id: "2",
    image: "/candy.webp",
    inStock: true,
    name: "Конфеты Для ХУДШИХ!",
    originalPrice: 349.99,
    price: 299.99,
    rating: 5,
    specs: {
      batteryLife: "7 дней",
      brand: "TechFit",
      compatibility: "iOS, Android",
      display: '1.5" AMOLED',
      model: "Watch Pro 5",
      warranty: "1 год",
      waterResistance: "5 ATM",
    },
  },
  {
    category: "Невероятно",
    description:
      "Максимальный опыт использования смартфона с потрясающим дисплеем, мощной системой камер и аккумулятором на весь день.",
    features: [
      'Дисплей Super Retina XDR 6.7"',
      "Тройная система камер (12МП широкоугольная, сверхширокоугольная, телефото)",
      "Face ID для безопасной аутентификации",
      "Чип A16 Bionic",
      "До 1ТБ памяти",
      "Аккумулятор на весь день",
    ],
    id: "5",
    image: "/prank.webp",
    inStock: true,
    name: "Интерактивный Подарок",
    originalPrice: 1099.99,
    price: 999.99,
    rating: 5,
    specs: {
      battery: "4,352мАч",
      brand: "TechPro",
      camera: "Тройная система камер 12МП",
      display: '6.7" Super Retina XDR',
      model: "Galaxy Pro Max",
      os: "iOS 16",
      processor: "Чип A16 Bionic",
      storage: "128ГБ/256ГБ/512ГБ/1ТБ",
      warranty: "1 год",
    },
  },
  {
    category: "Не думая",
    description:
      "Случайный подарок, который точно удивит. Не знаете что подарить? Доверьтесь нам!",
    features: [
      "Случайный выбор из нашей коллекции и больше",
      "Уникальный опыт",
      "Эмоции гарантированы",
      "Заплатите столько сколько ужаса хотите!",
    ],
    id: "7",
    image: "/random.webp",
    inStock: true,
    name: "Случайный подарок",
    originalPrice: 0,
    price: 1000,
    rating: 5,
    specs: {
      Возврат: "Невозможен",
      Доставка: "В выбранный день",
      Категория: "Случайный выбор",
      Товар: "Случайный подарок",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const ProductDetailPageClient: React.FC = () => {
  /* ----------------------------- Routing --------------------------------- */
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  /* ----------------------------- Cart hook ------------------------------- */
  const { addItem } = useCart();

  /* ----------------------------- Local state ----------------------------- */
  const [quantity, setQuantity] = React.useState(1);
  const [isAdding, setIsAdding] = React.useState(false);
  const [customPrice, setCustomPrice] = React.useState<null | number>(null);
  const [showCustomPriceInput, setShowCustomPriceInput] = React.useState(false);

  /* ------------------------ Derive product object ------------------------ */
  const product = React.useMemo(() => products.find((p) => p.id === id), [id]);

  /* ----------------------- Derived/computed values ----------------------- */
  const isRandomGift = product?.id === "7";
  const currentPrice = React.useMemo(() => {
    if (!isRandomGift) return product?.price ?? 0;
    if (customPrice !== null) return customPrice;
    return 1000;
  }, [isRandomGift, customPrice, product?.price]);

  const discountPercentage = React.useMemo(() => {
    if (!product?.originalPrice) return 0;
    return Math.round(
      ((product.originalPrice - currentPrice) / product.originalPrice) * 100,
    );
  }, [product?.originalPrice, currentPrice]);

  /* ------------------------------ Handlers ------------------------------- */
  const handleQuantityChange = React.useCallback((newQty: number) => {
    setQuantity((prev) => (newQty >= 1 ? newQty : prev));
  }, []);

  const handlePriceChange = React.useCallback((value: number[]) => {
    const newPrice = value[0];
    setCustomPrice(newPrice);
    if (newPrice >= 10000) {
      setShowCustomPriceInput(true);
    } else {
      setShowCustomPriceInput(false);
    }
  }, []);

  const handleCustomPriceChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(e.target.value);
      if (!Number.isNaN(value) && value >= 10000) {
        setCustomPrice(value);
      }
    },
    [],
  );

  const handleAddToCart = React.useCallback(async () => {
    if (!product) return;

    setIsAdding(true);
    addItem(
      {
        category: product.category,
        id: product.id,
        image: product.image,
        name: product.name,
        price: currentPrice,
      },
      quantity,
    );
    setQuantity(1);
    toast.success(`${product.name} добавлен в корзину`);
    await new Promise((r) => setTimeout(r, 400));
    setIsAdding(false);
  }, [addItem, product, quantity, currentPrice]);

  /* -------------------------- Conditional UI ---------------------------- */
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 py-10">
          <div
            className={`
              container px-4
              md:px-6
            `}
          >
            <h1 className="text-3xl font-bold">Продукт Не Найден</h1>
            <p className="mt-4">Продукт, который вы ищете, не существует.</p>
            <Button className="mt-6" onClick={() => router.push("/products")}>
              Вернуться к Товарам
            </Button>
          </div>
        </main>
      </div>
    );
  }

  /* ------------------------------ Markup --------------------------------- */
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div
          className={`
            container px-4
            md:px-6
          `}
        >
          {/* Back link */}
          <Button
            aria-label="Back to products"
            className="mb-6"
            onClick={() => router.push("/products")}
            variant="ghost"
          >
            ← Вернуться к Товарам
          </Button>

          {/* Main grid */}
          <div
            className={`
              grid grid-cols-1 gap-8
              md:grid-cols-2
            `}
          >
            {/* Product image */}
            <div
              className={`
                relative aspect-square overflow-hidden rounded-lg bg-muted
              `}
            >
              <Image
                alt={product.name}
                className="object-cover"
                fill
                priority
                src={product.image}
              />
              {discountPercentage > 0 && (
                <div
                  className={`
                    absolute top-2 left-2 rounded-full bg-red-500 px-2 py-1
                    text-xs font-bold text-white
                  `}
                >
                  -{discountPercentage}%
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex flex-col">
              {/* Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold">{product.name}</h1>
              </div>

              {/* Category & prices */}
              <div className="mb-6">
                <p className="text-lg font-medium text-muted-foreground">
                  {product.category}
                </p>
                {isRandomGift ? (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Минимальная цена: 1,000₽
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Хотите больше 10,000₽?
                        </span>
                      </div>
                      <Slider
                        defaultValue={[1000]}
                        max={10000}
                        min={1000}
                        onValueChange={handlePriceChange}
                        step={100}
                        value={[customPrice ?? 1000]}
                      />
                    </div>
                    {showCustomPriceInput && (
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="custom-price"
                        >
                          Введите свою цену (от 10,000₽)
                        </label>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Button
                              disabled={(customPrice ?? 10000) <= 10000}
                              onClick={() => {
                                const newPrice = (customPrice ?? 10000) - 1000;
                                if (newPrice >= 10000) {
                                  setCustomPrice(newPrice);
                                }
                              }}
                              size="icon"
                              type="button"
                              variant="outline"
                            >
                              -1000₽
                            </Button>
                            <Input
                              className="w-full text-center text-lg"
                              id="custom-price"
                              inputMode="numeric"
                              min={10000}
                              onChange={handleCustomPriceChange}
                              pattern="[0-9]*"
                              type="number"
                              value={customPrice ?? ""}
                            />
                            <Button
                              onClick={() => {
                                setCustomPrice((customPrice ?? 10000) + 1000);
                              }}
                              size="icon"
                              type="button"
                              variant="outline"
                            >
                              +1000₽
                            </Button>
                          </div>
                          <p
                            className={`
                              text-center text-xs text-muted-foreground
                            `}
                          >
                            Минимальная сумма: 10,000₽
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="text-2xl font-bold">
                      {CURRENCY_FORMATTER.format(currentPrice)}
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-3xl font-bold">
                      {CURRENCY_FORMATTER.format(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span
                        className={`text-xl text-muted-foreground line-through`}
                      >
                        {CURRENCY_FORMATTER.format(product.originalPrice)}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="mb-6 text-muted-foreground">
                {product.description}
              </p>

              {/* Stock */}
              <div aria-atomic="true" aria-live="polite" className="mb-6">
                {product.inStock ? (
                  <p className="text-sm font-medium text-green-600">
                    В наличии
                  </p>
                ) : (
                  <p className="text-sm font-medium text-red-500">
                    Нет в наличии
                  </p>
                )}
              </div>

              {/* Quantity selector & Add to cart */}
              <div
                className={`
                  mb-6 flex flex-col gap-4
                  sm:flex-row sm:items-center
                `}
              >
                {/* Quantity */}
                <div className="flex items-center">
                  <Button
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() => handleQuantityChange(quantity - 1)}
                    size="icon"
                    variant="outline"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-12 text-center select-none">
                    {quantity}
                  </span>

                  <Button
                    aria-label="Increase quantity"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    size="icon"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Add to cart */}
                <Button
                  className="flex-1"
                  disabled={!product.inStock || isAdding}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {isAdding ? "Добавление…" : "Добавить в корзину"}
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Features & Specs */}
          <div
            className={`
              grid grid-cols-1 gap-8
              md:grid-cols-2
            `}
          >
            {/* Features */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">Описание</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    className="flex items-start"
                    key={`feature-${product.id}-${index}-${slugify(feature)}`}
                  >
                    <span className="mt-1 mr-2 h-2 w-2 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">Детали</h2>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    className="flex justify-between border-b pb-2 text-sm"
                    key={key}
                  >
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPageClient;
