import EmptyState from "@/components/empty";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import { getReservations } from "@/lib/actions/getreservations";
import ReservationClient from "./reservationclient";

const TripPage = async () => {
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

  return (
    <ReservationClient currentUser={currentUser} reservations={reservation} />
  );
};

export default TripPage;
