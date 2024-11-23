'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Hydration handling - Check if the component has mounted
  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    // Render a loader until the component is hydrated
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
      </div>
    );
  }
const handleClick = () => {
  router.push("/dashboard");
}
  return (
    <div className="flex h-screen bg-white">
      {/* Left Section */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            height={40}
            width={40}
            alt="EvOrgs Logo"
            src="/hero-bg.jpg"
            className="mx-auto h-10 w-auto rounded-full"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={handleClick} method="POST" className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  // type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <div className="text-sm">
                  <Link href="/forget-password" className="font-semibold text-orange-600 hover:text-orange-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="pr-10" // Add padding for the icon
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 hover:text-gray-900"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <Button type="submit"  className="w-full bg-orange-600 hover:bg-orange-500">
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link href="/register" className="font-semibold text-orange-600 hover:text-orange-500">
              Register now
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden p-6 lg:flex lg:w-1/2 lg:items-center lg:justify-center bg-gray-50">
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
          alt="Workspace"
          className="object-cover w-full h-full rounded-xl shadow-2xl"
        />
      </div>
    </div>
  );
}
