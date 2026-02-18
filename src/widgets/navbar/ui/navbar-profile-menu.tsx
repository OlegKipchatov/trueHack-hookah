"use client";

import { Avatar, Dropdown, DropdownMenu, DropdownTrigger } from "@heroui/react";

import { useTranslation } from "@/shared/lib/i18n/provider";

export type NavbarProfileMenuProps = {
  initials?: string;
};

export const NavbarProfileMenu = ({
  initials = "BB",
}: NavbarProfileMenuProps) => {
  const { t: translate } = useTranslation();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          aria-label={translate("navbar.profileMenuAria")}
          className="transition-transform cursor-pointer"
          color="primary"
          fallback={initials}
          name={initials}
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label={translate("navbar.profileMenuAria")}
        items={[]}
        variant="flat"
      />
    </Dropdown>
  );
};
