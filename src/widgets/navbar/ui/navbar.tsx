"use client";

import { useCallback, useMemo } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Button,
  Link,
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";

import { NavbarItemText } from "./navbar-item-text";

import { LanguageSwitch } from "@/features/language-switch";
import { ThemeSwitch } from "@/features/theme-switch";
import { useSession } from "@/entities/session";
import { useTranslation } from "@/shared/lib/i18n/provider";
import { Logo } from "@/shared/ui/icons";

export const Navbar = () => {
  const { t: translate } = useTranslation();
  const { profile, isAuthenticated, logout } = useSession();
  const pathname = usePathname();
  const menuItems = useMemo(
    () => [{ href: "/user", label: translate("navbar.profile") }],
    [translate],
  );

  const displayName = useMemo(() => {
    if (profile?.firstName || profile?.lastName) {
      return `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim();
    }

    if (profile?.id) {
      return profile.id;
    }

    return translate("navbar.profile");
  }, [profile, translate]);

  const greeting = useMemo(() => {
    if (!isAuthenticated) {
      return null;
    }

    return translate("navbar.greeting", { name: displayName });
  }, [displayName, isAuthenticated, translate]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">
              {translate("navbar.brand")}
            </p>
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

        <NavbarItem className="hidden sm:flex items-center gap-2">
          <LanguageSwitch />
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Avatar
                alt={displayName}
                className="h-8 w-8"
                radius="full"
                src={profile?.avatar}
              />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">{greeting}</span>
                <Button size="sm" variant="light" onClick={handleLogout}>
                  {translate("navbar.logout")}
                </Button>
              </div>
            </div>
          ) : (
            <Button as={NextLink} color="primary" href="/auth" size="sm">
              {translate("navbar.login")}
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <ThemeSwitch />
          <NavbarMenuToggle />
        </div>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          {isAuthenticated ? (
            <div className="flex w-full items-center gap-3">
              <Avatar
                alt={displayName}
                className="h-10 w-10"
                radius="full"
                src={profile?.avatar}
              />
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold">{greeting}</span>
                <Button
                  color="primary"
                  size="sm"
                  variant="flat"
                  onClick={handleLogout}
                >
                  {translate("navbar.logout")}
                </Button>
              </div>
            </div>
          ) : (
            <Button as={NextLink} color="primary" href="/auth" size="sm">
              {translate("navbar.login")}
            </Button>
          )}
        </NavbarMenuItem>
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
        <NavbarMenuItem className="flex items-center gap-2">
          <LanguageSwitch />
          <ThemeSwitch />
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
