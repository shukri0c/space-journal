"use server";


import { db } from "@/lib/db";

export async function createEntryServer(
  userId: number,
  title: string,
  content: string
) {
  "use server"; // <- marks this function as a Server Action
  return await db.entry.create({
    data: { userId, title, content },
  });
}

export async function updateEntry(
  entryId: number,
  title: string,
  content: string
) {
  return await db.entry.update({
    where: { id: entryId },
    data: { title, content },
  });
}

export async function deleteEntry(entryId: number) {
  return await db.entry.delete({
    where: { id: entryId },
  });
}

export async function getEntryById(entryId: number) {
  return await db.entry.findUnique({ where: { id: entryId } });
}
