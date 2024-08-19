import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo.png"
      width={100}
      height={100}
      className="hidden md:block cursor-pointer"
      alt="logo"
    />
  );
};

export default Logo;
