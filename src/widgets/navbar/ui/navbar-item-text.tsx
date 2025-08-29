'use client'

import { type PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation'

import { NavbarItem, Link } from "@heroui/react";

type NavbarItemProps = PropsWithChildren & {
  href: string;
};

export const NavbarItemText = ({ href, children }: NavbarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <NavbarItem isActive={isActive}>
      <Link color={isActive ? 'primary' : 'foreground'} href={href}>{children}</Link>
    </NavbarItem>
  );
};