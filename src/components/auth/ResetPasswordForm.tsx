"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Eye, EyeOff, ArrowLeft, Lock } from "lucide-react";
import Image from "next/image";
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setNewPassword: submitNewPassword, isLoading } = useGraphQLAuth();
  
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const email = searchParams.get('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    try {
      await submitNewPassword(otp, newPassword);
      router.push('/auth/login');
    } catch (err) {
      // Error handling is done in the hook
      setOtp(""); // Clear OTP on error
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Request</h2>
          <p className="text-gray-600 mb-6">The password reset link is invalid or expired.</p>
          <Link href="/auth/forgot-password">
            <Button className="bg-orange-600 hover:bg-orange-700">
              Request New Reset Link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const maskedEmail = `${email.slice(0, 3)}***@${email.split('@')[1]}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={24}
              height={24}
              className="text-orange-600"
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-sm mx-auto">
            We've sent a 6-digit verification code to {maskedEmail}. Enter it below along with your new password.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* OTP Input */}
            <div>
              <Label className="text-gray-700 mb-3 block">
                Verification Code
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-10 h-10 text-lg" />
                    <InputOTPSlot index={1} className="w-10 h-10 text-lg" />
                    <InputOTPSlot index={2} className="w-10 h-10 text-lg" />
                    <InputOTPSlot index={3} className="w-10 h-10 text-lg" />
                    <InputOTPSlot index={4} className="w-10 h-10 text-lg" />
                    <InputOTPSlot index={5} className="w-10 h-10 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* New Password */}
            <div>
              <Label htmlFor="newPassword" className="text-gray-700">
                New Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm New Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </Button>

          {/* Back Button */}
          <div className="text-center">
            <Link
              href="/auth/forgot-password"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
