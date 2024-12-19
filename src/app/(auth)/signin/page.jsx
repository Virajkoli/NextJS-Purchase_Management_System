"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent default redirect
        username,
        password,
      });

      if (result.error) {
        console.error("Login failed:", result.error);
        alert("Login failed: " + result.error);
        setLoading(false);
        return;
      }

      // Fetch session to get user role
      const session = await fetch("/api/auth/session").then((res) =>
        res.json()
      );
      console.log("Session:", session); // Debugging to check session contents

      const roleRoutes = {
        admin: "/dashboard/admin",
        hod: "/dashboard/hod",
        os: "/dashboard/os",
        registrar: "/dashboard/registrar",
        principal: "/dashboard/principal",
      };

      const userRole = session?.user?.role;

      if (userRole && roleRoutes[userRole]) {
        window.location.href = roleRoutes[userRole]; // Redirect to specific role route
      } else {
        console.warn("Unknown role, redirecting to default dashboard");
        window.location.href = "/dashboard"; // Default fallback
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4 animate-fade-in">
          Welcome to Purchase Management System
        </h1>
        <p className="text-xs py-4 px-8">
          Please login to your account , by entering your credentials
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 bg-blue-600 hover:bg-blue-700 ${
              loading ? "cursor-not-allowed opacity-75" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-in-out;
        }
      `}</style>
    </div>
  );
}
