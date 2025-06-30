"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="hidden md:block cursor-pointer"
    >
      <div className="text-2xl font-bold text-rose-500">RentSpace</div>
    </div>
  );
};

export default Logo;
