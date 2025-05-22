"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";

interface Note {
  id: number;
  title: string;
  tag: string;
  description: string;
  date: string;
  file_url: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      setFormData({
        title: "",
        tag: "",
        description: "",
        date: "",
        fileUrl: "",
      });
      fetchNotes(); // Refresh list
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
    <div className="max-w-2xl mx-auto p-6 text-white font-hand">
      <form
        onSubmit={handleSubmit}
        className="bg-black border border-white p-6 rounded-lg"
      >
        <h2 className="text-center text-xl mb-6">Upload Notes</h2>

        <label className="block mb-3">
          Title:
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter Title"
            className="w-full mt-1 p-2 rounded bg-black border border-white"
          />
        </label>

        <label className="block mb-3">
          Tag:
          <select
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 rounded bg-black border border-white"
          >
            <option value="">Select Tag</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="block mb-3">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 rounded bg-black border border-white"
          />
        </label>

        <label className="block mb-3">
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 rounded bg-black border border-white"
          />
        </label>

        <label className="block mb-4">
          Select File:
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!}
            onSuccess={handleUploadSuccess}
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded"
          />
        </label>

        <button
          type="submit"
          disabled={uploading || !formData.fileUrl}
          className="bg-amber-700 w-full py-2 rounded disabled:opacity-50"
        >
          {uploading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Show uploaded notes */}
      {/* Search Bar */}
<div className="mt-12 mb-4 flex justify-between items-center border border-white p-3 rounded-lg">
  <h2 className="text-xl font-bold">Gyan Saathi</h2>
  <div className="flex items-center gap-2 bg-blue-900 px-4 py-2 rounded-md w-full max-w-md">
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
      className="bg-transparent outline-none w-full text-white placeholder:text-white"
    />
    <span>🔍</span>
  </div>
</div>

{/* Notes Grid */}
<div className="bg-[#111] border border-white rounded-lg overflow-hidden">
  {notes
    .filter((n) => !n.hidden)
    .map((note) => {
      const fileType = note.file_url.split('.').pop()?.toLowerCase();
      const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileType || "");
      const isPDF = fileType === "pdf";

      return (
        <div
          key={note.id}
          className="flex items-center justify-between border-t border-white p-4"
        >
          {/* Thumbnail */}
          <div className="w-[80px] h-[80px] bg-black border border-green-500 text-green-400 flex items-center justify-center rounded-md">
            {isImage ? (
              <img
                src={note.file_url}
                alt="thumbnail"
                className="w-full h-full object-cover rounded-md"
              />
            ) : isPDF ? (
              <span className="text-sm">PDF</span>
            ) : (
              <span className="text-sm">File</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 ml-4 text-white space-x-6 text-sm md:text-base">
            <span>● <b>{note.title}</b></span>
            <span>{new Date(note.date).toISOString().split('T')[0]}</span>

            <span>{note.tag}</span>
            <span>{fileType?.toUpperCase()}</span>
          </div>

          {/* Download Button */}
          <a
            href={note.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-600 border-2 border-blue-300"
          >
            Download
          </a>
        </div>
      );
    })}
</div>

    </div>
  );
}
