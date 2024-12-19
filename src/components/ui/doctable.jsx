"use client";
import RejectionModal from "./RejectionModel";
export default function DocumentsTable({
  documents,
  handleApproval,
  handleRejection,
  handleResetApproval,
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Documents</h2>
      <div className="overflow-x-auto shadow rounded">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left bg-gray-200">Title</th>
              <th className="py-3 px-4 text-left bg-gray-200">Uploaded By</th>
              <th className="py-3 px-4 text-left bg-gray-200">Department</th>
              <th className="py-3 px-4 text-left bg-gray-200">Uploaded At</th>
              <th className="py-3 px-4 text-left bg-gray-200">Status</th>
              <th className="py-3 px-4 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b">
                <td className="py-3 px-4">{doc.title}</td>
                <td className="py-3 px-4">{doc.uploadedBy}</td>
                <td className="py-3 px-4">{doc.department}</td>
                <td className="py-3 px-4">{doc.uploadedAt}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      doc.status === "pending"
                        ? "bg-yellow-500"
                        : doc.status === "approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2 items-center">
                  {doc.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleApproval(doc.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Approve
                      </button>
                      <RejectionModal
                        docId={doc.id}
                        handleRejection={handleRejection}
                      />
                    </>
                  ) : (
                    <button
                      onClick={() => handleResetApproval(doc.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      Reset
                    </button>
                  )}
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
