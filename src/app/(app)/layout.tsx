import { Suspense } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <nav className="flex items-center justify-between p-4">
        <div>ChopChop</div>
        <Suspense fallback={<div className="h-8 w-32" />}>
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Suspense>
      </nav>
      {children}
    </ClerkProvider>
  );
}
