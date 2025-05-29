import type { ComponentProps } from "react";

import NextLink from "next/link";

import { cn } from "~/lib/utils";

interface LinkProps extends ComponentProps<typeof NextLink> {
  className?: string;
}

export function Link({ className, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        `
          text-sm font-medium text-muted-foreground transition-colors
          hover:text-foreground
        `,
        className
      )}
      {...props}
    />
  );
}
