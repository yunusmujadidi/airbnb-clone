import prisma from "../prisma";

interface IParams {
  listingId?: string;
  userId?: string;
}

export async function getReservations(params: IParams) {
  const { listingId, userId } = params;

  const query: any = {};

  if (listingId) {
    query.listingId = listingId;
  }

  if (userId) {
    query.userId = userId;
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error) {
    throw new Error(error as string);
  }
}
