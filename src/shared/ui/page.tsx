import type { ReactNode } from "react";

import clsx from "clsx";

export type PageProps = {
  children: ReactNode;
  className?: string;
};

export const Page = ({ children, className }: PageProps) => {
  return <section className={clsx("p-6", className)}>{children}</section>;
};
