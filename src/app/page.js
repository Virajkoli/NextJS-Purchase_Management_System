"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (!session) {
      // If no session, redirect to sign-in page
      router.push("/signin");
    } else {
      // Redirect based on user role

      router.push("/dashboard")
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loading state while session is being fetched
  }

  return <div>Welcome to the Dashboard!</div>; // Default fallback if no redirection
};

export default Home;
