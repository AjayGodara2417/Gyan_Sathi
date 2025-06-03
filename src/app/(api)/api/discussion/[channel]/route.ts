import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ channel: string }> }
) {
  // console.log("GET request received");
  const { userId } = getAuth(req);
  // console.log("first user id", userId);
  if (!userId) {
    return NextResponse.json(
      { message: "Please SignIn to use this feature" },
      { status: 401 }
    );
  }

  
  try {
    const { channel } = await context.params;
    console.log("channel", channel);
    // const conn = await pool.getConnection();
    // console.log("connectionn", conn);
    const [[channelRow]] = await db.query<RowDataPacket[]>(
      "SELECT id FROM channels WHERE name = ?",
      [channel]
    );
    console.log("channelRow", channelRow);
    if (!channelRow) return NextResponse.json({ posts: [] });

    console.log("channelRow", channelRow);
    const [posts] = await db.query(
      `SELECT p.id, p.author, p.question, p.created_at,
              IFNULL(JSON_ARRAYAGG(JSON_OBJECT('id', r.id, 'author', r.author, 'text', r.text, 'created_at', r.created_at)), JSON_ARRAY()) AS replies
       FROM posts p
       LEFT JOIN replies r ON p.id = r.post_id
       WHERE p.channel_id = ?
       GROUP BY p.id`,
      [channelRow.id]
    );

    console.log("posts");

    return NextResponse.json({ posts });
  } catch (error) {
    console.log("Error in GET request", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
   finally {
    // conn.release();
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ channel: string }> }
) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { message: "Please SignIn to use this feature" },
      { status: 401 }
    );
  }

  const { channel } = await context.params;
  // const conn = await db.getConnection();
  const body = await req.json();

  try {
    let [[channelRow]] = await db.query<RowDataPacket[]>(
      "SELECT id FROM channels WHERE name = ?",
      [channel]
    );

    if (!channelRow) {
      const [result] = await db.query<ResultSetHeader>(
        "INSERT INTO channels (name) VALUES (?)",
        [channel]
      );
      channelRow = { id: result.insertId } as RowDataPacket;
    }

    if (body.postId) {
      const { postId, text, author } = body;
      if (!postId || !text || !author)
        return NextResponse.json(
          { message: "Missing reply fields" },
          { status: 400 }
        );

      await db.query(
        "INSERT INTO replies (post_id, author, text) VALUES (?, ?, ?)",
        [postId, author, text]
      );
      return NextResponse.json({ success: true });
    } else {
      const { author, question } = body;
      if (!author || !question)
        return NextResponse.json(
          { message: "Missing question fields" },
          { status: 400 }
        );

      await db.query(
        "INSERT INTO posts (channel_id, author, question) VALUES (?, ?, ?)",
        [channelRow.id, author, question]
      );
      return NextResponse.json({ success: true });
    }
  } finally {
    // db.release();
  }
}