import "./globals.css";
import { Header } from "@/components/header";
import { MainHeader } from "@/components/Navigation/Header";
import { Footer } from "@/components/footer";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});

const fontHeading = localFont({
  variable: "--font-heading",
  src: "./geist.ttf",
  display: "swap",
});

export const metadata: Metadata = {
 title: 'ScamLens',
  description: 'Get Expert Help to Protect yourself from online scams',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <MainHeader/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
