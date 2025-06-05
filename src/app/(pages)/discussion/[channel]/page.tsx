"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs"; // ✅ Clerk hook for client-side auth

interface Post {
  id: string;
  author: string;
  question: string;
  replies: { id: string; text: string; author: string }[];
}

export default function ChannelDiscussion() {
  const { channel } = useParams();
  const { isSignedIn, user } = useUser(); // ✅ user object from Clerk
  const [posts, setPosts] = useState<Post[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchPosts(channel: string) {
    if (!isSignedIn) return; // ⛔ Don't fetch if not signed in
    const res = await axios.get(`/api/discussion/${channel}`);
    setPosts(res.data.posts);
  }

  const handleAsk = async () => {
    if (!isSignedIn || !question.trim()) return;
    setLoading(true);
    await axios.post(`/api/discussion/${channel}`, {
      author: user?.firstName || "User",
      question,
    });
    setQuestion("");
    await fetchPosts(channel as string);
    setLoading(false);
  };

  const handleReply = async (postId: string, text: string) => {
    if (!isSignedIn || !text.trim()) return;
    await axios.post(`/api/discussion/${channel}`, {
      postId,
      text,
      author: user?.firstName || "User",
    });
    await fetchPosts(channel as string);
  };

  useEffect(() => {
    if (channel && isSignedIn) {
      fetchPosts(channel as string);
    }
  }, [channel, isSignedIn]); // ✅ re-run when sign-in status changes

  if (!isSignedIn) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-gray-700 text-lg">
        Please sign in to view and participate in this discussion.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-hand">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Discussion Channel: <span className="capitalize">{channel}</span>
      </h2>

      {/* Ask Question Section */}
      <div className="bg-white p-4 rounded-xl shadow mb-8 border border-gray-200">
        <textarea
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-gray-800"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md font-semibold transition"
        >
          {loading ? "Posting..." : "Post Question"}
        </button>
      </div>

      {/* Posts */}
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`p-5 rounded-2xl mb-6 text-white shadow-lg transition-all border border-gray-100 ${cardColor(index)}`}
        >
          <p className="text-lg font-semibold mb-2">
            {post.author}: <span className="font-normal">{post.question}</span>
          </p>

          <div className="ml-4 space-y-2">
            {post.replies.map((r) => (
              <div
                key={r.id}
                className="bg-white/20 backdrop-blur-md rounded px-3 py-2 text-sm"
              >
                <strong>{r.author}:</strong> {r.text}
              </div>
            ))}
          </div>

          <ReplyInput onSubmit={(text) => handleReply(post.id, text)} />
        </div>
      ))}
    </div>
  );
}

function cardColor(index: number) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-400 text-black",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-rose-500",
  ];
  return colors[index % colors.length];
}

function ReplyInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <div className="mt-4 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your reply..."
        className="flex-1 p-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => {
          onSubmit(text);
          setText("");
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
      >
        Reply
      </button>
    </div>
  );
}
