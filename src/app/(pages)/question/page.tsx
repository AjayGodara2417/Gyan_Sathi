import React from 'react'

export default function page() {
  return (
   <div className="bg-[#F6FDF8] text-gray-900 px-6 md:px-20 py-16 font-sans">
    {/* Ask a Question Section */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Ask Form */}
    <div className="md:col-span-2">
      <h2 className="text-2xl font-semibold mb-4">Ask a question</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="What's your question?"
          className="w-full border border-green-200 bg-white p-3 rounded-md placeholder:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <select className="w-full border border-green-200 bg-white p-3 rounded-md text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
          <option>Select subject</option>
        </select>
        <select className="w-full border border-green-200 bg-white p-3 rounded-md text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
          <option>Select topic</option>
        </select>
        <select className="w-full border border-green-200 bg-white p-3 rounded-md text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
          <option>Select difficulty</option>
        </select>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md">
          Ask
        </button>
      </div>
    </div>

    {/* Similar Questions */}
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
  )
}
