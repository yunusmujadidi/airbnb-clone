import EmptyState from "@/components/empty";

export const dynamic = "force-dynamic";

export default function NotFoundPage() {
  return <EmptyState title="404" subtitle="Page not found" />;
}
