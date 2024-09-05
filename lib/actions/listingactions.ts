"use server";
import { z } from "zod";
import prisma from "../prisma";
import { getCurrentUser } from "./getcurrentuser";
import { listingSchema } from "@/components/modals/listingmodal";
import { User } from "@prisma/client";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservation: {
          some: {
            OR: [
              {
                endDate: {
                  gte: startDate,
                },
                startDate: {
                  lte: startDate,
                },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
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

export const deleteListings = async (listingId: string, currentUser: User) => {
  // const currentUser = await getCurrentUser();
  if (!currentUser) {
    console.log("Unauthorized: No current user");
    throw new Error("Unauthorized");
  }
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });
    if (!listing) {
      console.log(`Listing not found: ${listingId}`);
      throw new Error("Listing not found");
    }
    if (listing.userId !== currentUser.id) {
      console.log(
        `User ${currentUser.id} doesn't have permission to delete listing ${listingId}`
      );
      throw new Error("You don't have permission to delete this listing");
    }

    await prisma.listing.delete({
      where: {
        id: listingId,
      },
    });
    console.log(`Listing ${listingId} deleted successfully`);
    return { success: true };
  } catch (error: any) {
    console.log(`Error deleting listing: ${error.message}`);
    throw new Error(`Error deleting listing: ${error.message}`);
  }
};

export const getListingByUser = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: currentUser.id,
      },
    });
    return listings;
  } catch (error) {
    throw new Error(error as string);
  }
};
