"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth";
import { toast } from "sonner";

export function AdminForgotPasswordForm() {
  const router = useRouter();
  const { resetPassword, isLoading } = useGraphQLAuth();
  
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await resetPassword(email, "", "");
      // Redirect to OTP verification page
      router.push(`/admin/auth/reset-password?email=${encodeURIComponent(email)}&type=password-reset`);
    } catch (err) {
      // Error handling is done in the hook
      console.error('Password reset error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={24}
              height={24}
              className="text-gray-600"
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Admin Password Reset
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your admin email address and we'll send you a verification code to reset your password.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Admin Email Address
              </Label>
              <div className="relative mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your admin email address"
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            {isLoading ? "Sending..." : "Send Reset Code"}
          </Button>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/admin/auth/login"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Admin Login
            </Link>
          </div>
        </form>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            If you don't receive an email within a few minutes, please check your spam folder or{" "}
            <Link href="/contact" className="text-gray-600 hover:text-gray-500">
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
