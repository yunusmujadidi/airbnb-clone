import EmptyState from "@/components/empty";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import { getReservations } from "@/lib/actions/reservationactions";

import React from "react";
import ReservationClient from "./reservationclient";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="No authorization" subtitle="Please login first" />
    );
  }
  const reservation = await getReservations({ authorId: currentUser?.id });
  if (reservation.length === 0) {
    return (
      <EmptyState
        title="No reservation found"
        subtitle="Looks like you have no reservation"
      />
    );
  }
  return (
    <ReservationClient reservation={reservation} currentUser={currentUser} />
  );
};

export default ReservationPage;
