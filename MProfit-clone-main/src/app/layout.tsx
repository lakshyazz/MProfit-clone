import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { HoldingsProvider } from "@/context/HoldingsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MProfit | Unified Wealth Dashboard",
  description: "Next-generation portfolio tracking and wealth management for smart individuals and professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HoldingsProvider>
          <Navbar />
          {children}
        </HoldingsProvider>
      </body>
    </html>
  );
}
