import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modals/registermodal";
import ToasterProvider from "./providers/toasterprovider";
import LoginModal from "@/components/modals/loginmodal";
import { getCurrentUser } from "@/lib/actions/getcurrentuser";
import "./globals.css";
import ListingModal from "@/components/modals/listingmodal";

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
        <main className="pb-20 pt-28">{children}</main>
        <RegisterModal />
        <LoginModal />
        <ListingModal />
      </body>
    </html>
  );
}
