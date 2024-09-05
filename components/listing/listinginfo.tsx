import useCountries from "@/app/hooks/useCountries";
import { Listing, User } from "@prisma/client";
import React from "react";
import Avatar from "../avatar";
import {
  LayoutGrid,
  LucideIcon,
  PersonStanding,
  ShowerHead,
} from "lucide-react";
import ListingCategory from "./listingcategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../map"), { ssr: false });

interface ListingInfoProps {
  listing: Listing & {
    user: User;
  };
  category:
    | {
        icon: LucideIcon;
        label: string;
        description: string;
      }
    | undefined;
}

const ListingInfo = ({ listing, category }: ListingInfoProps) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(listing.locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-semibold flex items-center gap-3">
          <Avatar image={listing.user?.image} />
          <div className="text-gray-800">Hosted by {listing.user?.name}</div>
        </div>
        <div className="flex items-center text-gray-600 gap-6">
          <div className="flex items-center gap-2">
            <PersonStanding className="text-gray-500" />
            {listing.guestCount} guest{listing.guestCount > 1 ? "s" : ""}
          </div>
          <div className="flex items-center gap-2">
            <LayoutGrid className="text-gray-500" />
            {listing.roomCount} room{listing.roomCount > 1 ? "s" : ""}
          </div>
          <div className="flex items-center gap-2">
            <ShowerHead className="text-gray-500" />
            {listing.bathroomCount} bathroom
            {listing.bathroomCount > 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr className="border-gray-200" />

      <div className="text-lg font-light text-gray-600 mb-4 break-words">
        {listing.description}
      </div>

      <hr className="border-gray-200" />

      <div className="h-64 rounded-lg overflow-hidden">
        <Map center={coordinates || [-6.9667, 110.4167]} />
      </div>
    </div>
  );
};

export default ListingInfo;
