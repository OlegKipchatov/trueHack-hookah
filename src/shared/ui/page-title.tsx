"use client";

import type { ReactNode } from "react";

import clsx from "clsx";

import { BackButton } from "./back-button";

export type PageTitleProps = {
  children: ReactNode;
  className?: string;
  withBackButton?: boolean;
};

export const PageTitle = ({
  children,
  className,
  withBackButton = false,
}: PageTitleProps) => {
  return (
    <div className={clsx("mb-6 flex items-center gap-2", className)}>
      {withBackButton && <BackButton />}
      <h1 className="text-3xl font-bold">{children}</h1>
    </div>
  );
};
