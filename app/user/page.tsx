"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { useTranslation } from "@/shared/lib/i18n/provider";
import { Button } from "@/shared/ui/button";
import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";
import { useBowls } from "@/entities/bowl";
import { BowlFilters } from "@/features/bowl-filters";
import { BowlList } from "@/widgets/bowl-list";

export type UserPageProps = {};

const UserPage = ({}: UserPageProps) => {
  const { bowls, removeBowl, isLoading } = useBowls();
  const [search, setSearch] = useState("");
  const [flavors, setFlavors] = useState<string[]>([]);
  const { t: translate } = useTranslation();

  const addFlavor = useCallback(
    (name: string) =>
      setFlavors((prev) => (prev.includes(name) ? prev : [...prev, name])),
    [],
  );
  const removeFlavor = (name: string) =>
    setFlavors((prev) => prev.filter((f) => f !== name));

  return (
    <Page isLoading={isLoading}>
      <div className="mb-4 flex items-center justify-between">
        <PageTitle className="mb-0">{translate("user.title")}</PageTitle>
        <Link href="/bowls/new">
          <Button color="primary">{translate("bowl.actions.create")}</Button>
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
