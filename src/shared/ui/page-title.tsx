"use client";

import type { ReactNode } from "react";

import clsx from "clsx";

import { BackButton } from "./back-button";

export type PageTitleProps = {
  children: ReactNode;
  className?: string;
  withBackButton?: boolean;
  backHref?: string;
};

export const PageTitle = ({
  children,
  className,
  withBackButton = false,
  backHref,
}: PageTitleProps) => {
  return (
    <div className={clsx("mb-6 flex items-center gap-2", className)}>
      {withBackButton && <BackButton href={backHref} />}
      <h1 className="text-3xl font-bold">{children}</h1>
    </div>
  );
};
