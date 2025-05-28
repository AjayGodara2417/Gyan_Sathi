"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { FileText, Download } from "lucide-react";

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
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">
      {/* Upload Form */}
      <div className="max-w-2xl mx-auto bg-[#121212] p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">Upload Notes</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter title"
            className="w-full p-3 rounded-lg bg-black border border-gray-700 placeholder-gray-400 focus:border-orange-500 focus:outline-none"
          />
          <select
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-orange-500 focus:outline-none"
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
            rows={4}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
          />

          <div className="flex items-center gap-4">
            <CldUploadButton
              uploadPreset="gyansathinext"
              onSuccess={handleUploadSuccess}
              className="bg-blue-500 hover:bg-blue-600 hover:px-5 hover:py-3 text-white px-4 py-2 rounded-lg transition-all"
            />
            {formData.fileUrl && <span className="text-green-400 text-sm">File ready</span>}
          </div>

          <button
            type="submit"
            disabled={uploading || !formData.fileUrl}
            className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold transition disabled:opacity-60"
          >
            {uploading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Notes List */}
      <div className="max-w-4xl mx-auto mt-12">
        {/* Search Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Gyan Saathi</h2>
          <div className="flex items-center bg-blue-900 rounded-lg px-4 py-2 w-full max-w-md">
            <input
              type="text"
              placeholder="Search by title..."
              onChange={(e) => {
                const val = e.target.value.toLowerCase();
                setNotes((prev) =>
                  prev.map((note) => ({
                    ...note,
                    hidden: !note.title.toLowerCase().includes(val),
                  }))
                );
              }}
              className="bg-transparent outline-none w-full text-white placeholder:text-gray-300"
            />
            <span className="ml-2">🔍</span>
          </div>
        </div>

        <div className="space-y-4">
          {notes.filter((n) => !n.hidden).map((note) => {
            const fileType = note.file_url.split('.').pop()?.toLowerCase();
            const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileType || "");
            const isPDF = fileType === "pdf";

            return (
              <div
                key={note.id}
                className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-md overflow-hidden bg-gray-800 border border-green-500">
                  {isImage ? (
                    <img src={note.file_url} alt="note preview" className="w-full h-full object-cover" />
                  ) : isPDF ? (
                    <FileText className="text-green-400 w-8 h-8" />
                  ) : (
                    <span className="text-xs text-gray-400">File</span>
                  )}
                </div>

                <div className="flex-1 text-sm md:text-base space-y-1">
                  <p className="font-semibold text-white">{note.title}</p>
                  <div className="flex flex-wrap gap-4 text-gray-400">
                    <span>{new Date(note.date).toLocaleDateString()}</span>
                    <span>{note.tag}</span>
                    <span>{fileType?.toUpperCase()}</span>
                  </div>
                </div>

                <a
                  href={note.file_url}
                  
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg text-white text-sm transition"
                >
                  <Download size={16} /> Download
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
