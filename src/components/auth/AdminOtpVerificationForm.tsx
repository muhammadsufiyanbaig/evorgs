"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth";
import { toast } from "sonner";

export function AdminOtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyRegistration, resendOtp, isLoading } = useGraphQLAuth();
  
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const email = searchParams.get('email') || "";
  const type = searchParams.get('type') || 'registration'; // registration or login

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
    
    if (!otp || otp.length !== 6) {
      toast.error('Please enter the complete 6-digit verification code');
      return;
    }

    try {
      if (type === 'registration') {
        await verifyRegistration(otp);
        toast.success('Admin account verified successfully!');
        router.push('/admin/auth/login');
      } else if (type === 'login') {
        // Handle OTP login verification
        toast.success('OTP verified successfully!');
        router.push('/admin');
      }
    } catch (err) {
      console.error('OTP verification error:', err);
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
          <p className="text-gray-600 mb-6">This verification link is invalid or has expired.</p>
          <Link
            href="/admin/auth/register"
            className="inline-flex items-center text-gray-600 hover:text-gray-500"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Admin Registration
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
          <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            {type === 'registration' ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="text-gray-600"
              />
            )}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {type === 'registration' ? 'Verify Admin Account' : 'Admin OTP Verification'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {type === 'registration' 
              ? "We've sent a 6-digit verification code to your admin email address. Please enter it below to activate your account."
              : "Enter the 6-digit verification code sent to your email to complete the login process."
            }
          </p>
          <p className="mt-2 text-sm font-medium text-gray-900">
            {email}
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Display */}
            <div>
              <Label className="text-gray-700">Admin Email</Label>
              <div className="relative mt-1">
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {email}
                </div>
              </div>
            </div>

            {/* OTP Input */}
            <div>
              <Label className="text-gray-700">Verification Code</Label>
              <div className="mt-1 flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
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
              <div className="mt-4 text-center">
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
                    {isResending ? "Sending..." : "Didn't receive the code? Resend"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-md transition duration-200"
          >
            {isLoading 
              ? "Verifying..." 
              : type === 'registration' 
                ? "Verify Account" 
                : "Verify & Login"
            }
          </Button>

          {/* Back Navigation */}
          <div className="text-center">
            <Link
              href={type === 'registration' ? "/admin/auth/register" : "/admin/auth/login"}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {type === 'registration' ? 'Back to Registration' : 'Back to Login'}
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

        {/* Security Notice */}
        {type === 'registration' && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Security Notice</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Your admin account registration is pending verification. This helps ensure the security of your administrative access.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
