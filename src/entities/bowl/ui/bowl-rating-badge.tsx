"use client";

import clsx from "clsx";
import { Icon } from "@iconify/react";

import { useTranslation } from "@/shared/lib/i18n/provider";

export type BowlRatingBadgeProps = {
  rating: number;
  className?: string;
};

export const BowlRatingBadge = ({
  rating,
  className,
}: BowlRatingBadgeProps) => {
  const { t: translate } = useTranslation();
  const label = translate("bowl.form.rating.label");

  return (
    <span
      aria-label={`${label}: ${rating}`}
      className={clsx(
        "inline-flex items-center gap-1 text-sm font-semibold leading-none text-warning-500 dark:text-warning-400",
        className,
      )}
      role="group"
    >
      <Icon
        aria-hidden
        className="h-[1em] w-[1em] shrink-0"
        icon="solar:star-bold"
      />
      <span className="leading-none">{rating}</span>
    </span>
  );
};
