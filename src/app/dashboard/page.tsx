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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main content */}
      <main className="p-4 md:p-6">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Welcome, {session.user.name ?? session.user.email} 🎉
          </h2>
          <div className="mb-4 md:mb-6">
            <AstronomyWidgetClient />
          </div>
          <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
            Here are your latest journal entries:
          </p>
          <div className="mb-4 md:mb-6">
            <AddEntryButton />
          </div>
        </div>
        {entries.length === 0 ? (
          <p className="text-gray-400 text-base md:text-lg">
            You don’t have any journal entries yet...
          </p>
        ) : (
          <div className="space-y-4 md:space-y-6">
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
