import React from "react";
import NextLink from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
} from "@heroui/react";

export const Header: React.FC = () => (
  <Navbar className="bg-white/70 backdrop-blur-md">
    <NavbarBrand>
      <Link as={NextLink} href="/" className="flex items-center gap-2">
        <Image src="/file.svg" alt="BowlBuilder logo" width={32} height={32} />
        <span className="font-bold">BowlBuilder</span>
      </Link>
    </NavbarBrand>
    <NavbarContent justify="end" className="gap-4">
      <NavbarItem>
        <Link as={NextLink} href="/bowls">
          Bowls
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link
          href="/showcase"
          tabIndex={-1}
          aria-disabled="true"
          className="pointer-events-none text-gray-400"
        >
          Витрина
        </Link>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
);

export default Header;
