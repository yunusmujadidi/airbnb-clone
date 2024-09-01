import EmptyState from "@/components/empty";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import { getListingById } from "@/lib/actions/getlistings";
import React from "react";
import ListingClient from "@/components/listing/listingclient";

const ListingPage = async ({ params }: { params: { listingId: string } }) => {
  const { listingId } = params;
  const listing = await getListingById({ listingId });
  const currentUser = await getCurrentUser();
  if (!listing) {
    return <EmptyState />;
  }
  return <ListingClient listing={listing} currentUser={currentUser} />;
};

export default ListingPage;
