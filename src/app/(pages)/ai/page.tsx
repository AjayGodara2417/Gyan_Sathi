// app/ai/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";

export default function AIAssistantPage() {
  const [task, setTask] = useState("quiz");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const res = await axios.post("/api/ai", { task, prompt });
      setResult(res.data.result);
    } catch (error: any) {
      setResult("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white font-hand">
      <h1 className="text-3xl mb-4 font-bold">AI Assistant</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-black border border-white p-6 rounded-lg mb-6"
      >
        <label className="block mb-4">
          Select Task:
          <select
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-black border border-white"
          >
            <option value="quiz">Quiz Generator</option>
            <option value="doubt">Doubt Solver</option>
            <option value="answer">Answer Checker</option>
          </select>
        </label>

        <label className="block mb-4">
          Your Prompt:
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            placeholder="Ask your question or give topic to generate quiz..."
            className="w-full mt-1 p-2 rounded bg-black border border-white"
            rows={4}
          ></textarea>
        </label>

        <button
          type="submit"
          className="bg-amber-700 w-full py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : "Run AI"}
        </button>
      </form>

      {result && (
        <div className="bg-gray-900 border border-white p-4 rounded-lg whitespace-pre-wrap">
          <h2 className="font-bold text-lg mb-2">Result:</h2>
          {result}
        </div>
      )}
    </div>
  );
}
