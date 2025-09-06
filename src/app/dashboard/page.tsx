import { redirect } from "next/navigation";
import { auth } from "@/app/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {session.user?.name ?? session.user?.email} 🎉</p>
    </div>
  );
}
