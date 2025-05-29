import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const [rows] = await db.query("SELECT * FROM ai_chats WHERE user_id = ? ORDER BY created_at DESC", [userId]);
  return NextResponse.json({ history: rows });
}
