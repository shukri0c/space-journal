import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { db } from "@/lib/db";

interface EntryPageProps {
  params: { id: string };
}

export default async function Entry({ params }: EntryPageProps) {
  const session = await auth();

  if (!session?.user?.email) redirect("/login");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect("/login");

  const entry = await db.entry.findUnique({
    where: { id: parseInt(params.id, 10) },
  });

  if (!entry || entry.userId !== user.id) redirect("/dashboard/journal");

  return (
    <main className="flex-1 ml-64 p-10 bg-gray-900 min-h-screen">
      <div className="bg-gray-800 rounded-lg p-6 transition-colors duration-200 mb-10 ml-20 mr-20 mt-20 bg-gradient-to-br from-gray-800 to-gray-700">
        <h1 className="text-2xl font-bold text-gray-200 mb-2">{entry.title}</h1>
        <p className="text-sm text-gray-400 mb-4">
          {new Date(entry.createdAt).toLocaleDateString()} •{" "}
          {new Date(entry.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className=" text-xl text-gray-200 whitespace-pre-line">
          {entry.content}
        </p>
      </div>
    </main>
  );
}
