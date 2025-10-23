import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { Toaster } from "@/components/ui/toaster";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen">
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
