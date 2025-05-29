"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Copy, RefreshCcw } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface ChatHistory {
  id: number;
  task: string;
  prompt: string;
  response: string;
  created_at: string;
}

export default function AIAssistantPage() {
  const [task, setTask] = useState("quiz");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<ChatHistory[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatHistory | null>(null);
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) return;
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/api/ai/history");
        setHistory(res.data.history);
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };
    fetchHistory();
  }, [isSignedIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const res = await axios.post("/api/ai", { task, prompt });
      setResult(res.data.result);
      setHistory((prev) => [
        { id: Date.now(), task, prompt, response: res.data.result, created_at: new Date().toISOString() },
        ...prev
      ]);
    } catch (error: any) {
      setResult("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    alert("Result copied to clipboard!");
  };

  const handleReset = () => {
    setPrompt("");
    setResult("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Sidebar */}
      <div className="w-72 bg-[#111] border-r border-gray-800 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Past Conversations</h2>
        {history.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="w-full text-left px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 mb-2"
          >
            <div className="font-semibold text-sm truncate">{chat.task.toUpperCase()}</div>
            <div className="text-xs text-gray-400 truncate">{chat.prompt}</div>
            <div className="text-xs text-gray-500 mt-1">{new Date(chat.created_at).toLocaleString()}</div>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-[#121212] border border-gray-800 p-8 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-8 tracking-tight text-orange-500">
            AI Assistant
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-1">Select Task</label>
              <select
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-orange-500 focus:outline-none"
              >
                <option value="quiz">Quiz Generator</option>
                <option value="doubt">Doubt Solver</option>
                <option value="answer">Answer Checker</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Your Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                placeholder="Ask a question or enter a topic..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold bg-orange-600 hover:bg-orange-500 active:bg-orange-700 disabled:opacity-60"
              >
                {loading ? "Processing..." : "Run AI"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-2"
              >
                <RefreshCcw size={18} /> Reset
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-8 bg-gray-900 border border-gray-700 rounded-xl p-5 relative max-h-[320px] overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-orange-400">Result</h2>
                <button
                  onClick={handleCopy}
                  className="text-sm flex items-center gap-1 text-orange-300 hover:text-orange-500"
                >
                  <Copy size={16} /> Copy
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-sm font-mono text-gray-100">
                {result}
              </pre>
            </div>
          )}

          {/* Show selected history result if user clicks a past chat */}
          {selectedChat && !result && (
            <div className="mt-8 bg-gray-900 border border-gray-700 rounded-xl p-5">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-orange-400">Prompt</h2>
                <p className="text-gray-300">{selectedChat.prompt}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-orange-400">AI Response</h2>
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-100">
                  {selectedChat.response}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}