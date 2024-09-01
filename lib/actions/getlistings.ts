import prisma from "../prisma";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getListingById({ listingId }: { listingId: string }) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }
    return listing;
  } catch (error) {
    throw new Error(error as string);
  }
}
