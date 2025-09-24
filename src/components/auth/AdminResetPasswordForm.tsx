"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Lock, Mail, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth";
import { toast } from "sonner";

export function AdminResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword, resendOtp, isLoading } = useGraphQLAuth();
  
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const email = searchParams.get('email') || "";

  // Countdown timer for resend OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.otp || formData.otp.length !== 6) {
      toast.error('Please enter the complete 6-digit verification code');
      return;
    }

    if (!formData.newPassword || formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Check password strength
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      toast.error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    try {
      // Reset the password with OTP verification
      await resetPassword(formData.newPassword, formData.otp, email);
      
      toast.success('Password reset successfully!');
      router.push('/admin/auth/login');
    } catch (err) {
      console.error('Password reset error:', err);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || !email) return;
    
    setIsResending(true);
    try {
      await resendOtp();
      setCountdown(60);
      toast.success('Verification code sent successfully!');
    } catch (err) {
      console.error('Resend OTP error:', err);
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Request</h2>
          <p className="text-gray-600 mb-6">This password reset link is invalid or has expired.</p>
          <Link
            href="/admin/auth/forgot-password"
            className="inline-flex items-center text-gray-600 hover:text-gray-500"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Request New Password Reset
          </Link>
        </div>
      </div>
    );
  }

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
            Reset Admin Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 6-digit verification code sent to{" "}
            <span className="font-medium">{email}</span> and your new password.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Display */}
            <div>
              <Label className="text-gray-700">Email Address</Label>
              <div className="relative mt-1">
                <Input
                  value={email}
                  disabled
                  className="pl-10 bg-gray-50"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* OTP Input */}
            <div>
              <Label className="text-gray-700">Verification Code</Label>
              <div className="mt-1 flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={formData.otp}
                  onChange={(value) => setFormData(prev => ({ ...prev, otp: value }))}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              {/* Resend OTP */}
              <div className="mt-2 text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend code in {countdown} seconds
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="text-sm text-gray-600 hover:text-gray-500 underline"
                  >
                    {isResending ? "Sending..." : "Didn't receive code? Resend"}
                  </button>
                )}
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
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.newPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                  className="pl-10 pr-10"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
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
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                  className="pl-10 pr-10"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-3"
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

          {/* Password Requirements */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
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
      </div>
    </div>
  );
}
