import { Suspense } from "react";
import EmptyState from "@/components/empty";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import { getReservations } from "@/lib/actions/reservationactions";
import TripsClient from "./tripsclient";
export const dynamic = "force-dynamic";

const TripsContent = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login first" />;
  }
  const reservation = await getReservations({ userId: currentUser.id });

  if (reservation.length === 0) {
    return (
      <EmptyState
        subtitle="Looks like you haven't made any reservation yet"
        title="No reservation found"
      />
    );
  }

  return <TripsClient currentUser={currentUser} reservations={reservation} />;
};

const TripPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TripsContent />
    </Suspense>
  );
};

export default TripPage;
