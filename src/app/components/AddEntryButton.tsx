// dashboard/components/AddEntryButton.tsx
"use client";

import Link from "next/link";

export default function AddEntryButton() {
  return (
    <Link
      href="/dashboard/entry/new"
      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
    >
      + Add New Entry
    </Link>
  );
}
