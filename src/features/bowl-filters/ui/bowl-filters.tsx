"use client";

import type { Key, ReactElement } from "react";
import type {
  BowlRatingSortOrder,
  BowlStrengthSortOrder,
} from "@/entities/bowl";

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
import {
  SortAscIcon,
  SortDescIcon,
  StarIcon,
  StrengthDefaultIcon,
} from "@/shared/ui/icons";

export type BowlFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  flavors: string[];
  onRemoveFlavor: (flavor: string) => void;
  ratingSortOrder: BowlRatingSortOrder;
  strengthSortOrder: BowlStrengthSortOrder;
  onRatingSortChange: (order: BowlRatingSortOrder) => void;
  onStrengthSortChange: (order: BowlStrengthSortOrder) => void;
};

export const BowlFilters = ({
  search,
  onSearchChange,
  flavors,
  onRemoveFlavor,
  ratingSortOrder,
  strengthSortOrder,
  onRatingSortChange,
  onStrengthSortChange,
}: BowlFiltersProps) => {
  const { t: translate } = useTranslation();
  const ratingSortOptions: Array<{
    key: BowlRatingSortOrder;
    label: string;
    icon: ReactElement;
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
  const strengthSortOptions: Array<{
    key: BowlStrengthSortOrder;
    label: string;
    icon: ReactElement;
  }> = [
    {
      key: "default",
      label: translate("filters.sort.default"),
      icon: <StrengthDefaultIcon size={18} />,
    },
    {
      key: "strength-desc",
      label: translate("filters.sort.strengthDesc"),
      icon: <SortDescIcon size={18} />,
    },
    {
      key: "strength-asc",
      label: translate("filters.sort.strengthAsc"),
      icon: <SortAscIcon size={18} />,
    },
  ];

  const selectedRatingOption = ratingSortOptions.find(
    (option) => option.key === ratingSortOrder,
  );
  const selectedStrengthOption = strengthSortOptions.find(
    (option) => option.key === strengthSortOrder,
  );
  const selectedRatingIcon =
    ratingSortOrder === "rating-desc" ? (
      <SortDescIcon size={22} />
    ) : ratingSortOrder === "rating-asc" ? (
      <SortAscIcon size={22} />
    ) : (
      <StarIcon size={22} />
    );
  const selectedStrengthIcon =
    strengthSortOrder === "strength-desc" ? (
      <SortDescIcon size={22} />
    ) : strengthSortOrder === "strength-asc" ? (
      <SortAscIcon size={22} />
    ) : (
      <StrengthDefaultIcon size={22} />
    );

  const handleRatingSortAction = (key: Key) => {
    onRatingSortChange(key as BowlRatingSortOrder);
  };

  const handleStrengthSortAction = (key: Key) => {
    onStrengthSortChange(key as BowlStrengthSortOrder);
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
      <div className="mt-4 flex flex-wrap gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="max-w-xs"
              startContent={selectedRatingIcon}
              variant="bordered"
            >
              {selectedRatingOption?.label ?? ratingSortOptions[0]?.label}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label={translate("filters.sort.aria")}
            selectedKeys={[ratingSortOrder]}
            selectionMode="single"
            onAction={handleRatingSortAction}
          >
            {ratingSortOptions.map((option) => (
              <DropdownItem key={option.key} startContent={option.icon}>
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="max-w-xs"
              startContent={selectedStrengthIcon}
              variant="bordered"
            >
              {selectedStrengthOption?.label ?? strengthSortOptions[0]?.label}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label={translate("filters.sort.aria")}
            selectedKeys={[strengthSortOrder]}
            selectionMode="single"
            onAction={handleStrengthSortAction}
          >
            {strengthSortOptions.map((option) => (
              <DropdownItem key={option.key} startContent={option.icon}>
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
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
