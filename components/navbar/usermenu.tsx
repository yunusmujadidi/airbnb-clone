"use client";

import { Menu } from "lucide-react";
import React, { useCallback, useState } from "react";
import Avatar from "../avatar";
import MenuItem from "./menuitem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import useListingModal from "@/app/hooks/useListingModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const listingModal = useListingModal();

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

  const handleListingModal = useCallback(() => {
    if (!currentUser) {
      toast.error("You need to login first");
      return loginModal.onOpen();
    }
    setIsOpen(false);
    listingModal.onOpen();
  }, [currentUser, loginModal, listingModal]);

  const handleLogout = useCallback(() => {
    signOut();
    setIsOpen(false);
    toast.success("Logged out successfully");
  }, []);

  return (
    <div className="relative z-20">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={handleListingModal}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>

        <div
          onClick={handleMenu}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <Menu />
          <div className="hidden md:block">
            <Avatar image={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40wv] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                    setIsOpen(false);
                  }}
                  label="My trips"
                />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                    setIsOpen(false);
                  }}
                  label="My reservation"
                />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={handleListingModal} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={handleLogout} label="Logout" />
              </>
            ) : (
              <div>
                <MenuItem onClick={handleLoginModal} label="Login" />
                <MenuItem onClick={handleRegisterModal} label="Sign Up" />
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
