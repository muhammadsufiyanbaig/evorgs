"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

/**
 * Debug component to verify authentication token is properly set
 * Add this to your page temporarily to debug auth issues
 * 
 * Usage:
 * import { AuthDebugPanel } from "@/components/AuthDebugPanel";
 * <AuthDebugPanel />
 */
export function AuthDebugPanel() {
  const auth = useAuth();
  const [localStorageToken, setLocalStorageToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          setLocalStorageToken(parsed.state?.token || null);
        }
      } catch (error) {
        console.error('Failed to read token from localStorage:', error);
      }
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-orange-500 rounded-lg p-4 shadow-lg max-w-md z-50">
      <h3 className="font-bold text-orange-600 mb-2">🔍 Auth Debug Panel</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-semibold">Authenticated:</span>{" "}
          <span className={auth.isAuthenticated ? "text-green-600" : "text-red-600"}>
            {auth.isAuthenticated ? "✅ Yes" : "❌ No"}
          </span>
        </div>
        <div>
          <span className="font-semibold">User Type:</span>{" "}
          <span className="text-blue-600">{auth.userType || "None"}</span>
        </div>
        <div>
          <span className="font-semibold">User Name:</span>{" "}
          <span>{auth.user?.name || "N/A"}</span>
        </div>
        <div>
          <span className="font-semibold">Zustand Token:</span>{" "}
          <code className="text-xs bg-gray-100 p-1 rounded break-all">
            {auth.token ? `${auth.token.substring(0, 30)}...` : "❌ No token"}
          </code>
        </div>
        <div>
          <span className="font-semibold">localStorage Token:</span>{" "}
          <code className="text-xs bg-gray-100 p-1 rounded break-all">
            {localStorageToken ? `${localStorageToken.substring(0, 30)}...` : "❌ No token"}
          </code>
        </div>
        <div>
          <span className="font-semibold">Tokens Match:</span>{" "}
          <span className={auth.token === localStorageToken ? "text-green-600" : "text-red-600"}>
            {auth.token === localStorageToken ? "✅ Yes" : "❌ No"}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          console.log("Full Auth State:", auth);
          console.log("localStorage auth-storage:", localStorage.getItem('auth-storage'));
        }}
        className="mt-3 w-full bg-orange-600 text-white py-1 px-2 rounded text-sm hover:bg-orange-700"
      >
        Log Full State to Console
      </button>
    </div>
  );
}
