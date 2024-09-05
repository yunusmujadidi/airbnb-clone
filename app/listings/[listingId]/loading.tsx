import Container from "@/components/container";

const ListingLoading = () => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto pt-24">
        <div className="flex flex-col gap-6">
          {/* Image placeholder */}
          <div className="w-full h-[60vh] overflow-hidden rounded-xl bg-gray-200 animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            {/* Listing info placeholder */}
            <div className="col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-32 bg-gray-200 rounded w-full animate-pulse" />
            </div>

            {/* Listing card placeholder */}
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden">
                <div className="flex flex-col gap-2 p-4">
                  <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded w-full animate-pulse mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingLoading;
