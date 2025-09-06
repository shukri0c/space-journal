"use client";

import { useSession } from "next-auth/react";

export default function SessionDebug() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading session...</p>;

  if (status === "authenticated") {
    return (
      <div className="p-2 bg-green-100 rounded">
        <p>✅ Logged in as {session.user?.email}</p>
      </div>
    );
  }

  return (
    <div className="p-2 bg-red-100 rounded">
      <p>❌ Not logged in</p>
    </div>
  );
}
