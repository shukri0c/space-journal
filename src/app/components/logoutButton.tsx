"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
    >
      Logout
    </button>
  );
}
