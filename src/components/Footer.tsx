import React from 'react'
import Link from 'next/link'
export default function Footer() {
  return (
   <footer className="bg-black text-gray-400 py-10 px-4 sm:px-10">
   <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
     <div>
       <div className="text-white text-lg font-bold mb-2">Logo</div>
       <p className="text-sm">Level 1, 12 Sample St, Sydney NSW 2000</p>
       <p className="text-sm mt-1">1800 123 456<br />info@educate.com</p>
     </div>
     <div>
       <h4 className="text-white font-semibold mb-2">Student Resources</h4>
       <ul className="space-y-1 text-sm">
         <li><Link href="/notes" className="hover:text-orange-400 transition-colors">Upload Notes</Link></li>
         <li><Link href="/notes" className="hover:text-orange-400 transition-colors">Download Notes</Link></li>
         <li><Link href="/ai" className="hover:text-orange-400 transition-colors">Ask Questions</Link></li>
       </ul>
     </div>
     <div>
       <h4 className="text-white font-semibold mb-2">Community</h4>
       <ul className="space-y-1 text-sm">
         <li><Link href="/discussion" className="hover:text-orange-400 transition-colors">Discussion Forum</Link></li>
         <li><Link href="/discussion" className="hover:text-orange-400 transition-colors">Study Groups</Link></li>
         <li><Link href="#" className="hover:text-orange-400 transition-colors">Blog Posts</Link></li>
       </ul>
     </div>
     <div>
       <h4 className="text-white font-semibold mb-2">More</h4>
       <ul className="space-y-1 text-sm">
         <li><Link href="#" className="hover:text-orange-400 transition-colors">Help Center</Link></li>
         <li><Link href="#" className="hover:text-orange-400 transition-colors">User Feedback</Link></li>
         <li><Link href="/contactus" className="hover:text-orange-400 transition-colors">Contact Us</Link></li>
       </ul>
     </div>
   </div>
   <div className="mt-10 text-center text-xs border-t border-gray-700 pt-4">
     © 2025 Educate. All rights reserved. | <Link href="#" className="hover:text-orange-400">Privacy Policy</Link> | <Link href="#" className="hover:text-orange-400">Terms of Service</Link>
   </div>
 </footer>
  )
}
