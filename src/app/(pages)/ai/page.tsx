"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Copy, RefreshCcw, Menu, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface ChatHistory {
  id: number;
  task: string;
  prompt: string;
  response: string;
  created_at: string;
}

export default function AIPage() {
  const [task, setTask] = useState("quiz");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<ChatHistory[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatHistory | null>(null);
  const { isSignedIn } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen && window.innerWidth < 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

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
    } catch (error: unknown) {
      console.error("AI processing error:", error);
      // setResult("Error: " + (error.response?.data?.message || error.message));
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
    <div className="flex min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed md:static w-[280px] md:w-80 bg-[#121212] border-r border-gray-800 p-4 md:p-6 space-y-6 h-full z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-2rem)] pr-1 custom-scrollbar">
          {history.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
      <main className="flex-1 px-4 md:px-8 py-6 md:py-10 w-full md:ml-0">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="space-y-2">
              <label htmlFor="task-select" className="block font-semibold text-lg">
                Select Task
              </label>
              <select
                id="task-select"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full p-3 rounded-md bg-black border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition"
                aria-label="Select AI task"
              >
                <option value="quiz">Quiz Generator</option>
                <option value="doubt">Doubt Solver</option>
                <option value="answer">Answer Checker</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="prompt-input" className="block font-semibold text-lg">
                Your Prompt
              </label>
              <textarea
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                placeholder="Ask a question or enter a topic..."
                rows={6}
                className="w-full p-4 rounded-md bg-black border border-gray-700 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none resize-none transition"
                aria-label="Enter your prompt"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold bg-orange-600 hover:bg-orange-500 transition disabled:opacity-60 focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:cursor-not-allowed"
                aria-label={loading ? "Processing request" : "Run AI"}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCcw className="animate-spin" size={18} />
                    Processing...
                  </span>
                ) : (
                  "Run AI"
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-2 transition focus:ring-2 focus:ring-gray-500 focus:outline-none"
                aria-label="Reset form"
              >
                <RefreshCcw size={18} /> Reset
              </button>
            </div>
          </form>

          {/* AI Output */}
          {(result || selectedChat) && (
            <div className="mt-8 md:mt-10 bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 md:p-6 shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-bold text-orange-400">
                  {selectedChat ? selectedChat.task : task}
                </h2>
                {result && (
                  <button
                    onClick={handleCopy}
                    className="text-sm flex items-center gap-1 text-orange-300 hover:text-orange-500 transition focus:ring-2 focus:ring-orange-500 focus:outline-none rounded-md px-2 py-1"
                    aria-label="Copy response"
                  >
                    <Copy size={16} /> Copy
                  </button>
                )}
              </div>
              <div className="mb-4 md:mb-3">
                <p className="text-gray-400 mb-1 font-medium">Prompt</p>
                <pre className="text-sm bg-black/30 p-3 md:p-4 rounded-lg whitespace-pre-wrap overflow-x-auto custom-scrollbar">
                  {selectedChat ? selectedChat.prompt : prompt}
                </pre>
              </div>
              <div>
                <p className="text-gray-400 mb-1 font-medium">AI Response</p>
                <pre className="text-sm bg-black/30 p-3 md:p-4 rounded-lg whitespace-pre-wrap overflow-x-auto custom-scrollbar">
                  {selectedChat ? selectedChat.response : result}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}