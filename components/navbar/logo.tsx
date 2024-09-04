"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      src="/logo.png"
      alt="Logo"
      className="hidden md:block cursor-pointer"
      width={100}
      height={100}
      style={{ width: "auto", height: "auto" }}
      priority
    />
  );
};

export default Logo;
