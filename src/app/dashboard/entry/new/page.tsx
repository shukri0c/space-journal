import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { db } from "@/lib/db";
import NewEntryPageClient from "./NewEntryPageClient"; // client component

export default async function NewEntryPageWrapper() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) redirect("/login");

  return <NewEntryPageClient userId={user.id} />;
}
