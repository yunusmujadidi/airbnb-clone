import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listing/listingcard";
import { Listing, User } from "@prisma/client";

interface FavoriteListingProps {
  listing: Listing[];
  currentUser?: User | null;
}

const FavoriteClient = ({ listing, currentUser }: FavoriteListingProps) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you have favorited" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listing.map((item) => (
          <ListingCard data={item} key={item.id} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
