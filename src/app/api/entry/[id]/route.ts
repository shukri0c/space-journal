import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/app/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const entryId = parseInt(params.id, 10);

  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const entry = await db.entry.findUnique({ where: { id: entryId } });
  if (!entry || entry.userId !== user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(entry);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const entryId = parseInt(params.id, 10);
  const body = await req.json();
  const { title, content } = body;

  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const updatedEntry = await db.entry.update({
    where: { id: entryId },
    data: { title, content },
  });

  return NextResponse.json(updatedEntry);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const entryId = parseInt(params.id, 10);

  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.entry.delete({ where: { id: entryId } });
  return NextResponse.json({ success: true });
}