"use client";

import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "~/ui/primitives/alert";
import { Button } from "~/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/ui/primitives/card";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";

interface PaymentFormProps {
  buttonText?: string;
  className?: string;
  description?: string;
  onSuccess?: () => void;
  title?: string;
}

export function PaymentForm({
  buttonText = "Оплатить",
  className,
  description = "Введите данные для оплаты",
  onSuccess,
  title = "Оформление заказа",
}: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Здесь будет логика оплаты
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Ошибка при обработке платежа. Пожалуйста, попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={`
      w-full
      ${className}
    `}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4" variant="destructive">
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Номер карты</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Срок действия</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={isLoading} onClick={handlePayment}>
          {isLoading ? "Загрузка..." : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
