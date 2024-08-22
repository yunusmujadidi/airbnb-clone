import { UserCircle2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Avatar = ({ image }: { image?: String | null | undefined }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {image ? (
        <Image
          src={image as string}
          alt={image as string}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <UserCircle2Icon size={32} className="text-neutral-500" />
      )}
    </div>
  );
};

export default Avatar;
