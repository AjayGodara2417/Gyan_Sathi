"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Page() {
  const [form, setForm] = useState({
    question: "",
    subject: "",
    topic: "",
    difficulty: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ASK_QUE!,
          form,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          alert("Question sent successfully!");
          setForm({ question: "", subject: "", topic: "", difficulty: "" });
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert("Failed to send question.");
        }
      );
  };

  return (
    <div className="bg-[#F6FDF8] text-gray-900 px-6 md:px-20 md:pt-24 font-sans">
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Ask a question</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="question"
              value={form.question}
              onChange={handleChange}
              placeholder="What's your question?"
              className="w-full border border-green-200 bg-white p-3 rounded-md placeholder:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-green-200 bg-white p-3 rounded-md text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select subject</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
            </select>
            <select
              name="topic"
              value={form.topic}
              onChange={handleChange}
              className="w-full border border-green-200 bg-white p-3 rounded-md text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select topic</option>
              <option value="Quantum Mechanics">Quantum Mechanics</option>
              <option value="Atomic Structure">Atomic Structure</option>
              <option value="Calculus">Calculus</option>
            </select>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="w-full border border-green-200 bg-white p-3 rounded-md text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md"
            >
              Ask
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Similar questions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">How does quantum entanglement...</p>
              <span className="text-green-600">Physics</span> <span className="text-gray-500">2d</span>
            </div>
            <div>
              <p className="font-medium">What are the properties of noble...</p>
              <span className="text-green-600">Chemistry</span> <span className="text-gray-500">3d</span>
            </div>
            <div>
              <p className="font-medium">Explain the concept of limits in...</p>
              <span className="text-green-600">Mathematics</span> <span className="text-gray-500">4d</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
