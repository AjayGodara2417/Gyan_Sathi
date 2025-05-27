import React from 'react'

export default function Testimonial() {
  return (
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
  )
}
