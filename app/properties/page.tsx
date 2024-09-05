import EmptyState from "@/components/empty";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import { getListingByUser } from "@/lib/actions/listingactions";
import PropertiesClient from "./propertiesclient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login first" />;
  }

  const listing = await getListingByUser();
  if (!listing || listing.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="You don't have any property listed"
      />
    );
  }

  return <PropertiesClient listing={listing} currentUser={currentUser} />;
};

export default PropertiesPage;
