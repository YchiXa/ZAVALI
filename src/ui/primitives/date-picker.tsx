"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/cn";
import { Button } from "~/ui/primitives/button";
import { Calendar } from "~/ui/primitives/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/ui/primitives/popover";

interface DatePickerProps {
  className?: string;
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
}

export function DatePicker({ className, date, onDateChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          variant={"outline"}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: ru })
          ) : (
            <span>Выберите дату</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          initialFocus
          locale={ru}
          mode="single"
          onSelect={onDateChange}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  );
}
