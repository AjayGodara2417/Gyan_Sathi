import React from 'react'

export default function Feature() {
  return (
   <section className="bg-[#1a1a1a] py-20 text-center px-4 sm:px-10">
   <h2 className="text-3xl font-bold mb-10">Empowering Students Through Collaborative Learning</h2>
   <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
     Our platform offers students a space to share and access valuable resources. Join a community that fosters knowledge and engagement.
   </p>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
     {[
       { title: "Upload Notes", desc: "Easily share your notes with peers to enhance collective learning experiences." },
       { title: "Download Notes", desc: "Access a wide range of notes uploaded by fellow students for your study needs." },
       { title: "Ask Questions", desc: "Get answers to your academic queries from knowledgeable peers and experts." },
       { title: "Educational Discussions", desc: "Engage in meaningful discussions to deepen your understanding of various subjects." },
     ].map((f, i) => (
       <div
         key={i}
         className="bg-black border border-gray-700 p-6 rounded-xl shadow transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
       >
         <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 hover:text-orange-400">
           {f.title}
         </h3>
         <p className="text-gray-400 text-sm">{f.desc}</p>
       </div>
     ))}
   </div>
 </section>
  )
}
