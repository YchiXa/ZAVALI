"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { cn } from "~/lib/cn";
import { useCart } from "~/lib/hooks/use-cart";
import { CategoryBadge } from "~/ui/components/category-badge";
import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardFooter } from "~/ui/primitives/card";

type ProductCardProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onError"
> & {
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  product: {
    category: string;
    id: string;
    image: string;
    inStock?: boolean;
    name: string;
    originalPrice?: number;
    price: number;
    rating?: number;
  };
  variant?: "compact" | "default";
};

export function ProductCard({
  className,
  onAddToCart,
  onAddToWishlist,
  product,
  variant = "default",
  ...props
}: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const [isInWishlist, setIsInWishlist] = React.useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingToCart(true);
    // Simulate API call
    setTimeout(() => {
      if (onAddToCart) {
        onAddToCart(product.id);
      } else {
        addItem(
          {
            category: product.category,
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
          },
          1
        );
      }
      setIsAddingToCart(false);
    }, 600);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToWishlist) {
      setIsInWishlist(!isInWishlist);
      onAddToWishlist(product.id);
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className={cn("group", className)} {...props}>
      <Link href={`/products/${product.id}`} key={`product-link-${product.id}`}>
        <Card
          className={cn(
            `
              relative h-full overflow-hidden rounded-lg py-0 transition-all
              duration-200 ease-in-out
              hover:shadow-md
            `,
            isHovered && "ring-1 ring-primary/20"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            {product.image && (
              <Image
                alt={product.name}
                className={cn(
                  "object-cover transition-transform duration-300 ease-in-out",
                  isHovered && "scale-105",
                  "h-full w-full"
                )}
                fill
                priority={variant === "default"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={product.image}
              />
            )}

            {/* Category badge */}
            <CategoryBadge
              category={product.category}
              className={`absolute top-2 left-2`}
            />

            {/* Discount badge */}
            {discount > 0 && (
              <Badge
                className={`
                  absolute top-2 right-2 bg-destructive
                  text-destructive-foreground
                `}
              >
                {discount}% СКИДКА
              </Badge>
            )}

            {/* Wishlist button */}
            <Button
              className={cn(
                `
                  absolute right-2 bottom-2 z-10 rounded-full bg-background/80
                  backdrop-blur-sm transition-opacity duration-300
                `,
                !isHovered && !isInWishlist && "opacity-0"
              )}
              onClick={handleAddToWishlist}
              size="icon"
              type="button"
              variant="outline"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isInWishlist
                    ? "fill-destructive text-destructive"
                    : "text-muted-foreground"
                )}
              />
              <span className="sr-only">Добавить в избранное</span>
            </Button>
          </div>

          <CardContent className="p-4 pt-4">
            {/* Product name with line clamp */}
            <h3
              className={`
                line-clamp-2 text-base font-medium transition-colors
                group-hover:text-primary
              `}
            >
              {product.name}
            </h3>

            {variant === "default" && (
              <div className="mt-2 flex items-center gap-1.5">
                <span className="font-medium text-foreground">
                  {product.price} ₽
                </span>
                {product.originalPrice ? (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice} ₽
                  </span>
                ) : null}
              </div>
            )}
          </CardContent>

          {variant === "default" && (
            <CardFooter className="p-4 pt-0">
              <Button
                className={cn(
                  "w-full gap-2 transition-all",
                  isAddingToCart && "opacity-70"
                )}
                disabled={isAddingToCart}
                onClick={handleAddToCart}
              >
                {isAddingToCart ? (
                  <div
                    className={`
                      h-4 w-4 animate-spin rounded-full border-2
                      border-background border-t-transparent
                    `}
                  />
                ) : (
                  <ShoppingCart className="h-4 w-4" />
                )}
                Добавить в корзину
              </Button>
            </CardFooter>
          )}

          {variant === "compact" && (
            <CardFooter className="p-4 pt-0">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-foreground">
                    {product.price} ₽
                  </span>
                  {product.originalPrice ? (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice} ₽
                    </span>
                  ) : null}
                </div>
                <Button
                  className={cn(
                    "gap-2 transition-all",
                    isAddingToCart && "opacity-70"
                  )}
                  disabled={isAddingToCart}
                  onClick={handleAddToCart}
                  size="icon"
                  variant="outline"
                >
                  {isAddingToCart ? (
                    <div
                      className={`
                        h-4 w-4 animate-spin rounded-full border-2
                        border-background border-t-transparent
                      `}
                    />
                  ) : (
                    <ShoppingCart className="h-4 w-4" />
                  )}
                  <span className="sr-only">Добавить в корзину</span>
                </Button>
              </div>
            </CardFooter>
          )}

          {!product.inStock && (
            <div
              className={`
                absolute inset-0 flex items-center justify-center
                bg-background/80 backdrop-blur-sm
              `}
            >
              <Badge className="px-3 py-1 text-sm" variant="destructive">
                Нет в наличии
              </Badge>
            </div>
          )}
        </Card>
      </Link>
    </div>
  );
}
