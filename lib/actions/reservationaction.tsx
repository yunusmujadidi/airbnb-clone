" use server";

import prisma from "../prisma";
import { getCurrentUser } from "./getcurrentuser";

interface ReservationInput {
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  listingId: string;
  userId: string;
}

export const createReservation = async (reservation: ReservationInput) => {
  if (
    !reservation.startDate ||
    !reservation.endDate ||
    !reservation.totalPrice ||
    !reservation.listingId
  ) {
    throw new Error("Invalid reservation data");
  }
  try {
    const listingandreservation = await prisma.listing.update({
      where: {
        id: reservation.listingId,
      },
      data: {
        reservation: {
          create: {
            userId: reservation.userId,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            totalPrice: reservation.totalPrice,
          },
        },
      },
    });
    return listingandreservation;
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Failed to create a reservation ");
  }
};
