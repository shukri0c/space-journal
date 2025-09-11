"use client";

import Link from "next/link";
import { FiTrash2, FiEdit, FiLoader } from "react-icons/fi";
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
    <div className="relative bg-gray-800 rounded-lg p-4 md:p-6 hover:bg-gray-700 transition cursor-pointer mb-4 md:mb-6">
      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 md:top-4 md:right-4 text-red-500 hover:text-red-400 transition-colors"
        disabled={isDeleting}
        title="Delete entry"
        aria-label="Delete entry"
      >
        {isDeleting ? (
          <FiLoader size={18} className="animate-spin" />
        ) : (
          <FiTrash2 size={18} />
        )}
      </button>

      {/* Edit button */}
      <Link
        href={`/dashboard/entry/edit/${id}`}
        className="absolute top-3 right-10 md:top-4 md:right-11"
        aria-label="Edit entry"
      >
        <FiEdit
          className="text-blue-400 hover:text-blue-500 cursor-pointer transition-colors"
          size={18}
        />
      </Link>

      <Link href={`/dashboard/entry/${id}`}>
        <h3 className="text-lg md:text-xl font-semibold text-white line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-400 mb-3">
          {new Date(createdAt).toLocaleDateString()} •{" "}
          {new Date(createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {content && (
          <p className="text-sm md:text-base text-gray-200 line-clamp-3">
            {content}
          </p>
        )}
      </Link>
    </div>
  );
}
