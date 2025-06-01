"use client";

import * as React from "react";

import { cn } from "~/lib/utils";

// Обновлённая функция генерации
const generateTimes = (
  startHour: number,
  endHour: number,
  step: number,
): string[] => {
  const times: string[] = [];

  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += step) {
      const totalMinutes = h * 60 + m;
      if (totalMinutes > endHour * 60) break;

      const hour = String(h).padStart(2, "0");
      const minute = String(m).padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }

  return times;
};

interface TimePickerProps {
  className?: string;
  onChange: (event: { target: { value: string } }) => void;
  value: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  className,
  onChange,
  value,
}) => {
  const [open, setOpen] = React.useState(false);
  const times = React.useMemo(() => generateTimes(9, 22, 30), []);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  const toggleOpen = () => setOpen((prev) => !prev);
  const handleSelect = (time: string) => {
    onChange({ target: { value: time } });
    setOpen(false);
  };

  return (
    <div
      className={cn("relative inline-block text-left", className)}
      ref={containerRef}
    >
      <button
        className={cn(
          `
            w-full bg-black text-sm text-white
            dark:bg-gray-900
          `,
          `
            rounded-md px-3 py-2
            focus:ring-2 focus:ring-primary focus:outline-none
          `,
        )}
        onClick={toggleOpen}
        type="button"
      >
        {value || "Выберите время"}
      </button>

      {open && (
        <div
          className={`
            absolute z-50 mt-1 max-h-48 w-32 overflow-y-auto rounded-md bg-black
            shadow-lg
            sm:w-40
            dark:bg-gray-900
          `}
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          <ul className="divide-y divide-gray-800">
            {times.map((time) => (
              <li key={time}>
                <button
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm text-white",
                    `
                      hover:bg-gray-800
                      focus:outline-none
                    `,
                  )}
                  onClick={() => handleSelect(time)}
                  type="button"
                >
                  {time}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
