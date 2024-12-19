"use client";

import NoticesSection from "@/components/ui/notice";
import { useState } from "react";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("file", formData.file);

    const res = await fetch("/api/documents/upload", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      alert("Document uploaded successfully!");
    } else {
      alert("Failed to upload document");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Purchase Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          accept="application/pdf"
          className="w-full p-2 border rounded"
          onChange={handleFileChange}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Upload
        </button>
      </form>

      <NoticesSection></NoticesSection>
    </div>
  );
};

export default Dashboard;
