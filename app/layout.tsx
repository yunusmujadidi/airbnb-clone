import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modals/registermodal";
import ToasterProvider from "@/app/providers/toasterprovider";
import LoginModal from "@/components/modals/loginmodal";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import "./globals.css";
import ListingModal from "@/components/modals/listingmodal";
import SearchModal from "@/components/modals/searchmodal";
import { Suspense } from "react";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb ",
  description: "Airbnb clone",
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
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <Suspense
          fallback={
            <div className="h-[calc(100vh-100px)] flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          }
        >
          <main className="pb-20 pt-36">{children}</main>
        </Suspense>
        <RegisterModal />
        <LoginModal />
        <ListingModal />
        <SearchModal />
      </body>
    </html>
  );
}
