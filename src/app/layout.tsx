
import type { Metadata } from "next";
import VirginiaAgencyBar from "@/src/components/layout/VirginiaAgencyBar";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virginia SBSD | Small Business and Supplier Diversity",
  description:
    "Explore Virginia small business resources, supplier diversity programs, certification, training, and networking opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <VirginiaAgencyBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
