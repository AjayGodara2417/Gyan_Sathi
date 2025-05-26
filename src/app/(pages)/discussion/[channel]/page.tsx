// app/discussion/[channel]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Post {
  id: string;
  author: string;
  question: string;
  replies: { id: string; text: string; author: string }[];
}

export default function ChannelDiscussion() {
  const { channel } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const res = await axios.get(`/api/discussion/${channel}`);
    setPosts(res.data.posts);
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    await axios.post(`/api/discussion/${channel}`, {
      author: "Student",
      question,
    });
    
    setQuestion("");
    fetchPosts();
    setLoading(false);
  };

  const handleReply = async (postId: string, text: string) => {
    if (!text.trim()) return;
    await axios.post(`/api/discussion/${channel}`, {
      postId,
      text,
      author: "User",
    });
    
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, [channel]);

  return (
    <div className="max-w-3xl mx-auto p-6 text-white font-hand">
      <h2 className="text-2xl font-bold mb-4 capitalize">Channel: {channel}</h2>

      <div className="mb-6">
        <textarea
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 rounded bg-black border border-white mb-2"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-amber-700 py-2 px-4 rounded"
        >
          {loading ? "Posting..." : "Post Question"}
        </button>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="bg-black border border-white p-4 rounded mb-6">
          <p className="text-lg mb-2 font-semibold">{post.author}: {post.question}</p>
          <div className="space-y-2 ml-4">
            {post.replies.map((r) => (
              <p key={r.id} className="text-sm">{r.author}: {r.text}</p>
            ))}
          </div>
          <ReplyInput onSubmit={(text) => handleReply(post.id, text)} />
        </div>
      ))}
    </div>
  );
}

function ReplyInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <div className="mt-3 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your reply..."
        className="flex-1 p-2 rounded bg-gray-800 border border-white"
      />
      <button
        onClick={() => {
          onSubmit(text);
          setText("");
        }}
        className="bg-blue-700 px-3 py-1 rounded"
      >
        Reply
      </button>
    </div>
  );
}
