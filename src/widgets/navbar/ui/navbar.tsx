"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";

import { NavbarItemText } from "./navbar-item-text";

import { ThemeSwitch } from "@/features/theme-switch";
import { Logo } from "@/shared/ui/icons";

export const Navbar = () => {
  const pathname = usePathname();
  const menuItems = [{ href: "/user", label: "Profile" }];

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">BowlBuilder</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {menuItems.map(({ href, label }) => (
          <NavbarItemText key={href} href={href}>
            {label}
          </NavbarItemText>
        ))}

        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map(({ href, label }) => {
          const isActive = pathname.startsWith(href);

          return (
            <NavbarMenuItem key={href} isActive={isActive}>
              <Link
                className="w-full"
                color={isActive ? "primary" : "foreground"}
                href={href}
              >
                {label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
