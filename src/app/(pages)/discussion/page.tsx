// app/discussion/page.tsx
"use client";

import { useRouter } from "next/navigation";

const channels = ["Maths", "Science", "English", "History"];

export default function DiscussionHome() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6 text-white font-hand">
      <h1 className="text-3xl font-bold mb-6">Join a Discussion Channel</h1>
      <ul className="space-y-4">
        {channels.map((channel) => (
          <li key={channel}>
            <button
              onClick={() => router.push(`/discussion/${channel.toLowerCase()}`)}
              className="w-full py-3 px-6 bg-blue-700 hover:bg-blue-500 text-white rounded-lg text-left"
            >
              {channel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
