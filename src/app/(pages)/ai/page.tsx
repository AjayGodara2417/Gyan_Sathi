'use client';

import { useState } from 'react';
import axios from 'axios';
import { Copy, RefreshCcw } from 'lucide-react';

export default function AIAssistantPage() {
  const [task, setTask] = useState('quiz');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const res = await axios.post('/api/ai', { task, prompt });
      setResult(res.data.result);
    } catch (error: any) {
      setResult('Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    alert('Result copied to clipboard!');
  };

  const handleReset = () => {
    setPrompt('');
    setResult('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-[#121212] border border-gray-800 p-8 rounded-2xl shadow-2xl transition-all duration-300">
        <h1 className="text-4xl font-bold text-center mb-8 tracking-tight text-orange-500">
          AI Assistant
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Task */}
          <div>
            <label className="block font-semibold mb-1">Select Task</label>
            <select
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-orange-500 focus:outline-none transition-all duration-200"
            >
              <option value="quiz">Quiz Generator</option>
              <option value="doubt">Doubt Solver</option>
              <option value="answer">Answer Checker</option>
            </select>
          </div>

          {/* Prompt */}
          <div>
            <label className="block font-semibold mb-1">Your Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              placeholder="Ask a question or enter a topic..."
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-all duration-200 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold bg-orange-600 hover:bg-orange-500 active:bg-orange-700 transition-all duration-200 disabled:opacity-60 shadow-md"
            >
              {loading ? 'Processing...' : 'Run AI'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 transition duration-200 flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} /> Reset
            </button>
          </div>
        </form>

        {/* Output */}
        {result && (
          <div className="mt-8 bg-gray-900 border border-gray-700 rounded-xl p-5 relative max-h-[320px] overflow-auto group">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-orange-400">Result</h2>
              <button
                onClick={handleCopy}
                className="text-sm flex items-center gap-1 text-orange-300 hover:text-orange-500 transition"
              >
                <Copy size={16} /> Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm font-mono text-gray-100">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
