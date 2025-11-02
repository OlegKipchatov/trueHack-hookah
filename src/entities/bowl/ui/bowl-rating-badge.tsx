"use client";

import clsx from "clsx";
import { Icon } from "@iconify/react";

import { BOWL_RATING_MAX } from "../model/bowl";

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
      aria-label={`${label}: ${rating}/${BOWL_RATING_MAX}`}
      className={clsx(
        "inline-flex items-center gap-1 text-sm font-medium text-warning-500 dark:text-warning-400",
        className,
      )}
      role="group"
    >
      <Icon aria-hidden className="h-4 w-4" icon="solar:star-bold" />
      <span>
        {rating}/{BOWL_RATING_MAX}
      </span>
    </span>
  );
};
