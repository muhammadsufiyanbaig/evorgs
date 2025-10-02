"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, Building } from "lucide-react";
import Image from "next/image";
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth";
import { toast } from "sonner";

export function VendorRegisterForm() {
  const router = useRouter();
  const { register, isLoading } = useGraphQLAuth();
  
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorEmail: '',
    password: '',
    confirmPassword: '',
    vendorPhone: '',
    vendorAddress: '',
    vendorProfileDescription: '',
    vendorWebsite: '',
    vendorType: '' as 'FarmHouse' | 'Venue' | 'Catering' | 'Photography' | '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.vendorName || !formData.vendorEmail || !formData.password || !formData.vendorType) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    try {
      const registerInput = {
        vendorName: formData.vendorName,
        vendorEmail: formData.vendorEmail,
        password: formData.password,
        vendorPhone: formData.vendorPhone || undefined,
        vendorAddress: formData.vendorAddress || undefined,
        vendorProfileDescription: formData.vendorProfileDescription || undefined,
        vendorWebsite: formData.vendorWebsite || undefined,
        vendorType: formData.vendorType,
      };

      await register(registerInput, 'Vendor');
      // Redirect to OTP verification page
      router.push(`/vendor/auth/verify-otp?email=${encodeURIComponent(formData.vendorEmail)}&type=registration`);
    } catch (err) {
      // Error handling is done in the hook
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.svg"
              alt="Evorgs™"
              width={180}
              height={60}
              className="mx-auto"
            />
          </Link>
          <div className="mt-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Join as Vendor</h2>
            <p className="text-gray-600 mt-2">
              Create your vendor account and start managing your business
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vendor Name */}
            <div>
              <Label htmlFor="vendorName" className="text-sm font-medium text-gray-700">
                Vendor Name *
              </Label>
              <Input
                id="vendorName"
                type="text"
                value={formData.vendorName}
                onChange={(e) => handleInputChange('vendorName', e.target.value)}
                className="mt-1"
                placeholder="Enter your business name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="vendorEmail" className="text-sm font-medium text-gray-700">
                Vendor Email Address *
              </Label>
              <Input
                id="vendorEmail"
                type="email"
                value={formData.vendorEmail}
                onChange={(e) => handleInputChange('vendorEmail', e.target.value)}
                className="mt-1"
                placeholder="Enter your business email"
                required
              />
            </div>

            {/* Vendor Type */}
            <div>
              <Label htmlFor="vendorType" className="text-sm font-medium text-gray-700">
                Vendor Type *
              </Label>
              <Select onValueChange={(value) => handleInputChange('vendorType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FarmHouse">Farm House</SelectItem>
                  <SelectItem value="Venue">Venue</SelectItem>
                  <SelectItem value="Catering">Catering</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="vendorPhone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="vendorPhone"
                type="tel"
                value={formData.vendorPhone}
                onChange={(e) => handleInputChange('vendorPhone', e.target.value)}
                className="mt-1"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="vendorAddress" className="text-sm font-medium text-gray-700">
                Business Address
              </Label>
              <Textarea
                id="vendorAddress"
                value={formData.vendorAddress}
                onChange={(e) => handleInputChange('vendorAddress', e.target.value)}
                className="mt-1"
                placeholder="Enter your business address"
                rows={3}
              />
            </div>

            {/* Website */}
            <div>
              <Label htmlFor="vendorWebsite" className="text-sm font-medium text-gray-700">
                Website
              </Label>
              <Input
                id="vendorWebsite"
                type="url"
                value={formData.vendorWebsite}
                onChange={(e) => handleInputChange('vendorWebsite', e.target.value)}
                className="mt-1"
                placeholder="https://your-website.com"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="vendorProfileDescription" className="text-sm font-medium text-gray-700">
                Business Description
              </Label>
              <Textarea
                id="vendorProfileDescription"
                value={formData.vendorProfileDescription}
                onChange={(e) => handleInputChange('vendorProfileDescription', e.target.value)}
                className="mt-1"
                placeholder="Tell us about your business..."
                rows={4}
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password *
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pr-10"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password *
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pr-10"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Vendor Account'
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-center text-sm">
              <p className="text-gray-600">Already have a vendor account?</p>
              <Link href="/vendor/auth/login" className="text-blue-600 hover:text-blue-500 font-semibold">
                Sign in here
              </Link>
            </div>

            <div className="text-center text-sm space-y-2">
              <p className="text-gray-600">Register as:</p>
              <div className="flex gap-2 justify-center">
                <Link href="/auth/register" className="text-blue-500 hover:text-blue-600 font-semibold">
                  User
                </Link>
                <span className="text-gray-400">•</span>
                <Link href="/admin/auth/register" className="text-blue-500 hover:text-blue-600 font-semibold">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
