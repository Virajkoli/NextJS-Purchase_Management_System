"use client";
import { useState } from "react";

export default function RejectionModal({ docId, handleRejection }) {
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState("");

  const submitRejection = () => {
    handleRejection(docId, remarks);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Reject
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Reject Document</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              placeholder="Enter rejection remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
