import { z } from "zod";
import prisma from "../prisma";
import { getCurrentUser } from "./getcurrentuser";
import { listingSchema } from "@/components/modals/listingmodal";

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

export async function getfavoriteListing() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }
  try {
    const favoritelistings = await prisma.listing.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds || [],
        },
      },
    });
    return favoritelistings;
  } catch (error) {
    throw new Error(error as string);
  }
}

export const submitListing = async (values: z.infer<typeof listingSchema>) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("You must be logged in to create a listing");
    }
    console.log("Submitting listing with values:", values);
    const listing = await prisma.listing.create({
      data: {
        bathroomCount: values.bathroomCount,
        roomCount: values.roomCount,
        description: values.description,
        price: Number(values.price),
        title: values.title,
        category: values.category,
        locationValue: values.location.value,
        guestCount: values.guestCount,
        imageSrc: values.imageSrc,
        userId: user.id,
      },
    });

    return { success: true, listing };
  } catch (error) {
    console.log("Error creating listing: ", error);
    throw new Error("An error occurred. Please try again later.");
  }
};
