

import "leaflet/dist/leaflet.css";

import Script from "next/script";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// export const metadata = {
//   title: "Companio",
//   icons: {
//     icon: "/logo/companio-logo.png",
//   },
// };

// export const metadata: Metadata = {
//   title: "Companio — Feel Connected",
//   description:
//     "Companio helps people feel connected, understood, and supported.",
// };


export const metadata = {
  title: "Companio – Feel Connected",
  description: "Companio helps people feel connected, understood and supported.",
  icons: {
    icon: "\logo\companio-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <head>

        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />

      </head>

      <body
        className={`${playfair.variable} ${inter.variable} font-sans bg-background`}
      >

        {/* Razorpay script — load ONLY once */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <Navbar />

        <main className="pt-8 md:pt-12">
          {children}
        </main>

      </body>

    </html>

  );

}