import prisma from "../prisma";

interface IParams {
  listingId?: string;
}

export async function getReservations(params: IParams) {
  const { listingId } = params;

  const query: any = {};

  if (listingId) {
    query.listingId = listingId;
  }

  try {
    const reservation = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservation;
  } catch (error) {
    throw new Error(error as string);
  }
}
