import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Heart } from "lucide-react";
import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toggleFavorite } from "@/lib/actions/favoriteaction";
import useLoginModal from "@/app/hooks/useLoginModal";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    return currentUser?.favoriteIds?.includes(listingId) ?? false;
  });

  const handleToggleFavorite = useCallback(async () => {
    if (!currentUser) {
      toast.error("You must be logged in to favorite a listing");
      loginModal.onOpen();
      return;
    }

    try {
      const result = await toggleFavorite(listingId, currentUser.id);
      if (result.success && typeof result.isFavorite === "boolean") {
        setIsFavorite(result.isFavorite);
        router.refresh();
        toast.success(
          result.isFavorite
            ? "Listing added to favorites"
            : "Listing removed from favorites"
        );
      } else {
        throw new Error(result.error || "Failed to toggle favorite");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }, [currentUser, listingId, router, loginModal]);

  return (
    <div
      onClick={handleToggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <Heart
        size={24}
        className={cn(
          "absolute -top-[2px] -right-[2px]",
          isFavorite
            ? "fill-rose-500 text-neutral-100"
            : "fill-current text-neutral-500"
        )}
      />
    </div>
  );
};

export default HeartButton;
