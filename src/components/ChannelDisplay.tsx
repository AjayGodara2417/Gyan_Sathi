import React from 'react'
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
export default function ChannelDisplay() {
  return (
   <div className="px-6 py-6 bg-gray-50 text-gray-900  w-[90%] mx-auto">
   <h1 className="text-3xl font-bold text-center mb-10">Join a Discussion</h1>

   {/* Featured */}
   <section className="mb-12" >
     <h2 className="text-lg font-semibold mb-4">Featured</h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
       {featured.map((item) => (
         <div
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
   </div>
  )
}
