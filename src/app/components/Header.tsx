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
      await signOut({ redirect: false });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isLoggedIn = showAuthLinksOnly ? false : !!session;

  return (
    <header className="bg-black backdrop-blur-md text-white py-3 px-4 border-b border-gray-700 sticky top-0 z-50">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="sm:flex-1">
          <h1 className="text-xl font-bold text-center sm:text-left">
            Stargazer Journal
          </h1>
        </Link>

        <nav className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm sm:text-base">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 transition-colors"
              aria-label="Sign out"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link
                href="/login"
                className="hover:text-gray-300 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="hover:text-gray-300 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
