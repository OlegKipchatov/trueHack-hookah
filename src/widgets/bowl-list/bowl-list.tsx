"use client";

import type { Bowl } from "@/entities/bowl";

import { useMemo } from "react";

import { filterBowls } from "./filter-bowls";

import { BowlCard } from "@/entities/bowl";
import { UpsertBowl } from "@/features/upsert-bowl";
import { EmptyMessage } from "@/shared/ui/empty-message";

export type BowlListProps = {
  bowls: Bowl[];
  flavors: string[];
  search: string;
  onAddFlavor: (name: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (bowl: Bowl) => void;
};

export const BowlList = ({
  bowls,
  flavors,
  search,
  onAddFlavor,
  onRemove,
  onUpdate,
}: BowlListProps) => {
  const filteredBowls = useMemo(
    () => filterBowls(bowls, search, flavors),
    [bowls, search, flavors],
  );

  const hasFilters = search.trim().length > 0 || flavors.length > 0;

  if (filteredBowls.length === 0) {
    if (hasFilters) {
      return (
        <EmptyMessage color="warning" variant="solid">
          Чаши не найдены
        </EmptyMessage>
      );
    }

    return (
      <EmptyMessage>
        Чаши ещё не созданы. Создайте свою первую чашу.
      </EmptyMessage>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {filteredBowls.map((bowl) => (
        <UpsertBowl
          key={bowl.id}
          bowl={bowl}
          trigger={
            <BowlCard
              bowl={bowl}
              onRemove={() => onRemove(bowl.id)}
              onTobaccoClick={onAddFlavor}
            />
          }
          onSubmit={onUpdate}
        />
      ))}
    </div>
  );
};
