"use client";

import type { Bowl } from "@/entities/bowl";

import { BowlCard } from "@/entities/bowl";
import { UpsertBowl } from "@/features/upsert-bowl";

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
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {bowls
        .filter(
          (b) =>
            b.name.includes(search) &&
            flavors.every((f) => b.tobaccos.some((t) => t.name === f)),
        )
        .map((bowl) => (
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
