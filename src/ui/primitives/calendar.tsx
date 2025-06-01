"use client";

import type * as React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "~/lib/utils";
import { buttonVariants } from "~/ui/primitives/button";

const IconLeft = (props: React.ComponentProps<typeof ChevronLeft>) => (
  <ChevronLeft className={cn("h-5 w-5", props.className)} {...props} />
);
const IconRight = (props: React.ComponentProps<typeof ChevronRight>) => (
  <ChevronRight className={cn("h-5 w-5", props.className)} {...props} />
);

function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  // Запрет выбора прошлых дат
  const today = new Date();

  return (
    <DayPicker
      className={cn(
        `
          mx-auto max-w-xs rounded-lg bg-white p-4 shadow-lg
          dark:bg-gray-800
        `,
        className,
      )}
      classNames={{
        caption: "flex justify-between items-center mb-2 px-2",
        caption_label: "text-base font-medium text-gray-900 dark:text-gray-100",
        cell: "flex items-center justify-center h-8",
        day: cn(
          "flex h-8 w-8 items-center justify-center rounded transition",
          `
            hover:bg-accent hover:text-accent-foreground
            focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:outline-none
          `,
          `
            text-gray-700
            dark:text-gray-200
          `,
        ),
        day_disabled: "text-gray-300 dark:text-gray-600 cursor-not-allowed",
        day_hidden: "invisible",
        day_outside: "text-gray-300 dark:text-gray-600",
        day_range_middle: "bg-accent text-accent-foreground",
        day_selected: "bg-primary text-primary-foreground font-semibold",
        day_today: "ring-1 ring-primary rounded",
        head_cell:
          "text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase",
        head_row: "grid grid-cols-7",
        month: "",
        months: "flex flex-col",
        nav: "flex items-center space-x-2",
        nav_button: buttonVariants({ size: "icon", variant: "outline" }),
        row: "grid grid-cols-7 mt-2",
        table: "w-full border-collapse",
      }}
      components={{ IconLeft, IconRight }}
      disabled={{ before: today }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}

export { Calendar };
