"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NoticesSection from "@/components/ui/notice";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Always call hooks first
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Semester Schedule",
      content: "Please submit all syllabus by the end of this week.",
      uploadedAt: new Date().toLocaleString(),
    },
  ]);

  const [newNotice, setNewNotice] = useState(""); // For creating new notice

  // Add notice
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

  if (status === "loading") return <p>Loading...</p>;

  if (!session || session.user.role !== "admin") {
    router.push("/unauthorized"); // Redirect unauthorized users
    return null;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-gray-800">
          Hello Superadmin!
        </h1>
        <Link
          href={"/dashboard/admin/addUser"}
          className="text-lg px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Add User
        </Link>
      </header>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {/* Card Template */}
        <div className="p-5 bg-white shadow rounded-lg text-center">
          <h3 className="text-xl font-medium text-gray-700">Total Admins</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
        </div>
        <div className="p-5 bg-white shadow rounded-lg text-center">
          <h3 className="text-xl font-medium text-gray-700">
            Recent Activities
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">45</p>
        </div>
        <div className="p-5 bg-white shadow rounded-lg text-center">
          <h3 className="text-xl font-medium text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">120</p>
        </div>
        <div className="p-5 bg-white shadow rounded-lg text-center">
          <h3 className="text-xl font-medium text-gray-700">Notices</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">8</p>
        </div>
      </section>

      {/* Table and Functionalities */}
      <section>
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Recent Activities
          </h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Upload Notice
          </button>
        </div>
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-700">
              <th className="py-3 px-4 text-left">Action</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4">Added a New User</td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">Admin</td>
              <td className="py-2 px-4">2024-06-01 10:30 AM</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4">Deleted User</td>
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">User</td>
              <td className="py-2 px-4">2024-06-01 11:00 AM</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4">Uploaded Notice</td>
              <td className="py-2 px-4">SuperAdmin</td>
              <td className="py-2 px-4">Superadmin</td>
              <td className="py-2 px-4">2024-06-02 02:15 PM</td>
            </tr>
          </tbody>
        </table>
      </section>

      <NoticesSection></NoticesSection>

      {/* Manage Admins & Roles */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Admins & Roles</h2>
        <div className="flex gap-4">
          <Link
            href="/dashboard/superadmin/manageAdmins"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Manage Admins
          </Link>
          <Link
            href="/dashboard/superadmin/roles"
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            Add/Modify Roles
          </Link>
        </div>
      </section>
    </div>
  );
}
