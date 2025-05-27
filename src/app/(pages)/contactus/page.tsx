import React from "react";

export default function ContactPage() {
  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-20 py-16 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg mb-10 text-gray-300">
          If you have any questions or need assistance, feel free to reach out to us.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition duration-200 text-white font-semibold py-3 px-6 rounded-xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
