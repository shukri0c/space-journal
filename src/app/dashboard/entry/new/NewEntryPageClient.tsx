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
    <main className="flex-1 ml-20 p-10 bg-gray-900 min-h-screen  text-white mr-20 mt-10">
      {loading ? <p>Saving entry...</p> : <EntryForm onSubmit={handleSubmit} />}
    </main>
  );
}
