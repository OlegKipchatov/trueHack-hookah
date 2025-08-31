import type { ComponentProps, ReactNode } from "react";

import { Alert } from "@heroui/react";
import clsx from "clsx";

export type EmptyMessageProps = {
  children: ReactNode;
  className?: string;
} & Pick<ComponentProps<typeof Alert>, "color" | "variant">;

export const EmptyMessage = ({
  children,
  className,
  color = "primary",
  variant = "bordered",
}: EmptyMessageProps) => {
  return (
    <Alert
      className={clsx("mt-4 text-center", className)}
      color={color}
      variant={variant}
    >
      {children}
    </Alert>
  );
};
