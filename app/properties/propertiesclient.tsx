"use client";
import Container from "@/components/container";
import Heading from "@/components/heading";
import { Listing, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ListingCard from "@/components/listing/listingcard";
import { deleteListings } from "@/lib/actions/listingactions";

interface PropertiesClientProps {
  currentUser?: User | null;
  listing: Listing[];
}

const PropertiesClient = ({ listing, currentUser }: PropertiesClientProps) => {
  const [deleteId, setDeleteId] = useState("");
  const router = useRouter();

  const onDelete = async (id: string) => {
    setDeleteId(id);
    if (!currentUser) {
      return toast.error("Please login first");
    }
    try {
      const result = await deleteListings(id, currentUser);
      if (result.success) {
        toast.success("Property deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("Error deleting property");
    } finally {
      setDeleteId("");
    }
  };

  return (
    <Container>
      <Heading title="My properties" subtitle="My listed properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listing.map((item) => (
          <ListingCard
            key={item.id}
            data={item}
            actionId={item.id}
            onAction={onDelete}
            disabled={deleteId === item.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
