import EmptyState from "@/components/empty";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import { getListingById } from "@/lib/actions/listingactions";
import React from "react";
import ListingClient from "@/components/listing/listingclient";
import { getReservations } from "@/lib/actions/reservationactions";

const ListingPage = async ({ params }: { params: { listingId: string } }) => {
  const { listingId } = params;
  const listing = await getListingById({ listingId });
  const currentUser = await getCurrentUser();
  const reservation = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservation={reservation}
    />
  );
};

export default ListingPage;
