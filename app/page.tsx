import { Suspense } from "react";
import Container from "@/components/container";
import EmptyState from "@/components/empty";
import getListings, { IListingParams } from "@/lib/actions/listingactions";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import ListingCard from "@/components/listing/listingcard";

interface HomeProps {
  searchParams: IListingParams;
}

const HomeContent = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const listing = await getListings(searchParams);

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
};

const Home = (props: HomeProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent {...props} />
    </Suspense>
  );
};

export default Home;
