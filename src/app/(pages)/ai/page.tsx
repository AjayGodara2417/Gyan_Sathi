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
  const [isHistorybarOpen, setIsHistorybarOpen] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isHistorybarOpen && window.innerWidth < 768) {
        const historybar = document.getElementById('historybar');
        if (historybar && !historybar.contains(event.target as Node)) {
          setIsHistorybarOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isHistorybarOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      alert("Please sign in to use AI features.");
      return;
    }
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
    } catch (error) {
      console.error("AI processing error:", error);
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
    <div className="flex flex-col md:flex-row bg-[#F6FDF8] text-gray-900 relative">
      <button
        onClick={() => setIsHistorybarOpen(!isHistorybarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-300 shadow hover:bg-gray-100"
        aria-label="Toggle historybar"
      >
        {isHistorybarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        id="historybar"
        className={`fixed md:static w-64 bg-white border-r border-gray-200 p-4 md:p-6 space-y-6 z-40 transition-transform duration-300 ease-in-out ${
          isHistorybarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } h-full md:h-auto overflow-y-auto`}
      >
        <h2 className="text-xl font-bold mb-4">History</h2>
        <div className="space-y-3">
          {history.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat);
                if (window.innerWidth < 768) setIsHistorybarOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-lg bg-gray-100 hover:bg-green-100 transition border border-gray-200"
            >
              <div className="font-semibold text-sm truncate text-green-700">
                {chat.task.toUpperCase()}
              </div>
              <div className="text-xs text-gray-600 truncate">{chat.prompt}</div>
              <div className="text-[11px] text-gray-500 mt-1">
                {new Date(chat.created_at).toLocaleString()}
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 px-6 md:px-10 py-10 w-full">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="task-select" className="block text-lg font-semibold mb-2">
                Select Task
              </label>
              <select
                id="task-select"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full p-3 rounded-md border border-green-300 focus:ring-2 focus:ring-green-400"
              >
                <option value="quiz">Quiz Generator</option>
                <option value="doubt">Doubt Solver</option>
                <option value="answer">Answer Checker</option>
              </select>
            </div>

            <div>
              <label htmlFor="prompt-input" className="block text-lg font-semibold mb-2">
                Your Prompt
              </label>
              <textarea
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                placeholder="Ask a question or enter a topic..."
                rows={5}
                className="w-full p-4 rounded-md border border-green-300 focus:ring-2 focus:ring-green-400 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md font-semibold bg-green-500 text-white hover:bg-green-600 transition"
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
                className="w-full py-3 rounded-md font-semibold bg-gray-200 hover:bg-gray-300 transition"
              >
                <RefreshCcw size={18} className="inline-block mr-2" /> Reset
              </button>
            </div>
          </form>

          {(result || selectedChat) && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-green-600">
                  {selectedChat ? selectedChat.task : task}
                </h2>
                {result && (
                  <button
                    onClick={handleCopy}
                    className="text-sm text-green-700 hover:text-green-900 flex items-center gap-1"
                  >
                    <Copy size={16} /> Copy
                  </button>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Prompt</p>
                <pre className="text-sm bg-white border border-green-100 p-3 rounded whitespace-pre-wrap">
                  {selectedChat ? selectedChat.prompt : prompt}
                </pre>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">AI Response</p>
                <pre className="text-sm bg-white border border-green-100 p-3 rounded whitespace-pre-wrap">
                  {selectedChat ? selectedChat.response : result}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>

      {isHistorybarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsHistorybarOpen(false)}
        />
      )}
    </div>
  );
}