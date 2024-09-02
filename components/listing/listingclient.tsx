"use client";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import Container from "../container";
import ListingHeader from "./listingheader";
import ListingInfo from "./listinginfo";
import { categories } from "../category";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import toast from "react-hot-toast";
import ListingReservation from "./listingreservation";
import { Range } from "react-date-range";
import axios from "axios";

interface ListingProps {
  currentUser?: User | null;
  listing: Listing & {
    user: User;
  };
  reservation?: Reservation[];
}

const initialStartDate = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient = ({
  listing,
  currentUser,
  reservation = [],
}: ListingProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialStartDate);

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDate = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservation]);

  const SubmitReservation = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    try {
      const response = await axios.post("/api/reservation", {
        listingId: listing.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice: totalPrice,
      });
      if (response.status === 200) {
        toast.success("Reservation created successfully");
      } else {
        toast.error("Something is wrong");
      }
    } catch (error) {
      console.log("Error creating a reservation:", error);
      toast.error("Something is wrong");
    } finally {
      setIsLoading(false);
      setDateRange(initialStartDate);
      router.refresh();
    }
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      setTotalPrice(listing.price * dayCount);
    } else {
      setTotalPrice(listing.price);
    }
  }, [listing.price, dateRange]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeader listing={listing} currentUser={currentUser} />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo listing={listing} category={category} />
            <div className="order-last mb-10 mb:order-first md:col-span-3">
              <ListingReservation
                dateRange={dateRange}
                disabledDates={disabledDate}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={SubmitReservation}
                price={listing.price}
                totalPrice={totalPrice}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
