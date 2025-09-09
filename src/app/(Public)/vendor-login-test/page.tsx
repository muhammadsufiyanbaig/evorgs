"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export default function VendorLoginTestPage() {
  const { loginVendor, isLoading, error, isAuthenticated, userType } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [testResult, setTestResult] = useState<string>("");

  const handleTestLogin = async () => {
    setTestResult("Testing login...");
    try {
      await loginVendor({ vendorEmail: email, password });
      setTestResult("Login successful! Checking auth state...");
    } catch (err: any) {
      setTestResult(`Login failed: ${err.message}`);
    }
  };

  const testGraphQLConnection = async () => {
    setTestResult("Testing GraphQL connection...");
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              __typename
            }
          `
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestResult(`GraphQL connection successful: ${JSON.stringify(data)}`);
      } else {
        setTestResult(`GraphQL connection failed: ${response.status} ${response.statusText}`);
      }
    } catch (err: any) {
      setTestResult(`GraphQL connection error: ${err.message}`);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Vendor Login Test</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Vendor Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vendor@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={handleTestLogin} 
            disabled={isLoading || !email || !password}
            className="w-full"
          >
            {isLoading ? "Logging in..." : "Test Vendor Login"}
          </Button>
          
          <Button 
            onClick={testGraphQLConnection}
            variant="outline"
            className="w-full"
          >
            Test GraphQL Connection
          </Button>
        </div>
        
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
            Error: {error}
          </div>
        )}
        
        {testResult && (
          <div className="p-3 bg-blue-100 border border-blue-300 rounded text-blue-700 text-sm">
            {testResult}
          </div>
        )}
        
        <div className="p-3 bg-gray-100 rounded text-sm">
          <p><strong>Auth Status:</strong></p>
          <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p>User Type: {userType || 'None'}</p>
          <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}
