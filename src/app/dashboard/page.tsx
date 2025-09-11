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
      <main className="p-4 md:p-10 lg:ml-64">
        {" "}
        {/* Responsive padding and layout */}
        <div className="mb-8 md:mb-10">
          {" "}
          {/* Reduced bottom margin on mobile */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {" "}
            {/* Responsive text size */}
            Welcome, {session.user.name ?? session.user.email} 🎉
          </h2>
          <div className="mb-6 md:mb-8">
            {" "}
            {/* Container for Astronomy widget */}
            <AstronomyWidgetClient />
          </div>
          <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
            {" "}
            {/* Responsive text */}
            Here are your latest journal entries:
          </p>
          <div className="mb-6 md:mb-8">
            {" "}
            {/* Container for button */}
            <AddEntryButton />
          </div>
        </div>
        {entries.length === 0 ? (
          <p className="text-gray-400 text-base md:text-lg">
            {" "}
            {/* Responsive text */}
            You don’t have any journal entries yet...
          </p>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {" "}
            {/* Reduced spacing on mobile */}
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
