"use client";

import DocumentTracker from "@/components/docProgress/documentProgress";
import NoticesSection from "@/components/ui/notice";
import SideProfile from "@/components/ui/profile";
import DocumentsTable from "@/components/ui/doctable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OSDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session || session.user.role !== "Principal") {
    router.push("/unauthorized"); // Redirect unauthorized users
    return null;
  }

  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    password: "",
    otp: "",
  });

  const principalName = session?.user?.name || "Dr.Suhas Gajre";

  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Budget Report",
      uploadedBy: "Registrar",
      department: "Computer",
      status: "pending",
      remarks: "",
      url: "/documents/budget-report.pdf",
      uploadedAt: "2024-06-14 10:30 AM",
    },
    {
      id: 2,
      title: "Expenditure Report",
      uploadedBy: "Registrar",
      department: "Electronics",
      status: "approved",
      remarks: "",
      url: "/documents/expenditure-report.pdf",
      uploadedAt: "2024-06-13 03:45 PM",
    },
  ]);

  const handleApproval = async (id) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: "approved" } : doc))
    );
  };

  const handleRejection = async (id, remarks) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, status: "rejected", remarks } : doc
      )
    );
  };

  const handleResetApproval = (id) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, status: "pending", remarks: "" } : doc
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Side Panel */}
      <SideProfile
        formData={formData}
        setFormData={setFormData}
        session={session}
      ></SideProfile>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {/* Header */}
        <div className="p-6 bg-gray-200 rounded-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6 ">
            <h1 className="text-3xl font-bold text-gray-800">
              Principal Dashboard
            </h1>
            <p className="text-lg font-medium text-gray-600">
              Welcome, {principalName}
            </p>
          </div>

          {/* Documents Table */}
          <DocumentsTable
            documents={documents}
            handleApproval={handleApproval}
            handleRejection={handleRejection}
            handleResetApproval={handleResetApproval}
          />
        </div>

        {/* Notices Section */}
        <div className="mt-6">
          <NoticesSection />
        </div>
        <DocumentTracker></DocumentTracker>
      </div>
    </div>
  );
}
