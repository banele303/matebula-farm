import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mathebula Farm | Fresh Farm Produce from Our Hearts to Your Table",
  description: "Quality table eggs and fresh produce from Mathebula Farm. B-BBEE Level 1 certified, community-focused farming in Honingnestkrans, North of Pretoria.",
  keywords: "farm, eggs, fresh produce, B-BBEE, Pretoria, sustainable farming",
  authors: [{ name: "Mathebula Farm" }],
  openGraph: {
    title: "Mathebula Farm | Fresh Farm Produce",
    description: "Quality table eggs and fresh produce from our hearts to your table",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
