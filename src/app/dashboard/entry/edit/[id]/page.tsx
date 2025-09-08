"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import EntryForm from "@/app/components/EntryForm";

interface Entry {
  id: number;
  title: string;
  content: string;
}

export default function EditEntryPage() {
  const params = useParams();
  const router = useRouter();

  // safely unwrap params.id
  const entryIdParam = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const entryId = entryIdParam ? parseInt(entryIdParam, 10) : NaN;

  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!entryId || isNaN(entryId)) {
      router.push("/dashboard");
      return;
    }

    async function fetchEntry() {
      const res = await fetch(`/api/entry/${entryId}`);
      if (!res.ok) {
        router.push("/dashboard");
        return;
      }
      const data = await res.json();
      setEntry(data);
      setLoading(false);
    }

    fetchEntry();
  }, [entryId, router]);

  async function handleUpdate(title: string, content: string) {
    const res = await fetch(`/api/entry/${entryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) router.push("/dashboard");
  }

  if (loading || !entry) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex-1 ml-64 p-10 bg-gray-900 min-h-screen min-w-screen text-white">
      <div className="flex justify-center items-start p-10 min-h-screen bg-gray-900 text-white">
        <EntryForm
          initialTitle={entry.title}
          initialContent={entry.content}
          onSubmit={handleUpdate}
        />
      </div>
    </main>
  );
}
