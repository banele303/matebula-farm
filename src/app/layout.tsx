import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { Toaster } from "@/components/ui/toaster";
import { Barlow_Semi_Condensed } from "next/font/google";

const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${barlow.className} antialiased min-h-screen`}>
        <ThemeProvider defaultTheme="system" storageKey="mathebula-farm-theme">
          <AuthProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
