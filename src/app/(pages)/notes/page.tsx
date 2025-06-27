"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { FileText, Download, Plus, X } from "lucide-react";
import Image from "next/image";

interface Note {
  id: number;
  title: string;
  tag: string;
  description: string;
  date: string;
  file_url: string;
  hidden?: boolean;
}

export default function NotesPage() {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    description: "",
    date: "",
    fileUrl: "",
  });
  const [uploading, setUploading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleUploadSuccess = (result: any) => {
    if (result.event === "success") {
      setFormData((prev) => ({ ...prev, fileUrl: result.info.secure_url }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchNotes = async () => {
    const res = await axios.get("/api/notes");
    setNotes(res.data.notes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      await axios.post("/api/notes", formData);
      alert("Note uploaded successfully!");
      setFormData({ title: "", tag: "", description: "", date: "", fileUrl: "" });
      fetchNotes();
      setShowModal(false);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please sign in to continue.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen max-w-full bg-gray-50 px-8 py-2 md:py-10 text-gray-900">

      {/* Heading and Upload Button */}
      <div className="flex flex-col gap-2 sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          <Plus className="w-4 h-4" />
          Upload Notes
        </button>
      </div>

      {/* Search and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search notes"
          onChange={(e) => {
            const val = e.target.value.toLowerCase();
            setNotes((prev) =>
              prev.map((note) => ({
                ...note,
                hidden: !note.title.toLowerCase().includes(val),
              }))
            );
          }}
          className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Tabs */}
        {/* <div className="flex space-x-4 text-sm font-medium border-b w-full sm:w-auto">
          {["All", "My Notes", "Saved"].map((tab, i) => (
            <button
              key={i}
              className={`pb-2 border-b-2 transition ${
                i === 0 ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-green-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div> */}
      </div>

      {/* Popular Notes */}
      <h2 className="mt-12 text-lg font-semibold mb-3">Popular Notes</h2>
      <div className="mb-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="flex overflow-x-auto space-x-4 pb-2">
          {notes.slice(0, 5).map((note) => (
            <NoteCard key={note.id} note={note} horizontal />
          ))}
        </div>
      </div>

      {/* All Notes */}
      <div>
        <h2 className="text-lg font-semibold mb-3">All Notes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {notes.filter((n) => !n.hidden).map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-xl p-6 relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">Upload Notes</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter title"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select Tag</option>
                <option value="Maths">Maths</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Description..."
                rows={3}
                className="w-full p-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <div className="flex items-center gap-4">
                <CldUploadButton
                  uploadPreset="gyansathinext"
                  onSuccess={handleUploadSuccess}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                />
                {formData.fileUrl && (
                  <span className="text-green-500 text-sm">File ready</span>
                )}
              </div>
              <button
                type="submit"
                disabled={uploading || !formData.fileUrl}
                className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-50"
              >
                {uploading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ⬇️ Note Card Component
function NoteCard({ note, horizontal = false }: { note: Note; horizontal?: boolean }) {
  const fileType = note.file_url.split('.').pop()?.toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileType || "");
  const isPDF = fileType === "pdf";

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
      alert("Failed to download file");
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm transition hover:shadow-md flex ${
        horizontal ? "min-w-[220px] max-w-[220px] flex-col" : "flex-col"
      }`}
    >
      <div className="w-full h-[120px] bg-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden">
        {isImage ? (
          <Image
            src={note.file_url}
            alt="note preview"
            width={300}
            height={120}
            className="object-cover w-full h-full"
          />
        ) : isPDF ? (
          <FileText className="w-6 h-6 text-green-500" />
        ) : (
          <span className="text-xs text-gray-400">File</span>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <p className="font-semibold text-sm mb-1 truncate">{note.title}</p>
        <p className="text-xs text-gray-500 mb-2">By {note.tag || "Anonymous"}</p>

        <button
          onClick={() => handleDownload(note.file_url, note.title)}
          className="text-green-600 hover:text-green-800 text-xs font-medium mt-auto text-start"
        >
          <Download className="inline-block w-4 h-4 mr-1" /> Download
        </button>
      </div>
    </div>
  );
}
