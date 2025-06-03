import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  // Ensure the user is authenticated
  // const { userId } = getAuth(req);
  // if(!userId){
  //   return NextResponse.json({message: "Please SignIn to use this feature"}, {status: 401});
  // }

  const body = await req.json();
  const { title, tag, description, date, fileUrl } = body;

  try {
    await db.execute(
      `INSERT INTO notes (title, tag, description, date, file_url) VALUES (?, ?, ?, ?, ?)`,
      [title, tag, description, date, fileUrl]
    );
    return NextResponse.json({ message: "Note saved successfully" });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM notes ORDER BY created_at DESC");
    return NextResponse.json({ notes: rows });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ message: "Fetch error" }, { status: 500 });
  }
}
