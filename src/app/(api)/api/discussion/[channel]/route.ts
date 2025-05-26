// app/api/discussion/[channel]/route.ts
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export async function GET(req: NextRequest, context: { params: { channel: string } }) {
  const { channel } = context.params;

  const conn = await pool.getConnection();

  try {
    const [[channelRow]] = await conn.query("SELECT id FROM channels WHERE name = ?", [channel]);
    if (!channelRow) return NextResponse.json({ posts: [] });

    const [posts] = await conn.query(
      `SELECT p.id, p.author, p.question, p.created_at,
              IFNULL(JSON_ARRAYAGG(JSON_OBJECT('id', r.id, 'author', r.author, 'text', r.text, 'created_at', r.created_at)), JSON_ARRAY()) AS replies
       FROM posts p
       LEFT JOIN replies r ON p.id = r.post_id
       WHERE p.channel_id = ?
       GROUP BY p.id`,
      [channelRow.id]
    );

    return NextResponse.json({ posts });
  } finally {
    conn.release();
  }
}

export async function POST(req: NextRequest, context: { params: { channel: string } }) {
  const { channel } = context.params;

  const conn = await pool.getConnection();
  const body = await req.json();

  try {
    let [[channelRow]] = await conn.query("SELECT id FROM channels WHERE name = ?", [channel]);

    if (!channelRow) {
      const [result] = await conn.query("INSERT INTO channels (name) VALUES (?)", [channel]);
      channelRow = { id: result.insertId }; // ✅ FIXED: initialize channelRow if not found
    }

    if (body.postId) {
      const { postId, text, author } = body;
      if (!postId || !text || !author)
        return NextResponse.json({ message: "Missing reply fields" }, { status: 400 });

      await conn.query(
        "INSERT INTO replies (post_id, author, text) VALUES (?, ?, ?)",
        [postId, author, text]
      );
      return NextResponse.json({ success: true });
    } else {
      const { author, question } = body;
      if (!author || !question)
        return NextResponse.json({ message: "Missing question fields" }, { status: 400 });

      await conn.query(
        "INSERT INTO posts (channel_id, author, question) VALUES (?, ?, ?)",
        [channelRow.id, author, question]
      );
      return NextResponse.json({ success: true });
    }
  } finally {
    conn.release();
  }
}