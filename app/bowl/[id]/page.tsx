"use client";

import { Button } from "@heroui/react";
import { useParams } from "next/navigation";

import { useBowls } from "@/entities/bowl";
import { UpsertBowl } from "@/features/upsert-bowl";
import { BowlDetails } from "@/widgets/bowl-details";

export type BowlPageProps = {};

const BowlPage = ({}: BowlPageProps) => {
  const params = useParams<{ id: string }>();
  const { bowls, updateBowl } = useBowls();
  const bowl = bowls.find((b) => b.id === params.id);

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

export default BowlPage;
