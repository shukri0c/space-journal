// dashboard/components/EntryForm.tsx
"use client";

import { useState } from "react";

interface EntryFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => void;
}

export default function EntryForm({
  initialTitle = "",
  initialContent = "",
  onSubmit,
}: EntryFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(title, content);
      }}
      className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg w-200 ml-60 h-140"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={6}
        className="p-2 rounded border border-gray-600 bg-gray-900 text-white h-100"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Save Entry
      </button>
    </form>
  );
}
