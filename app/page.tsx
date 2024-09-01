import Container from "@/components/container";
import EmptyState from "@/components/empty";
import getListings from "@/lib/actions/getlistings";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import ListingCard from "@/components/listing/listingcard";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const listing = await getListings();
  if (listing.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listing.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
