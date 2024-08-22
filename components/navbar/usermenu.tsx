"use client";

import { Menu } from "lucide-react";
import React, { useCallback, useState } from "react";
import Avatar from "../avatar";
import MenuItem from "./menuitem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleRegisterModal = useCallback(() => {
    registerModal.onOpen();
    setIsOpen(false);
  }, [registerModal]);

  const handleLoginModal = useCallback(() => {
    loginModal.onOpen();
    setIsOpen(false);
  }, [loginModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>
        <div
          onClick={handleMenu}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <Menu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40wv] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <>
            <MenuItem onClick={handleLoginModal} label="Login" />
            <MenuItem onClick={handleRegisterModal} label="Sign Up" />
          </>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
