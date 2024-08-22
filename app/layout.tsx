import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modals/registermodal";
import ToasterProvider from "./providers/toasterprovider";
import LoginModal from "@/components/modals/loginmodal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb ",
  description: "Airbnb clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "h-full min-h-screen")}>
        <ToasterProvider />
        <Navbar />
        <main>{children}</main>
        <RegisterModal />
        <LoginModal />
      </body>
    </html>
  );
}
