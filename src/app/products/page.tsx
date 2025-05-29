"use client";

import { useSearchParams } from "next/navigation";
import * as React from "react";

import { useCart } from "~/lib/hooks/use-cart";
import { ProductCard } from "~/ui/components/product-card";
import { Button } from "~/ui/primitives/button";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type Category = string;

interface Product {
  category: string;
  id: string;
  image: string;
  inStock: boolean;
  name: string;
  originalPrice?: number;
  price: number;
  rating: number;
}

/* -------------------------------------------------------------------------- */
/*                               Mock data                                    */
/* -------------------------------------------------------------------------- */

const products: Product[] = [
  {
    category: "Не думая",
    id: "1",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    name: "Премиальные беспроводные наушники",
    originalPrice: 249.99,
    price: 199.99,
    rating: 4.5,
  },
  {
    category: "Слабо",
    id: "2",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    name: "Умные часы серии 5",
    originalPrice: 349.99,
    price: 299.99,
    rating: 4.2,
  },
  {
    category: "Среднее",
    id: "3",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: false,
    name: "Профессиональный фотоаппарат",
    originalPrice: 1499.99,
    price: 1299.99,
    rating: 4.8,
  },
  {
    category: "Жестко",
    id: "4",
    image:
      "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    name: "Эргономичное офисное кресло",
    originalPrice: 299.99,
    price: 249.99,
    rating: 4.6,
  },
  {
    category: "Невероятно",
    id: "5",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    name: "Смартфон Pro Max",
    originalPrice: 1099.99,
    price: 999.99,
    rating: 4.9,
  },
  {
    category: "Не думая",
    id: "6",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    name: 'Ультра HD Смарт ТВ 55"',
    originalPrice: 899.99,
    price: 799.99,
    rating: 4.7,
  },
  {
    category: "Не думая",
    id: "7",
    image: "/random.webp",
    inStock: true,
    name: "Случайный подарок",
    originalPrice: 199.99,
    price: 149.99,
    rating: 4.3,
  },
];

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

export default function ProductsPage() {
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  /* ----------------------- Categories (derived) ------------------------- */
  const categories: Category[] = React.useMemo(() => {
    // Filter out empty categories and ensure uniqueness
    const dynamic = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    ).sort();
    return ["All", ...dynamic];
  }, []);

  /* ----------------------------- State ---------------------------------- */
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(
    categoryFromUrl || "All"
  );

  // Update selected category when URL changes
  React.useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  /* --------------------- Filtered products (memo) ----------------------- */
  const filteredProducts = React.useMemo(
    () =>
      selectedCategory === "All"
        ? products
        : products.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  /* --------------------------- Handlers --------------------------------- */
  const handleAddToCart = React.useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        addItem(
          {
            category: product.category,
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
          },
          1 // (quantity) always adds 1 item to the cart
        );
      }
    },
    [addItem]
  );

  const handleAddToWishlist = React.useCallback((productId: string) => {
    // TODO: integrate with Wishlist feature
    console.log(`Added ${productId} to wishlist`);
  }, []);

  /* ----------------------------- Render --------------------------------- */
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div
          className={`
            container mx-auto max-w-7xl px-4
            sm:px-6
            lg:px-8
          `}
        >
          {/* Heading & filters */}
          <div
            className={`
              mb-8 flex flex-col gap-4
              md:flex-row md:items-center md:justify-between
            `}
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Товары</h1>
              <p className="mt-1 text-lg text-muted-foreground">
                Просмотрите наши последние товары и найдите то, что вам
                понравится.
              </p>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => {
                // Generate a unique key for each category
                const safeKey = `category-${index}-${category}`;

                return (
                  <Button
                    aria-pressed={category === selectedCategory}
                    className="rounded-full"
                    key={safeKey}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                    title={`Filter by ${category}`}
                    variant={
                      category === selectedCategory ? "default" : "outline"
                    }
                  >
                    {category}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Product grid */}
          <div
            className={`
              grid grid-cols-1 gap-6
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            `}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                product={product}
                variant="default"
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                В этой категории товары не найдены.
              </p>
            </div>
          )}

          {/* Pagination */}
          <nav
            aria-label="Pagination"
            className="mt-12 flex items-center justify-center gap-2"
          >
            <Button disabled variant="outline">
              Назад
            </Button>
            <Button aria-current="page" variant="default">
              1
            </Button>
            <Button disabled variant="outline">
              Вперед
            </Button>
          </nav>
        </div>
      </main>
    </div>
  );
}
