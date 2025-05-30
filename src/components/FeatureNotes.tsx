'use client';

import axios from 'axios';
import { Download, FileText } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Note {
  id: number;
  title: string;
  tag: string;
  description: string;
  date: string;
  file_url: string;
  hidden?: boolean;
}

export default function FeatureNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const res = await axios.get("/api/notes");
    setNotes(res.data.notes);
  };

  const handleDownload = async (url: string, title: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = title || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("download failed:", err);
      alert("Failed to download file.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="w-full px-4 sm:px-10 py-10 bg-amber-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-black">Featured Notes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes
          .filter((n) => !n.hidden)
          .slice(0, 6)
          .map((note) => {
            const fileType = note.file_url.split('.').pop()?.toLowerCase();
            const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileType || "");
            const isPDF = fileType === "pdf";

            return (
              <div
                key={note.id}
                className="bg-[#1a1a1a] border border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="w-full h-48 flex items-center justify-center bg-gray-900 border-b border-gray-800">
                  {isImage ? (
                    <Image
                      src={note.file_url}
                      alt="note preview"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  ) : isPDF ? (
                    <FileText className="text-green-400 w-12 h-12" />
                  ) : (
                    <span className="text-sm text-gray-500">Unknown File</span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white line-clamp-2">{note.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{note.description}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-300">
                    <span className="bg-gray-800 px-2 py-1 rounded-md">{note.tag}</span>
                    <span className="bg-gray-800 px-2 py-1 rounded-md">{new Date(note.date).toLocaleDateString()}</span>
                    <span className="bg-gray-800 px-2 py-1 rounded-md">{fileType?.toUpperCase()}</span>
                    </div>

                    <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDownload(note.file_url, note.title)}
                      className="group inline-flex items-center gap-1 text-sm text-orange-400 hover:text-white transition-colors"
                    >
                      <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      Download
                    </button>
                  </div>
                  </div>

                  
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
