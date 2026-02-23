import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./Providers";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { SliderDemo } from "./SliderDemo";
import { AvatarDemo } from "./AvatarDemo";
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Providers>
            <div className="flex min-h-screen flex-col">
              {/* Top nav */}
              <nav className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <div>ChopChop nav</div>
                  {/* demo avatars in the nav */}
                  <AvatarDemo />
                </div>

                <Suspense fallback={<div className="h-8 w-32" />}>
                  <SignedOut>
                    <div className="flex gap-3">
                      <SignInButton />
                      <SignUpButton />
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </Suspense>
              </nav>

              {/* Body: sidebar + page content */}
              <div className="flex flex-1">
                <aside className="w-64 border-r p-6">
                  <div className="font-semibold mb-4">Sidebar</div>
                  <SliderDemo />
                </aside>

                <main className="flex-1 p-6">{children}</main>
              </div>
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}