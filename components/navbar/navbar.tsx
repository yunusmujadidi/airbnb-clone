import React from "react";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./usermenu";
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser?: User | null;
}
const Navbar = async ({ currentUser }: NavbarProps) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
