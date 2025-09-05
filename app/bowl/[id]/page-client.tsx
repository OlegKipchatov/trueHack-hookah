"use client";

import { Button } from "@heroui/react";

import { useBowls } from "@/entities/bowl";
import { UpsertBowl } from "@/features/upsert-bowl";
import { BowlDetails } from "@/widgets/bowl-details";

export type BowlPageClientProps = { id: string };

export const BowlPageClient = ({ id }: BowlPageClientProps) => {
  const { bowls, updateBowl } = useBowls();
  const bowl = bowls.find((b) => b.id === id);

  if (!bowl) return null;

  return (
    <section className="p-4 flex flex-col gap-6">
      <UpsertBowl
        bowl={bowl}
        trigger={<Button color="primary">Редактировать</Button>}
        onSubmit={updateBowl}
      />
      <BowlDetails bowl={bowl} />
    </section>
  );
};
