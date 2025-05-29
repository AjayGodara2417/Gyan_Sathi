import React from 'react'
import {
  UploadCloud,
  DownloadCloud,
  HelpCircle,
  MessageSquareText,
} from "lucide-react";

const features = [
  {
    title: "Upload Notes",
    desc: "Easily share your notes with peers to enhance collective learning experiences.",
    icon: <UploadCloud className="w-10 h-10 text-orange-500" />,
  },
  {
    title: "Download Notes",
    desc: "Access a wide range of notes uploaded by fellow students for your study needs.",
    icon: <DownloadCloud className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Ask Questions",
    desc: "Get answers to your academic queries from knowledgeable peers and experts.",
    icon: <HelpCircle className="w-10 h-10 text-blue-500" />,
  },
  {
    title: "Educational Discussions",
    desc: "Engage in meaningful discussions to deepen your understanding of various subjects.",
    icon: <MessageSquareText className="w-10 h-10 text-purple-500" />,
  },
];
export default function Feature() {
  return (
   <section className="bg-slate-50 py-20 text-center px-4 sm:px-10">
   <h2 className="text-3xl font-bold mb-10 text-black">Empowering Students Through Collaborative Learning</h2>
   <p className="text-gray-800 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
     Our platform offers students a space to share and access valuable resources. Join a community that fosters knowledge and engagement.
   </p>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((f, i) => (
        <div
          key={i}
          className="bg-black border h-52 border-gray-700 p-6 rounded-xl shadow transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-gray-900 border border-gray-700">
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold transition-colors duration-300 hover:text-orange-400">
              {f.title}
            </h3>
          </div>
          <p className="text-gray-400 text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
 </section>
  )
}
