import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { db } from "@/lib/db";
import JournalCard from "@/app/components/JournalCard";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  // Fetch the user from the database using their email
  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  // Fetch journal entries for this user
  const entries = await db.entry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6 text-white flex flex-col items-center">
      <div className="mt-20 fixed top-0 left-0 p-6 text-white z-50 ">
        <h1 className="text-5xl font-bold border-b border-r border-white pb-5 pr-5">
          Dashboard
        </h1>
        <p className="mt-10 text-2xl">
          Welcome, {session.user.name ?? session.user.email} !
        </p>
      </div>

      {entries.length === 0 ? (
        <p className="mt-65 text-gray-300">
          You don’t have any journal entries yet...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 center">
          {entries.map((entry) => (
            <JournalCard
              key={entry.id}
              id={entry.id}
              title={entry.title}
              createdAt={entry.createdAt.toISOString()}
            />
          ))}
        </div>
      )}
    </main>
  );
}
