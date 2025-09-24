"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Clock } from "lucide-react";
import Image from "next/image";
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth";
import { toast } from "sonner";

export function VendorOtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyRegistration, verifyLoginOtp, resendOtp, isLoading, pendingVerification } = useGraphQLAuth();
  
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  const email = searchParams.get('email');
  const verificationType = searchParams.get('type'); // 'registration' or 'login' or 'password-reset'

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      if (verificationType === 'registration') {
        const result = await verifyRegistration(otp);
        if (result.success) {
          router.push('/vendor/services');
        }
      } else if (verificationType === 'login') {
        const result = await verifyLoginOtp(otp);
        if (result.success) {
          router.push('/vendor/services');
        }
      }
    } catch (err) {
      // Error handling is done in the hook
      setOtp(""); // Clear OTP on error
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      await resendOtp();
      setTimeLeft(300); // Reset timer
      setCanResend(false);
      setOtp(""); // Clear current OTP
    } catch (err) {
      // Error handling is done in the hook
    }
  };

  const getTitle = () => {
    switch (verificationType) {
      case 'registration':
        return 'Verify Your Vendor Email';
      case 'login':
        return 'Enter Vendor Login OTP';
      case 'password-reset':
        return 'Verify Password Reset';
      default:
        return 'Verify OTP';
    }
  };

  const getDescription = () => {
    const maskedEmail = email ? `${email.slice(0, 3)}***@${email.split('@')[1]}` : '';
    switch (verificationType) {
      case 'registration':
        return `We've sent a 6-digit verification code to ${maskedEmail}. Please enter it below to complete your vendor registration.`;
      case 'login':
        return `We've sent a 6-digit login code to ${maskedEmail}. Please enter it below to sign in to your vendor account.`;
      case 'password-reset':
        return `We've sent a 6-digit verification code to ${maskedEmail}. Please enter it below to reset your password.`;
      default:
        return `We've sent a 6-digit code to ${maskedEmail}. Please enter it below to continue.`;
    }
  };

  if (!email || !verificationType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Request</h2>
          <p className="text-gray-600 mb-6">The verification link is invalid or expired.</p>
          <Link href="/vendor/auth/login">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Back to Vendor Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={24}
              height={24}
              className="text-blue-600"
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {getTitle()}
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-sm mx-auto">
            {getDescription()}
          </p>
        </div>

        {/* OTP Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* OTP Input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Timer */}
            <div className="text-center">
              {!canResend ? (
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Code expires in {formatTime(timeLeft)}
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>

          {/* Back Button */}
          <div className="text-center">
            <Link
              href="/vendor/auth/login"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Vendor Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
