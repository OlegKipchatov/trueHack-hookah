"use client";

import { Button, Input } from "@heroui/react";
import { useState } from "react";

import { useBowls, BowlCard } from "@/entities/bowl";
import { UpsertBowl } from "@/features/upsert-bowl";

export type UserPageProps = {};

const UserPage = ({}: UserPageProps) => {
  const { bowls, addBowl, updateBowl, removeBowl } = useBowls();
  const [search, setSearch] = useState("");

  return (
    <section className="p-4">
      <UpsertBowl
        trigger={<Button color="primary">Create Bowl</Button>}
        onSubmit={addBowl}
      />
      <Input
        className="mt-4 max-w-xs"
        placeholder="Search bowls"
        size="sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {bowls
          .filter((b) => b.name.includes(search))
          .map((bowl) => (
            <UpsertBowl
              key={bowl.id}
              bowl={bowl}
              trigger={
                <BowlCard bowl={bowl} onRemove={() => removeBowl(bowl.id)} />
              }
              onSubmit={updateBowl}
            />
          ))}
      </div>
    </section>
  );
};

export default UserPage;
