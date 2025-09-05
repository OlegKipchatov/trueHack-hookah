"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";
import { useBowls } from "@/entities/bowl";
import { BowlFilters } from "@/features/bowl-filters";
import { BowlList } from "@/widgets/bowl-list";

export type UserPageProps = {};

const UserPage = ({}: UserPageProps) => {
  const { bowls, removeBowl } = useBowls();
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
    <Page>
      <div className="mb-4 flex items-center justify-between">
        <PageTitle className="mb-0">Your Bowls</PageTitle>
        <Link href="/bowls/new">
          <Button color="primary">Create Bowl</Button>
        </Link>
      </div>
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
      />
    </Page>
  );
};

export default UserPage;
