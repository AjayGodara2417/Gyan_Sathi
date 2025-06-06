"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface Post {
  id: string;
  author: string;
  question: string;
  replies: { id: string; text: string; author: string }[];
}

export default function ChannelDiscussion() {
  const { channel } = useParams();
  const { isSignedIn, user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async (channel: string) => {
    if (!isSignedIn) return;
    const res = await axios.get(`/api/discussion/${channel}`);
    setPosts(res.data.posts);
  }, [isSignedIn]);

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
  }, [channel, fetchPosts, isSignedIn]);

  if (!isSignedIn) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-gray-700 text-lg">
        Please sign in to view and participate in this discussion.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-gray-50 min-h-screen text-gray-800">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-800 capitalize">
        #{channel} Discussions
      </h2>

      {/* Ask Question */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-10">
        <textarea
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full h-24 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-800"
        />
        <div className="mt-4 text-right">
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg font-medium shadow"
          >
            {loading ? "Posting..." : "Post Question"}
          </button>
        </div>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet. Be the first to ask!</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-2xl mb-6 border border-gray-200 shadow-md transition-all"
          >
            <p className="text-lg font-semibold mb-2">
              {post.author} asked:
              <span className="block font-normal text-gray-700 mt-1">{post.question}</span>
            </p>

            <div className="ml-4 mt-4 space-y-3">
              {post.replies.map((r) => (
                <div
                  key={r.id}
                  className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm"
                >
                  <strong className="text-blue-700">{r.author}</strong>: {r.text}
                </div>
              ))}
            </div>

            <ReplyInput onSubmit={(text) => handleReply(post.id, text)} />
          </div>
        ))
      )}
    </div>
  );
}

function ReplyInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <div className="mt-5 flex gap-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        className="flex-1 p-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={() => {
          onSubmit(text);
          setText("");
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow"
      >
        Reply
      </button>
    </div>
  );
}
