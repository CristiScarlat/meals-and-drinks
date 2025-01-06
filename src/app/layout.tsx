import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Meals and Drinks",
    description: "Collection of meals and cocktails recipes",
    publisher: "Cristi Scarlat",
    keywords: "meals, drinks, cocktails, food",
    openGraph: {
        siteName: "mealswithdrinks.com",
        type: "website",
        title: "mealswithdrinks",
        description: "Collection of meals and cocktails recipes",
        url: "https://mealswithdrinks.com/",
        images: ["https://mealswithdrinks.com/images/home_drinks.jpg"]
    },
    twitter: {
        title: "mealswithdrinks",
        description: "Collection of meals and cocktails recipes",
        site: "https://mealswithdrinks.com",
        images: ["https://mealswithdrinks.com/images/home_drinks.jpg"],
        card: "summary_large_image",
    }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <main>{children}</main>
      </body>
    </html>
  );
}
