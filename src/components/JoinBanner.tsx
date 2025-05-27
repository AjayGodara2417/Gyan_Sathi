import React from 'react'
import Link from 'next/link'

export default function JoinBanner() {
  return (
   <section className="bg-black text-white py-20 text-center px-4 sm:px-10">
   <h2 className="text-3xl font-bold mb-4">Join Our Learning Community Today</h2>
   <p className="mb-6 text-gray-400">Sign up now to access notes, ask questions, and engage in educational discussions with peers.</p>
   <div className="space-x-4">
     <Link
       href="#"
       className="bg-orange-400 text-black px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105"
     >
       Sign Up
     </Link>
     <Link
       href="#"
       className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105"
     >
       Log In
     </Link>
   </div>
 </section>
  )
}
