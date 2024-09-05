import React, { Suspense } from "react";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./usermenu";
import { User } from "@prisma/client";
import Category from "../category";

interface NavbarProps {
  currentUser?: User | null;
}

const NavbarContent = ({ currentUser }: NavbarProps) => (
  <>
    <div className="py-4 border-b-[1px]">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
    <Category />
  </>
);

const Navbar = async ({ currentUser }: NavbarProps) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm transition-all duration-300 ease-in-out min-h-[100px]">
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <NavbarContent currentUser={currentUser} />
      </Suspense>
    </div>
  );
};

export default Navbar;
