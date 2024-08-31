import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Heart } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const isFavorite = false;
  const toggleFavorite = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to favorite a listing");
    }
    try {
      // Add logic to favorite a listing
      toast.success("Listing favorited");
    } catch (error) {
      toast.error("An error occurred while favoriting the listing");
    }
  };
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer ">
      <Heart
        size={24}
        className={cn(
          "absolute  -top-[2px] -right-[2px]",
          isFavorite ? "fill-rose-500" : "fill-current text-gray-500"
        )}
        onClick={toggleFavorite}
      />
    </div>
  );
};

export default HeartButton;
