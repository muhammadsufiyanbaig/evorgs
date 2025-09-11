"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

type UserType = 'User' | 'Vendor' | 'Admin';

interface UnifiedRegistrationFormProps {
  defaultUserType?: UserType;
}
export function UnifiedRegistrationForm({ defaultUserType = 'User' }: UnifiedRegistrationFormProps) {
  // Import useAuth hook - uncomment the line below when useAuth is available
  // const { registerUser, registerVendor, registerAdmin, isLoading, error, clearError } = useAuth();
  
  // Temporary mock values for development
  const registerUser = async (_data: any) => {};
  const registerVendor = async (_data: any) => {};
  const registerAdmin = async (_data: any) => {};
  const isLoading = false;
  const error = null;
  const clearError = () => {};

  const [formData, setFormData] = useState({
    userType: defaultUserType,
    // Common fields
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    profileImage: '',
    
    // User specific
    dateOfBirth: '',
    gender: 'Male' as 'Male' | 'Female' | 'Others',
    
    // Vendor specific
    vendorName: '',
    vendorEmail: '',
    vendorPhone: '',
    vendorAddress: '',
    vendorProfileDescription: '',
    vendorWebsite: '',
    vendorSocialLinks: '',
    bannerImage: '',
    vendorType: 'Catering' as 'FarmHouse' | 'Venue' | 'Catering' | 'Photography',
    vendorTypeId: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      return;
    }

    try {
      switch (formData.userType) {
        case 'User':
          await registerUser({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone || undefined,
            address: formData.address || undefined,
            profileImage: formData.profileImage || undefined,
            dateOfBirth: formData.dateOfBirth || undefined,
            gender: formData.gender,
          });
          break;
          
        case 'Vendor':
          await registerVendor({
            vendorName: formData.vendorName,
            vendorEmail: formData.vendorEmail || formData.email,
            password: formData.password,
            vendorPhone: formData.vendorPhone || formData.phone,
            vendorAddress: formData.vendorAddress || formData.address,
            vendorProfileDescription: formData.vendorProfileDescription || undefined,
            vendorWebsite: formData.vendorWebsite || undefined,
            vendorSocialLinks: formData.vendorSocialLinks ? formData.vendorSocialLinks.split(',').map(s => s.trim()) : undefined,
            profileImage: formData.profileImage || undefined,
            bannerImage: formData.bannerImage || undefined,
            vendorType: formData.vendorType,
            vendorTypeId: formData.vendorTypeId || undefined,
          });
          break;
          
        case 'Admin':
          await registerAdmin({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone || undefined,
            password: formData.password,
            profileImage: formData.profileImage || undefined,
          });
          break;
      }
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  const renderUserFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender *</Label>
        <Select
          value={formData.gender}
          onValueChange={(value) => handleInputChange('gender', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Others">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const renderVendorFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="vendorName">Business Name *</Label>
        <Input
          id="vendorName"
          type="text"
          placeholder="Enter your business name"
          value={formData.vendorName}
          onChange={(e) => handleInputChange('vendorName', e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="vendorType">Business Type *</Label>
        <Select
          value={formData.vendorType}
          onValueChange={(value) => handleInputChange('vendorType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FarmHouse">Farm House</SelectItem>
            <SelectItem value="Venue">Venue</SelectItem>
            <SelectItem value="Catering">Catering</SelectItem>
            <SelectItem value="Photography">Photography</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vendorProfileDescription">Business Description</Label>
        <Textarea
          id="vendorProfileDescription"
          placeholder="Describe your business..."
          value={formData.vendorProfileDescription}
          onChange={(e) => handleInputChange('vendorProfileDescription', e.target.value)}
          disabled={isLoading}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="vendorWebsite">Website</Label>
        <Input
          id="vendorWebsite"
          type="url"
          placeholder="https://yourwebsite.com"
          value={formData.vendorWebsite}
          onChange={(e) => handleInputChange('vendorWebsite', e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="vendorSocialLinks">Social Media Links</Label>
        <Input
          id="vendorSocialLinks"
          type="text"
          placeholder="Enter links separated by commas"
          value={formData.vendorSocialLinks}
          onChange={(e) => handleInputChange('vendorSocialLinks', e.target.value)}
          disabled={isLoading}
        />
      </div>
    </>
  );

  const renderAdminFields = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
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
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Join our platform today</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="userType">Register as</Label>
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

            {/* Dynamic Fields Based on User Type */}
            {formData.userType === 'User' && renderUserFields()}
            {formData.userType === 'Vendor' && renderVendorFields()}
            {formData.userType === 'Admin' && renderAdminFields()}

            {/* Common Fields */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
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

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter your address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Password Fields */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
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
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-orange-600 hover:text-orange-700 hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
        <div className="text-center text-white p-8">
          <Image
            src="/hero-bg.jpg"
            alt="Registration Background"
            width={500}
            height={400}
            className="rounded-lg shadow-lg opacity-90"
          />
          <h2 className="text-3xl font-bold mt-6 mb-4">Join Evorgs Today</h2>
          <p className="text-lg opacity-90">
            Connect with customers or find the perfect vendors for your events
          </p>
        </div>
      </div>
    </div>
  );
}
