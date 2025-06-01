"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { useCart } from "~/lib/hooks/use-cart";
import { useMediaQuery } from "~/lib/hooks/use-media-query";
import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/ui/primitives/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/primitives/sheet";

export interface CartItem {
  category: string;
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export function CartClient() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { clearCart, items: cartItems, removeItem, updateQuantity } = useCart();
  const [isMounted, setIsMounted] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const CartTrigger = (
    <Button
      aria-label="Open cart"
      className="relative h-9 w-9 rounded-full"
      size="icon"
      variant="outline"
    >
      <ShoppingCart className="h-4 w-4" />
      {totalItems > 0 && (
        <Badge
          className={`
            absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-[10px]
          `}
          variant="default"
        >
          {totalItems}
        </Badge>
      )}
    </Button>
  );

  const CartContent = (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <div className="text-xl font-semibold">Ваша корзина</div>
            <div className="text-sm text-muted-foreground">
              {totalItems === 0
                ? "Ваша корзина пуста"
                : `У вас ${totalItems} товар${
                    totalItems !== 1 ? "а" : ""
                  } в корзине`}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          <AnimatePresence>
            {cartItems.length === 0 ? (
              <motion.div
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <div
                  className={`
                    mb-4 flex h-20 w-20 items-center justify-center rounded-full
                    bg-muted
                  `}
                >
                  <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Ваша корзина пуста</h3>
                <p className="mb-6 text-center text-sm text-muted-foreground">
                  Похоже, вы еще не добавили ничего в корзину.
                </p>
                {isDesktop ? (
                  <SheetClose asChild>
                    <Link href="/products">
                      <Button>Смотреть товары</Button>
                    </Link>
                  </SheetClose>
                ) : (
                  <DrawerClose asChild>
                    <Link href="/products">
                      <Button>Смотреть товары</Button>
                    </Link>
                  </DrawerClose>
                )}
              </motion.div>
            ) : (
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                      group relative flex rounded-lg border bg-card p-2
                      shadow-sm transition-colors
                      hover:bg-accent/50
                    `}
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    key={item.id}
                    layout
                    transition={{ duration: 0.15 }}
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded">
                      <Image
                        alt={item.name}
                        className="object-cover"
                        fill
                        src={item.image}
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <Link
                            className={`
                              line-clamp-2 text-sm font-medium
                              group-hover:text-primary
                            `}
                            href={`/products/${item.id}`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                          <button
                            className={`
                              -mt-1 -mr-1 ml-2 rounded-full p-1
                              text-muted-foreground transition-colors
                              hover:bg-muted hover:text-destructive
                            `}
                            onClick={() => handleRemoveItem(item.id)}
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {item.category}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            className={`
                              rounded-full p-1 text-muted-foreground
                              transition-colors
                              hover:bg-muted
                            `}
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            type="button"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            className={`
                              rounded-full p-1 text-muted-foreground
                              transition-colors
                              hover:bg-muted
                            `}
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            type="button"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-sm font-medium">
                          {item.price * item.quantity} ₽
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {cartItems.length > 0 && (
          <div className="border-t px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Итого</div>
              <div className="text-lg font-semibold">{subtotal} ₽</div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/checkout">
                <Button
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                  size="lg"
                >
                  Оформить заказ
                </Button>
              </Link>
              <Button
                className="w-full"
                onClick={handleClearCart}
                size="lg"
                variant="outline"
              >
                Очистить корзину
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (!isMounted) {
    return null;
  }

  if (isDesktop) {
    return (
      <Sheet onOpenChange={setIsOpen} open={isOpen}>
        <SheetTrigger asChild>{CartTrigger}</SheetTrigger>
        <SheetContent
          className={`
            flex w-full flex-col
            sm:max-w-lg
          `}
        >
          <SheetHeader>
            <SheetTitle>Ваша корзина</SheetTitle>
          </SheetHeader>
          {CartContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer onOpenChange={setIsOpen} open={isOpen}>
      <DrawerTrigger asChild>{CartTrigger}</DrawerTrigger>
      <DrawerContent className="flex h-[80vh] flex-col p-0">
        <DrawerHeader>
          <DrawerTitle>Ваша корзина</DrawerTitle>
          <DrawerDescription>
            здесь отображаются товары, которые вы добавили в корзину
          </DrawerDescription>
        </DrawerHeader>
        {CartContent}
      </DrawerContent>
    </Drawer>
  );
}
