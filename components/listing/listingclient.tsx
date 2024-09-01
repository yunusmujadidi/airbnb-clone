"use client";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useMemo } from "react";
import Container from "../container";
import ListingHeader from "./listingheader";
import ListingInfo from "./listinginfo";
import { categories } from "../category";

interface ListingProps {
  currentUser?: User | null;
  listing: Listing & {
    user: User;
  };
  reservation?: Reservation[];
}

const ListingClient = ({ listing, currentUser, reservation }: ListingProps) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeader listing={listing} currentUser={currentUser} />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo listing={listing} category={category} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
