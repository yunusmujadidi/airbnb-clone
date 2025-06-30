import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modals/registermodal";
import LoginModal from "@/components/modals/loginmodal";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import "./globals.css";
import ListingModal from "@/components/modals/listingmodal";
import SearchModal from "@/components/modals/searchmodal";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentSpace",
  description: "Property rental platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={cn(font.className, "h-full min-h-screen")}>
        <Toaster />
        <Navbar currentUser={currentUser} />

        <main className="pb-20 pt-36">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
        <RegisterModal />
        <LoginModal />
        <ListingModal />
        <SearchModal />
      </body>
    </html>
  );
}
