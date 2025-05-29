import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "@/lib/db"; // Make sure your db connection is exported here

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ message: "Please SignIn to use this feature" }, { status: 401 });
  }

  try {
    const { task, prompt } = await req.json();
    if (!task || !prompt) {
      return NextResponse.json(
        { message: "Task and prompt are required" },
        { status: 400 }
      );
    }

    const systemPrompt = getSystemPrompt(task, prompt);

    const chatResponse = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt.system },
        { role: "user", content: systemPrompt.user },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResult = chatResponse.choices[0].message.content;

    // Save chat history to DB
    await db.execute(
      `INSERT INTO ai_chats (user_id, task, prompt, response) VALUES (?, ?, ?, ?)`,
      [userId, task, prompt, aiResult]
    );

    return NextResponse.json({ result: aiResult });
  } catch (err: any) {
    console.error("AI processing error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

function getSystemPrompt(task: string, prompt: string) {
  switch (task) {
    case "quiz":
      return {
        system: "You are a helpful quiz generator. Generate a quiz based on the given topic.",
        user: `Generate a quiz with questions and answers based on: ${prompt}`,
      };
    case "doubt":
      return {
        system: "You are a knowledgeable tutor who explains concepts in a simple way.",
        user: `Explain this doubt: ${prompt}`,
      };
    case "answer":
      return {
        system: "You are an examiner who verifies and improves students' answers.",
        user: `Check and improve this answer: ${prompt}`,
      };
    default:
      return {
        system: "You are a helpful assistant.",
        user: prompt,
      };
  }
}
