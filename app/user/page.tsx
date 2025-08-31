"use client";

import { Button } from "@heroui/react";

import { UpsertBowl } from "@/features/upsert-bowl";
import { useBowls, BowlCard } from "@/entities/bowl";

export type UserPageProps = {};

const UserPage = ({}: UserPageProps) => {
  const { bowls, addBowl, updateBowl } = useBowls();

  return (
    <section className="p-4">
      <UpsertBowl
        trigger={<Button color="primary">Create Bowl</Button>}
        onSubmit={addBowl}
      />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {bowls.map((bowl) => (
          <UpsertBowl key={bowl.id} bowl={bowl} onSubmit={updateBowl}>
            <BowlCard bowl={bowl} />
          </UpsertBowl>
        ))}
      </div>
    </section>
  );
};

export default UserPage;
