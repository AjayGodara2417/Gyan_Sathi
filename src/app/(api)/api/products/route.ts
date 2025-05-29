import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { title, description, price, contact, imageUrl } = await req.json();

    if (!title || !price || !contact || !imageUrl) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await db.execute(
      "INSERT INTO products (title, description, price, contact, image_url) VALUES (?, ?, ?, ?, ?)",
      [title, description, price, contact, imageUrl]
    );

    return NextResponse.json({ message: "Product listed successfully" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM products ORDER BY created_at DESC");
    return NextResponse.json({ products: rows });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Fetch error" }, { status: 500 });
  }
}
