"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Facebook, Google } from "@/utils/Icons";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons
import Link from "next/link"; // Import Link for navigation

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [isClient, setIsClient] = useState(false); // Flag to check if it's client-side

  useEffect(() => {
    // Set isClient to true only after the component mounts on the client
    setIsClient(true);
  }, []);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true); // Set loading state when registration starts

    // Simulate registration logic (e.g., API call)
    setTimeout(() => {
      console.log({ username, email, password, role });
      setLoading(false); // Reset loading state after registration is complete
    }, 2000); // Simulated delay (2 seconds)
  };

  if (!isClient) {
    return null; // Don't render anything on the server side
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Register
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <Label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="mt-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="mt-2 relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="pr-10 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 hover:text-gray-900"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-2">
            <Label
              htmlFor="ConfirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="ConfirmPassword"
                name="ConfirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
                className="pr-10 w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 hover:text-gray-900"
                aria-label="Toggle password visibility"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="role" className="text-sm font-medium text-gray-700">
              Role
            </Label>
            <Select onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="mt-2 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full py-3 text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500"
            onClick={handleRegister}
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0115.5 3.5"
                  />
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </Button>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-x-4 mt-6 sm:space-y-0">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-black bg-gray-200 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-100 focus:ring-2 focus:ring-orange-500"
            >
              <Google />
              <span>Continue with Google</span>
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto text-black bg-gray-200 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-orange-50 focus:ring-2 focus:ring-orange-500"
            >
              <Facebook color="#1877F2" />
              <span>Continue with Facebook</span>
            </Button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/create-profile" className="text-orange-600 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
