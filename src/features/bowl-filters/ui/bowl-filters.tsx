"use client";

import { Input, Chip } from "@heroui/react";

import { useTranslation } from "@/shared/lib/i18n/provider";

export type BowlFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  flavors: string[];
  onRemoveFlavor: (flavor: string) => void;
};

export const BowlFilters = ({
  search,
  onSearchChange,
  flavors,
  onRemoveFlavor,
}: BowlFiltersProps) => {
  const { t: translate } = useTranslation();

  return (
    <>
      <Input
        className="mt-4 max-w-xs"
        placeholder={translate("filters.searchPlaceholder")}
        size="sm"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {flavors.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {flavors.map((flavor) => (
            <Chip key={flavor} onClose={() => onRemoveFlavor(flavor)}>
              {flavor}
            </Chip>
          ))}
        </div>
      )}
    </>
  );
};
