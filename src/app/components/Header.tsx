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
    <header className="bg-black/30 backdrop-blur-lg text-white py-5 px-6 border-b border-white/20 sticky top-0 z-50 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 max-w-7xl mx-auto">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="sm:flex-1">
          <h1 className="text-2xl font-bold text-center sm:text-left tracking-wide">
            Stargazer Journal
          </h1>
        </Link>

        <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 text-base sm:text-lg">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 transition-colors duration-200 font-medium"
              aria-label="Sign out"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                href="/"
                className="hover:text-gray-300 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                href="/login"
                className="hover:text-gray-300 transition-colors duration-200 font-medium"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="hover:text-gray-300 transition-colors duration-200 font-medium"
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
