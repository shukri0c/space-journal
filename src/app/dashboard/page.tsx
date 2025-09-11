import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { db } from "@/lib/db";
import JournalCard from "@/app/components/JournalCard";
import AddEntryButton from "@/app/components/AddEntryButton";
import AstronomyWidgetClient from "./AstronomyWidgetClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  const entries = await db.entry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen w-full flex bg-gray-900 text-white">
      {/* Main content */}
      <main className="flex-1 ml-64 p-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Welcome, {session.user.name ?? session.user.email} 🎉
          </h2>
          <AstronomyWidgetClient />
          <p className="text-gray-400 mt-2 mb-10">
            Here are your latest journal entries:
          </p>
          <AddEntryButton />
        </div>

        {entries.length === 0 ? (
          <p className="text-gray-400 text-lg">
            You don’t have any journal entries yet...
          </p>
        ) : (
          <div className="space-y-6 mr-80">
            {entries.map((entry) => (
              <JournalCard
                key={entry.id}
                id={entry.id}
                title={entry.title}
                content={entry.content}
                createdAt={entry.createdAt}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
