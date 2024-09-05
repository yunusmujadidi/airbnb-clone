import ListingCardLoading from "@/components/listing/listingcardloading";
import Container from "@/components/container";

const HomeLoading = () => {
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {[...Array(12)].map((_, index) => (
          <ListingCardLoading key={index} />
        ))}
      </div>
    </Container>
  );
};

export default HomeLoading;
