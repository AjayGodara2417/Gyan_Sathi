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
          {channels.map((name) => (
            <div
              key={name}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
              onClick={() =>
                router.push(`/discussion/${name.toLowerCase().replace(/\s+/g, '-')}`)
              }
            >
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm mt-1 text-gray-600">
                Join conversations, share thoughts, and explore {name}.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
