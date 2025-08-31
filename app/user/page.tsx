"use client";

import { Button } from "@heroui/react";
import { useCallback, useState } from "react";

import { useBowls } from "@/entities/bowl";
import { UpsertBowl } from "@/features/upsert-bowl";
import { BowlFilters } from "@/features/bowl-filters";
import { BowlList } from "@/widgets/bowl-list";

export type UserPageProps = {};

const UserPage = ({}: UserPageProps) => {
  const { bowls, addBowl, updateBowl, removeBowl } = useBowls();
  const [search, setSearch] = useState("");
  const [flavors, setFlavors] = useState<string[]>([]);

  const addFlavor = useCallback(
    (name: string) =>
      setFlavors((prev) => (prev.includes(name) ? prev : [...prev, name])),
    [],
  );
  const removeFlavor = (name: string) =>
    setFlavors((prev) => prev.filter((f) => f !== name));

  return (
    <section className="p-4">
      <UpsertBowl
        trigger={<Button color="primary">Create Bowl</Button>}
        onSubmit={addBowl}
      />
      <BowlFilters
        flavors={flavors}
        search={search}
        onRemoveFlavor={removeFlavor}
        onSearchChange={setSearch}
      />
      <BowlList
        bowls={bowls}
        flavors={flavors}
        search={search}
        onAddFlavor={addFlavor}
        onRemove={removeBowl}
        onUpdate={updateBowl}
      />
    </section>
  );
};

export default UserPage;
