"use server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { formSchema } from "@/components/modals/registermodal";
import prisma from "../prisma";
import { listingSchema } from "@/components/modals/listingmodal";
import { getCurrentUser } from "./getcurrentuser";

export const submitRegister = async (values: z.infer<typeof formSchema>) => {
  try {
    const hashedPassword = await bcrypt.hash(values.password, 10);

    const user = await prisma.user.create({
      data: {
        email: values.email,
        name: values.name,
        hashedPassword: hashedPassword,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.log("Error registering user: ", error);
    throw new Error("An error occurred. Please try again later.");
  }
};

export const submitListing = async (values: z.infer<typeof listingSchema>) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("You must be logged in to create a listing");
    }

    const listing = await prisma.listing.create({
      data: {
        bathroomCount: values.bathroomCount,
        roomCount: values.roomCount,
        description: values.description,
        price: Number(values.price),
        title: values.title,
        category: values.category,
        locationValue: values.location,
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
