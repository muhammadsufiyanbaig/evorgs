"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VendorLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main login page
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to login...</p>
    </div>
  );
}
