"use client";

import { useState } from "react";
import EntryForm from "@/app/components/EntryForm";
import { updateEntry } from "@/app/actions/entryActions.server";
import { useRouter } from "next/navigation";

interface Entry {
  id: number;
  title: string;
  content: string;
}

interface EditEntryPageClientProps {
  entry: Entry;
}

export default function EditEntryPageClient({
  entry,
}: EditEntryPageClientProps) {
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);
  const router = useRouter();

  async function handleUpdate(updatedTitle: string, updatedContent: string) {
    await updateEntry(entry.id, updatedTitle, updatedContent);
    router.push("/dashboard");
  }

  return (
    <EntryForm
      initialTitle={title}
      initialContent={content}
      onSubmit={handleUpdate}
    />
  );
}
