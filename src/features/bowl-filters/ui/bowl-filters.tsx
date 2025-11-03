"use client";

import type { Key } from "react";
import type { BowlSortOrder } from "@/entities/bowl";

import {
  Input,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

import { useTranslation } from "@/shared/lib/i18n/provider";
import { StarIcon } from "@/shared/ui/icons";

export type BowlFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  flavors: string[];
  onRemoveFlavor: (flavor: string) => void;
  sortOrder: BowlSortOrder;
  onSortChange: (order: BowlSortOrder) => void;
};

export const BowlFilters = ({
  search,
  onSearchChange,
  flavors,
  onRemoveFlavor,
  sortOrder,
  onSortChange,
}: BowlFiltersProps) => {
  const { t: translate } = useTranslation();
  const sortOptions: Array<{ key: BowlSortOrder; label: string }> = [
    { key: "default", label: translate("filters.sort.default") },
    { key: "rating-desc", label: translate("filters.sort.ratingDesc") },
    { key: "rating-asc", label: translate("filters.sort.ratingAsc") },
  ];
  const selectedOption = sortOptions.find((option) => option.key === sortOrder);

  const handleSortAction = (key: Key) => {
    onSortChange(key as BowlSortOrder);
  };

  return (
    <>
      <Input
        className="mt-4 max-w-xs"
        placeholder={translate("filters.searchPlaceholder")}
        size="sm"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="mt-2 max-w-xs"
            startContent={<StarIcon className="h-4 w-4" />}
            variant="bordered"
          >
            {selectedOption?.label ?? sortOptions[0]?.label}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label={translate("filters.sort.aria")}
          selectedKeys={[sortOrder]}
          selectionMode="single"
          onAction={handleSortAction}
        >
          {sortOptions.map((option) => (
            <DropdownItem key={option.key}>{option.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
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
