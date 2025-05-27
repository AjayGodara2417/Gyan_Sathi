"use client";

import { useRouter } from "next/navigation";

// VIBGYOR & extra vibrant colors
const cardColors = [
  "bg-red-500",     // Red
  "bg-orange-500",  // Orange
  "bg-yellow-400",  // Yellow
  "bg-green-500",   // Green
  "bg-blue-500",    // Blue
  "bg-indigo-500",  // Indigo
  "bg-violet-500",  // Violet
  "bg-pink-500",    // Pink
  "bg-teal-500",    // Teal
  "bg-rose-500",    // Rose
  "bg-emerald-500", // Emerald
  "bg-cyan-500",    // Cyan
  "bg-lime-500",    // Lime
  "bg-purple-500",  // Purple
  "bg-sky-500",     // Sky
  "bg-amber-500",   // Amber
  "bg-fuchsia-500", // Fuchsia
  "bg-indigo-400",  // Bonus shade
  "bg-blue-700",    // Deep blue
  "bg-red-600"      // Deep red
];

const channels = [
  "Technology",
  "AI",
  "Coding",
  "Computer Science",
  "Science",
  "English",
  "Physics",
  "Chemistry",
  "Maths",
  "Biology",
  "History",
  "Geography",
  "Economics",
  "Art",
  "Politics",
  "Music",
  "Dance",
  "Theatre",
  "Literature",
  "Philosophy"
];

export default function DiscussionHome() {
  const router = useRouter();

  return (
    <div className="p-6 font-hand min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-900">Join a Discussion Channel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((name, index) => (
          <div
            key={name}
            className={`relative p-6 rounded-2xl shadow-lg text-white cursor-pointer transition-transform transform hover:scale-105 ${cardColors[index % cardColors.length]}`}
            onClick={() => router.push(`/discussion/${name.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
            <p className="text-sm opacity-90">Join conversations, share thoughts, and explore {name} with others.</p>
            <div className="absolute top-4 right-4 text-white opacity-30 text-xl">★</div>
          </div>
        ))}
      </div>
    </div>
  );
}
