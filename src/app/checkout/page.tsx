"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import type { CartItem } from "~/ui/components/cart";

import { useCart } from "~/lib/hooks/use-cart";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/primitives/card";
import { DatePicker } from "~/ui/primitives/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/primitives/form";
import { Input } from "~/ui/primitives/input";
import { Separator } from "~/ui/primitives/separator";

const formSchema = z.object({
  deliveryDate: z
    .date()
    .min(new Date(), "Дата доставки не может быть в прошлом"),
  deliveryTime: z.string().min(1, "Выберите время доставки"),
  entrance: z.string().optional(),
  house: z.string().min(1, "Введите номер дома"),
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  street: z.string().min(5, "Введите корректный адрес"),
});

export default function CheckoutPage() {
  const { clearCart, items: cartItems } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      deliveryDate: new Date(),
      deliveryTime: "",
      entrance: "",
      house: "",
      name: "",
      phone: "",
      street: "",
    },
    resolver: zodResolver(formSchema),
  });

  if (!mounted) {
    return null;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // TODO: Implement order submission
      console.log(values);
      clearCart();
      router.push("/success");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Корзина пуста</h1>
        <Button onClick={() => router.push("/")}>Вернуться в магазин</Button>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Оформление заказа</h1>
      <div
        className={`
          grid grid-cols-1 gap-8
          md:grid-cols-2
        `}
      >
        <div>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Имя<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ваше имя" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Телефон<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <PatternFormat
                            customInput={Input}
                            format="+7 (###) ###-##-##"
                            placeholder="+7 (___) ___-__-__"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Адрес доставки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Улица<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Название улицы" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="house"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Дом<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Номер дома" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="entrance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подъезд и квартира</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Например, подъезд 3, кв. 45"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Дата и время доставки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="deliveryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Дата<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            date={field.value}
                            onDateChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deliveryTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Время<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button className="w-full" type="submit">
                Оформить заказ
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ваш заказ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item: CartItem) => (
                  <div
                    className="flex items-center justify-between"
                    key={item.id}
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Количество: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {item.price * item.quantity} ₽
                    </p>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-bold">Итого:</span>
                  <span className="text-xl font-bold">{total} ₽</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
