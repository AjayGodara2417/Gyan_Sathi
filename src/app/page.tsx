'use client';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white bg-black font-sans">

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-10 py-20 gap-10">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
            Unlock Your Academic Potential with Our Collaborative Student Platform
          </h1>
          <p className="mb-6 text-gray-300 text-sm sm:text-base transition-opacity duration-700">
            Join a vibrant community to share notes, ask questions, and enhance your learning experience.
          </p>
          <div className="space-x-4">
            <Link
              href="#"
              className="bg-orange-400 text-black px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Join
            </Link>
            <Link
              href="#"
              className="border border-gray-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:text-orange-400 hover:border-orange-400"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Image
            className="rounded-xl transition-all duration-300 hover:brightness-110 hover:scale-[1.01]"
            src="/group.jpg"
            width={700}
            height={350}
            alt="Student discussion"
          />
        </div>
      </section>

      {/* Features Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-purple-200 text-black text-center relative px-4 sm:px-10">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Join our student platform today!</h2>
          <p className="mb-6 text-lg">Connect with other students, share notes, and excel in your studies.</p>
          <Link
            href="#"
            className="bg-orange-400 text-black px-6 py-3 rounded-md font-semibold transition-transform duration-300 hover:scale-105 shadow"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Feature Section */}
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

      {/* Testimonials */}
      <section className="bg-white text-black py-20 px-4 sm:px-10">
        <h2 className="text-3xl font-bold text-center mb-10">Student Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          {[
            { name: "Alice Johnson", role: "Student, University", quote: "I found the notes I needed for my exams easily." },
            { name: "Mark Smith", role: "Graduate, College", quote: "Engaging with peers has made learning so much easier!" },
            { name: "Emma Brown", role: "Undergraduate, Institute", quote: "The discussions here are insightful and motivating!" },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <p className="text-xl font-semibold mb-2 text-yellow-500">★★★★★</p>
              <p className="mb-4 italic">"{t.quote}"</p>
              <div className="font-medium">{t.name}</div>
              <div className="text-gray-500 text-sm">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
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

      {/* Footer */}
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
              <li><Link href="#" className="hover:text-orange-400 transition-colors">Upload Notes</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">Download Notes</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">Ask Questions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Community</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="#" className="hover:text-orange-400 transition-colors">Discussion Forum</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">Study Groups</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">Blog Posts</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">More</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="#" className="hover:text-orange-400 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">User Feedback</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-xs border-t border-gray-700 pt-4">
          © 2025 Educate. All rights reserved. | <Link href="#" className="hover:text-orange-400">Privacy Policy</Link> | <Link href="#" className="hover:text-orange-400">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
