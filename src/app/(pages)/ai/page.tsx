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
        {
          id: Date.now(),
          task,
          prompt,
          response: res.data.result,
          created_at: new Date().toISOString(),
        },
        ...prev,
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
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-80 bg-[#121212] border-r border-gray-800 p-6 space-y-6">
        
        <div className="space-y-3 overflow-y-auto max-h-[80vh] pr-1">
          {history.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="w-full text-left px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
            >
              <div className="font-semibold text-sm truncate text-white">
                {chat.task.toUpperCase()}
              </div>
              <div className="text-xs text-gray-400 truncate">{chat.prompt}</div>
              <div className="text-[11px] text-gray-500 mt-1">
                {new Date(chat.created_at).toLocaleString()}
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 px-8 py-10">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-semibold text-lg">Select Task</label>
              <select
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full p-3 rounded-md bg-black border border-gray-700 focus:border-orange-500 outline-none"
              >
                <option value="quiz">Quiz Generator</option>
                <option value="doubt">Doubt Solver</option>
                <option value="answer">Answer Checker</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-semibold text-lg">Your Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                placeholder="Ask a question or enter a topic..."
                rows={6}
                className="w-full p-4 rounded-md bg-black border border-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold bg-orange-600 hover:bg-orange-500 transition disabled:opacity-60"
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

          {/* AI Output */}
          {(result || selectedChat) && (
            <div className="mt-10 bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-orange-400">
                  {selectedChat ? selectedChat.task : task}
                </h2>
                {result && (
                  <button
                    onClick={handleCopy}
                    className="text-sm flex items-center gap-1 text-orange-300 hover:text-orange-500"
                  >
                    <Copy size={16} /> Copy
                  </button>
                )}
              </div>
              <div className="mb-3">
                <p className="text-gray-400 mb-1 font-medium">Prompt</p>
                <pre className="text-sm bg-black/30 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedChat ? selectedChat.prompt : prompt}
                </pre>
              </div>
              <div>
                <p className="text-gray-400 mb-1 font-medium">AI Response</p>
                <pre className="text-sm bg-black/30 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedChat ? selectedChat.response : result}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
