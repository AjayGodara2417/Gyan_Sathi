import React from 'react'
import Image from 'next/image'

export default function Banner() {
  return (
   <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 sm:px-10 py-20 items-center">
   <div className="flex justify-center">
     <Image
       src="/notes.jpg"
       className="rounded-xl transition-transform duration-300 hover:scale-105"
       width={650}
       height={400}
       alt="Upload notes"
     />
   </div>
   <div className="flex flex-col justify-center space-y-6 text-left">
     <div>
       <h3 className="text-2xl font-bold mb-2 hover:text-orange-400 transition-colors duration-300">Upload Notes</h3>
       <p className="text-gray-400">Easily upload and share your notes with other students.</p>
     </div>
     <div>
       <h3 className="text-2xl font-bold mb-2 hover:text-orange-400 transition-colors duration-300">Educational Events</h3>
       <p className="text-gray-400">Join various educational events and workshops.</p>
     </div>
     <div>
       <h3 className="text-2xl font-bold mb-2 hover:text-orange-400 transition-colors duration-300">Study Groups</h3>
       <p className="text-gray-400">Connect with students for group study sessions.</p>
     </div>
   </div>
 </section>
  )
}
