"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  showAuthLinksOnly?: boolean;
}

export default function Header({ showAuthLinksOnly }: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Optional: Show loading state here if you have a spinner component
      await signOut({ redirect: false }); // Sign out without automatic redirect
      router.push("/"); // Redirect to home page after successful signout
      router.refresh(); // Refresh the router to ensure session state is updated
    } catch (error) {
      console.error("Logout failed:", error);
      // Optional: Show error message to user
    }
  };

  // If forced to show auth links (login/signup), ignore session
  const isLoggedIn = showAuthLinksOnly ? false : !!session;

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-3 py-4 px-4 sm:px-6 bg-black/50 text-white border-b border-white sticky top-0 z-50 backdrop-blur-md">
      {/* Logo/Title - centered on mobile, left-aligned on larger screens */}
      <Link href={isLoggedIn ? "/dashboard" : "/"} className="sm:flex-1">
        <h1 className="text-xl font-bold text-center sm:text-left">
          Stargazer Journal
        </h1>
      </Link>

      {/* Navigation - wraps on mobile, row on larger screens */}
      <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-base sm:text-lg">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 transition-colors duration-300 px-2 py-1 sm:px-0 sm:py-0"
            aria-label="Sign out"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link
              href="/"
              className="hover:text-gray-300 transition-colors duration-300 px-2 py-1 sm:px-0 sm:py-0"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="hover:text-gray-300 transition-colors duration-300 px-2 py-1 sm:px-0 sm:py-0"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="hover:text-gray-300 transition-colors duration-300 px-2 py-1 sm:px-0 sm:py-0"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
