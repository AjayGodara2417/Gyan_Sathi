import React from 'react'
import Link from 'next/link'

export default function Join() {
  return (
   <section className="py-20 bg-purple-200 text-black text-center relative px-4 sm:px-10">
   <div className="relative z-10">
     <h2 className="text-3xl font-bold mb-4">Join our student platform today!</h2>
     <p className="mb-6 text-lg">Connect with other students, share notes, and excel in your studies.</p>
     <Link
       href="/discussion"
       className="bg-orange-400 text-black px-6 py-3 rounded-md font-semibold transition-transform duration-300 hover:scale-105 shadow"
     >
       Indulge into knwolegable discussions
     </Link>
   </div>
 </section>
  )
}
