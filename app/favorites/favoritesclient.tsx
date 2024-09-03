"use client";
import React, { useState, useEffect } from "react";
import { Listing, User } from "@prisma/client";
import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listing/listingcard";
import { getFavoriteListings } from "@/lib/actions/favoriteaction";

interface FavoritesClientProps {
  currentUser: User | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ currentUser }) => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchFavoriteListings = async () => {
      if (currentUser) {
        const favoriteListings = await getFavoriteListings(currentUser.id);
        setListings(favoriteListings);
      }
    };

    fetchFavoriteListings();
  }, [currentUser]);

  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
