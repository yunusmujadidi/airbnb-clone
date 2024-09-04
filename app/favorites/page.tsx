import EmptyState from "@/components/empty";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import FavoritesClient from "./favoritesclient";
import { getfavoriteListing } from "@/lib/actions/listingactions";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login first" />;
  }

  const favoritelisting = await getfavoriteListing();

  if (favoritelisting.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <FavoritesClient listing={favoritelisting} currentUser={currentUser} />
  );
};

export default FavoritesPage;
