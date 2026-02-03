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
import { SortAscIcon, SortDescIcon, StarIcon } from "@/shared/ui/icons";

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
  const sortOptions: Array<{
    key: BowlSortOrder;
    label: string;
    icon: JSX.Element;
  }> = [
    {
      key: "default",
      label: translate("filters.sort.default"),
      icon: <StarIcon size={18} />,
    },
    {
      key: "rating-desc",
      label: translate("filters.sort.ratingDesc"),
      icon: <SortDescIcon size={18} />,
    },
    {
      key: "rating-asc",
      label: translate("filters.sort.ratingAsc"),
      icon: <SortAscIcon size={18} />,
    },
  ];
  const selectedOption = sortOptions.find((option) => option.key === sortOrder);
  const selectedIcon =
    sortOrder === "rating-desc" ? (
      <SortDescIcon size={22} />
    ) : sortOrder === "rating-asc" ? (
      <SortAscIcon size={22} />
    ) : (
      <StarIcon size={22} />
    );

  const handleSortAction = (key: Key) => {
    onSortChange(key as BowlSortOrder);
  };

  return (
    <>
      <Input
        className="mt-4 w-full"
        placeholder={translate("filters.searchPlaceholder")}
        size="md"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="mt-4 max-w-xs"
            startContent={selectedIcon}
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
            <DropdownItem key={option.key} startContent={option.icon}>
              {option.label}
            </DropdownItem>
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
