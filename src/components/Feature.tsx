import React from 'react'
import {
  DownloadCloud,
  HelpCircle,
  MessageSquareText,
  Bot,
} from "lucide-react";

export default function Feature() {
  return (
//    <section className="bg-slate-50 py-20 text-center px-4 sm:px-10">
//    <h2 className="text-3xl font-bold mb-10 text-black">Empowering Students Through Collaborative Learning</h2>
//    <p className="text-gray-800 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
//      Our platform offers students a space to share and access valuable resources. Join a community that fosters knowledge and engagement.
//    </p>
//    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//       {features.map((f, i) => (
//         <div
//           key={i}
//           className="bg-black border h-52 border-gray-700 p-6 rounded-xl shadow transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col justify-center"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 rounded-full bg-gray-900 border border-gray-700">
//               {f.icon}
//             </div>
//             <h3 className="text-xl font-semibold transition-colors duration-300 hover:text-orange-400">
//               {f.title}
//             </h3>
//           </div>
//           <p className="text-gray-400 text-sm">{f.desc}</p>
//         </div>
//       ))}
//     </div>
//  </section>
<section className='px-4 w-[90%] mx-auto'>
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900">
          Unlock Your Potential with Our Platform
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Key Features</h2>
        <p className="text-gray-600 mb-8 max-w-2xl text-base">
          Explore the features designed to support your academic success.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              title: 'Notes',
              icon: <DownloadCloud className="w-6 h-6 text-gray-600" />,
              desc: 'Access a vast library of student-uploaded notes.',
            },
            {
              title: 'Channels',
              icon: <MessageSquareText className="w-6 h-6 text-gray-600" />,
              desc: 'Join channels to discuss topics and collaborate with peers.',
            },
            {
              title: 'Q&A',
              icon: <HelpCircle className="w-6 h-6 text-gray-600" />,
              desc: 'Get your doubts cleared by experts and fellow students.',
            },
            {
              title: 'AI Quiz',
              icon: <Bot className="w-6 h-6 text-gray-600" />,
              desc: 'Generate custom quizzes with our AI feature to test your knowledge.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white shadow-md rounded-2xl border p-4 space-y-2"
            >
              <div className="flex items-center gap-3 mb-2">
                {feature.icon}
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
  )
}
