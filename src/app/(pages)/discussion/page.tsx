"use client";

import { useRouter } from "next/navigation";
import { BookOpen, FlaskConical, Paintbrush, Code2, Globe, GraduationCap } from "lucide-react";

const featured = [
  {
    title: "Study Group",
    description: "Join fellow students in collaborative study sessions.",
    bg: "bg-yellow-100",
  },
  {
    title: "Coding Club",
    description: "Explore coding challenges and projects together.",
    bg: "bg-teal-100",
  },
  {
    title: "Design Discussions",
    description: "Share design ideas and get feedback on your work.",
    bg: "bg-lime-100",
  },
];

const categories = [
  { name: "Academics", icon: <GraduationCap className="w-4 h-4 mr-1" /> },
  { name: "Technology", icon: <Code2 className="w-4 h-4 mr-1" /> },
  { name: "Design", icon: <Paintbrush className="w-4 h-4 mr-1" /> },
  { name: "Science", icon: <FlaskConical className="w-4 h-4 mr-1" /> },
  { name: "Literature", icon: <BookOpen className="w-4 h-4 mr-1" /> },
  { name: "General", icon: <Globe className="w-4 h-4 mr-1" /> },
];

const popular = [
  { name: "Math Enthusiasts", count: 120 },
  { name: "History Buffs", count: 95 },
  { name: "Science Explorers", count: 150 },
  { name: "Literature Lovers", count: 80 },
];

const channels = [
  "Technology", "AI", "Coding", "Computer Science", "Science", "English", "Physics", "Chemistry",
  "Maths", "Biology", "History", "Geography", "Economics", "Art", "Politics", "Music", "Dance",
  "Theatre", "Literature", "Philosophy"
];

// Color combinations for channel cards
const colorSchemes = [
  { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800" },
  { bg: "bg-green-50", border: "border-green-200", text: "text-green-800" },
  { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800" },
  { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-800" },
  { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800" },
  { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-800" },
  { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-800" },
  { bg: "bg-red-50", border: "border-red-200", text: "text-red-800" },
  { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800" },
  { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-800" },
  { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800" },
  { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-800" },
  { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-800" },
  { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800" },
  { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-800" },
  { bg: "bg-lime-50", border: "border-lime-200", text: "text-lime-800" },
  { bg: "bg-fuchsia-50", border: "border-fuchsia-200", text: "text-fuchsia-800" },
  { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-800" },
  { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-800" },
  { bg: "bg-zinc-50", border: "border-zinc-200", text: "text-zinc-800" },
  { bg: "bg-neutral-50", border: "border-neutral-200", text: "text-neutral-800" },
];

// Function to get a random color scheme
const getRandomColorScheme = () => {
  return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
};

export default function DiscussionHome() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-10">Channels</h1>

      {/* Featured */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((item) => (
            <div
              onClick={() => router.push(`/discussion/${item.title.toLowerCase().replace(/\s+/g, '-')}`)}
              key={item.title}
              className={`${item.bg} p-6 rounded-xl shadow-sm hover:shadow-md transition`}
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c.name}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 text-sm"
            >
              {c.icon}
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* Popular Channels */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Popular Channels</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4" >
          {popular.map((channel) => (
            <div
              onClick={() => router.push(`/discussion/${channel.name.toLowerCase().replace(/\s+/g, '-')}`)}
              key={channel.name}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border"
            >
              <h3 className="text-md font-medium">{channel.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{channel.count} members</p>
            </div>
          ))}
        </div>
      </section>

      {/* All Channels */}
      <section>
        <h2 className="text-lg font-semibold mb-4">All Channels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((name) => {
            const colorScheme = getRandomColorScheme();
            return (
              <div
                key={name}
                className={`${colorScheme.bg} ${colorScheme.border} p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition border`}
                onClick={() =>
                  router.push(`/discussion/${name.toLowerCase().replace(/\s+/g, '-')}`)
                }
              >
                <h3 className={`text-lg font-semibold ${colorScheme.text}`}>{name}</h3>
                <p className="text-sm mt-1 text-gray-600">
                  Join conversations, share thoughts, and explore {name}.
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
