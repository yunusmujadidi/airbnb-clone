"use client";
import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import HeartButton from "@/components/heartbutton";
import Button from "@/components/button";

interface ListingCardProps {
  onAction?: (id: string) => void;
  data: Listing;
  reservation?: Reservation;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

const ListingCard = ({
  onAction,
  data,
  reservation,
  disabled,
  actionLabel,
  actionId,
  currentUser,
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId as string);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${startDate.toDateString()} - ${endDate.toDateString()}`;
  }, [reservation]);

  const handleHeartClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt={data.title}
            className="object-cover w-full h-full group-hover:scale-110 transition"
            fill
          />
          <div className="absolute top-3 right-3" onClick={handleHeartClick}>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.label}, {location?.region}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="font-semibold">
          $ {price}{" "}
          {reservation ? "" : <span className="font-light">night</span>}
        </div>
      </div>
      {onAction && actionLabel && (
        <Button
          label={actionLabel}
          onClick={handleCancel}
          disabled={disabled}
          small
        />
      )}
    </div>
  );
};

export default ListingCard;
