"use client";

const ListingCardLoading = () => {
  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-gray-200 animate-pulse"></div>
        <div className="font-semibold text-lg h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        <div className="font-light text-neutral-500 h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ListingCardLoading;
