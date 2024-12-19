import { useState } from "react";

const NoticesSection = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "New Semester Schedule",
      content: "Submit all syllabus updates by Friday.",
      uploadedAt: "2024-12-15 10:00 AM",
    },
    {
      id: 2,
      title: "Maintenance Notice",
      content: "Power outage expected on 2024-12-20. Plan accordingly.",
      uploadedAt: "2024-12-16 01:30 PM",
    },
  ]);
  const [newNotice, setNewNotice] = useState("");

  const handleAddNotice = () => {
    if (newNotice.trim()) {
      setNotices((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: `Notice ${prev.length + 1}`,
          content: newNotice,
          uploadedAt: new Date().toLocaleString(),
        },
      ]);
      setNewNotice("");
    }
  };

  const handleDeleteNotice = (id) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Notices</h2>

      {/* Add New Notice */}
      <div className="mb-6">
        <textarea
          value={newNotice}
          onChange={(e) => setNewNotice(e.target.value)}
          className="w-full h-24 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Write a new notice..."
        ></textarea>
        <button
          onClick={handleAddNotice}
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Add Notice
        </button>
      </div>

      {/* Notices List */}
      <ul className="space-y-4">
        {notices.map((notice) => (
          <li
            key={notice.id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-700">
                {notice.title}
              </h3>
              <p className="text-gray-600 mt-1">{notice.content}</p>
              <p className="text-sm text-gray-400 mt-2">{notice.uploadedAt}</p>
            </div>
            <button
              onClick={() => handleDeleteNotice(notice.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {notices.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No notices to display. Add a new notice above.
        </p>
      )}
    </div>
  );
};

export default NoticesSection;
