"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import type { UserType } from "@/utils/graphql/auth";

export function OtpVerificationForm() {
  const { verifyUserOtp, verifyVendorOtp, verifyAdminOtp, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    userType: 'User' as UserType,
    purpose: 'registration' as 'registration' | 'password_reset',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { email, otp, userType, purpose } = formData;
    
    if (!email || !otp) {
      return;
    }

    try {
      switch (userType) {
        case 'User':
          await verifyUserOtp({ email, otp, purpose, userType });
          break;
        case 'Vendor':
          await verifyVendorOtp({ vendorEmail: email, otp, purpose, userType });
          break;
        case 'Admin':
          await verifyAdminOtp({ email, otp, purpose });
          break;
      }
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="mx-auto mb-6"
            />
            <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
            <p className="text-gray-600 mt-2">Enter the verification code sent to your email</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <Select
                value={formData.userType}
                onValueChange={(value: UserType) => handleInputChange('userType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User">Customer</SelectItem>
                  <SelectItem value="Vendor">Vendor</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Purpose Selection */}
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Select
                value={formData.purpose}
                onValueChange={(value: 'registration' | 'password_reset') => handleInputChange('purpose', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="registration">Registration</SelectItem>
                  <SelectItem value="password_reset">Password Reset</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* OTP Field */}
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={formData.otp}
                onChange={(e) => handleInputChange('otp', e.target.value)}
                required
                disabled={isLoading}
                maxLength={6}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify Code'
              )}
            </Button>
          </form>

          {/* Resend Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                className="text-orange-600 hover:text-orange-700 hover:underline font-medium"
                disabled={isLoading}
              >
                Resend Code
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
        <div className="text-center text-white p-8">
          <Image
            src="/hero-bg.jpg"
            alt="Verification Background"
            width={500}
            height={400}
            className="rounded-lg shadow-lg opacity-90"
          />
          <h2 className="text-3xl font-bold mt-6 mb-4">Almost There!</h2>
          <p className="text-lg opacity-90">
            Just one more step to complete your registration
          </p>
        </div>
      </div>
    </div>
  );
}
