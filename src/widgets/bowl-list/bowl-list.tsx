"use client";

import type {
  Bowl,
  BowlRatingSortOrder,
  BowlStrengthSortOrder,
} from "@/entities/bowl";

import { useMemo } from "react";

import { filterBowls } from "./filter-bowls";

import { BowlCard } from "@/entities/bowl";
import { useTranslation } from "@/shared/lib/i18n/provider";
import { EmptyMessage } from "@/shared/ui/empty-message";

export type BowlListProps = {
  bowls: Bowl[];
  flavors: string[];
  search: string;
  ratingSortOrder: BowlRatingSortOrder;
  strengthSortOrder: BowlStrengthSortOrder;
  onAddFlavor: (name: string) => void;
  onRemove: (id: string) => void;
};

export const BowlList = ({
  bowls,
  flavors,
  search,
  ratingSortOrder,
  strengthSortOrder,
  onAddFlavor,
  onRemove,
}: BowlListProps) => {
  const filteredBowls = useMemo(
    () =>
      filterBowls(bowls, search, flavors, ratingSortOrder, strengthSortOrder),
    [bowls, search, flavors, ratingSortOrder, strengthSortOrder],
  );
  const { t: translate } = useTranslation();

  const hasFilters = search.trim().length > 0 || flavors.length > 0;

  if (filteredBowls.length === 0) {
    if (hasFilters) {
      return (
        <EmptyMessage color="warning" variant="solid">
          {translate("bowl.list.noResults")}
        </EmptyMessage>
      );
    }

    return <EmptyMessage>{translate("bowl.list.empty")}</EmptyMessage>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {filteredBowls.map((bowl) => (
        <BowlCard
          key={bowl.id}
          bowl={bowl}
          onRemove={() => onRemove(bowl.id)}
          onTobaccoClick={onAddFlavor}
        />
      ))}
    </div>
  );
};
