"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    // Navigate to full-page spinner
    window.location.href = "/dashboard/loggingOut";

    // Let the spinner render for a short moment
    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 500);
  };

  return (
    <header className="flex justify-between items-center py-5 px-6 bg-black/50 text-white border-b border-white sticky top-0 z-50 backdrop-blur-md">
      <h1 className="text-xl font-bold">Stargazer Journal</h1>

      <nav className="flex gap-6 text-lg">
        {session ? (
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 transition-colors duration-300"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link
              href="/"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
