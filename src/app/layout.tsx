// layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gyan Saathi Dashboard",
  description: "Personalized AI Education Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F6FDF8] flex`}>
          <Navbar />
          <main className="md:ml-[260px] mt-14 md:mt-0 w-full min-h-screen">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
