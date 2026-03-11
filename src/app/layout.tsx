import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, Show, UserButton } from "@clerk/nextjs";
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
  title: "ChopChop!",
  description: "The Digital Cookbook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <nav className="flex items-center justify-between border-b border-border/60 bg-card/70 p-4 backdrop-blur">
            <Link
              href="/"
              className="flex items-center font-semibold tracking-tight"
            >
              <Image
                src="/logo.webp"
                alt="ChopChop Logo"
                width={40}
                height={40}
                priority
                className="rounded-md"
              />
              <span className="text-xl font-bold tracking-tight">ChopChop</span>
            </Link>
            <Suspense>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </Suspense>
          </nav>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

//Notes
//TODO ClerkProvider might need to be wrapped in a suspense boundary
