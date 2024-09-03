"use client";
import Container from "@/components/container";
import Heading from "@/components/heading";
import { User } from "@prisma/client";
import { ReservationWithListing } from "../trips/tripsclient";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { deleteReservation } from "@/lib/actions/reservationactions";
import ListingCard from "@/components/listing/listingcard";

interface ReservationClientProps {
  currentUser?: User | null;
  reservation: ReservationWithListing[];
}

const ReservationClient = ({
  currentUser,
  reservation,
}: ReservationClientProps) => {
  const [deleteId, setDeleteId] = useState("");
  const router = useRouter();

  const onDelete = useCallback(
    async (id: string) => {
      setDeleteId(id);
      try {
        const result = await deleteReservation(id);
        if (result.success) {
          toast.success("Reservation Cancelled");
          router.refresh();
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        toast.error("Error cancelling reservation");
      } finally {
        setDeleteId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservation" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onDelete}
            disabled={deleteId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
