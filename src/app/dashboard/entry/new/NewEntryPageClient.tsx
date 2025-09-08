"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EntryForm from "@/app/components/EntryForm";
import { createEntryServer } from "@/app/actions/entryActions.server";

// Define props interface
interface NewEntryPageClientProps {
  userId: number;
}

export default function NewEntryPageClient({
  userId,
}: NewEntryPageClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(title: string, content: string) {
    setLoading(true);
    await createEntryServer(userId, title, content);
    router.push("/dashboard");
  }

  return (
    <main className="flex justify-center items-start p-10 min-h-screen bg-gray-900 text-white">
      {loading ? <p>Saving entry...</p> : <EntryForm onSubmit={handleSubmit} />}
    </main>
  );
}
