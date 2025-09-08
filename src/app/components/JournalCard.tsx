"use client";

import Link from "next/link";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { deleteEntry } from "@/app/actions/entryActions.server";
import { useState } from "react";

interface JournalCardProps {
  id: number;
  title: string;
  content?: string | null;
  createdAt: Date | string;
}

export default function JournalCard({
  id,
  title,
  content,
  createdAt,
}: JournalCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this entry?");
    if (!confirmed) return;

    setIsDeleting(true);
    await deleteEntry(id);
    // reload page to reflect deletion
    window.location.reload();
  };

  return (
    <div className="relative bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition cursor-pointer mb-10">
      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 text-red-500 hover:text-red-400"
        disabled={isDeleting}
        title="Delete entry"
      >
        <FiTrash2 size={20} />
      </button>
      <Link href={`/dashboard/entry/edit/${id}`}>
        <FiEdit className="text-blue-400 hover:text-blue-500 cursor-pointer absolute top-4 right-11" />
      </Link>

      <Link href={`/dashboard/entry/${id}`}>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">
          {new Date(createdAt).toLocaleDateString()} •{" "}
          {new Date(createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {content && (
          <p className="mt-3 text-gray-200">
            {content.length > 120 ? content.slice(0, 120) + "..." : content}
          </p>
        )}
      </Link>
    </div>
  );
}
