"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

type UserType = 'User' | 'Vendor' | 'Admin';

interface UnifiedLoginFormProps {
  defaultUserType?: UserType;
  redirectAfterLogin?: string;
}

export function UnifiedLoginForm({ defaultUserType = 'User' }: UnifiedLoginFormProps) {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: defaultUserType,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };
  const loginUser = async (credentials: { email: string; password: string }) => {
    // Implement user login logic here
    console.log('User login:', credentials);
  };

  const loginVendor = async (credentials: { vendorEmail: string; password: string }) => {
    // Implement vendor login logic here
    console.log('Vendor login:', credentials);
  };

  const loginAdmin = async (credentials: { email: string; password: string }) => {
    // Implement admin login logic here
    console.log('Admin login:', credentials);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { email, password, userType } = formData;
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      switch (userType) {
        case 'User':
          await loginUser({ email, password });
          break;
        case 'Vendor':
          await loginVendor({ vendorEmail: email, password });
          break;
        case 'Admin':
          await loginAdmin({ email, password });
          break;
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev: any) => !prev);
  };

  const getUserTypeLabel = (type: UserType) => {
    switch (type) {
      case 'User': return 'Customer';
      case 'Vendor': return 'Vendor';
      case 'Admin': return 'Admin';
      default: return type;
    }
  };

  const getEmailLabel = (type: UserType) => {
    switch (type) {
      case 'Vendor': return 'Vendor Email';
      default: return 'Email';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Evorgs Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Services
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="/register" 
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
              >
                Sign Up
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Link 
                href="/register" 
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors text-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md space-y-6">
            {/* Form Header */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="userType">Login as</Label>
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

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">{getEmailLabel(formData.userType)}</Label>
              <Input
                id="email"
                type="email"
                placeholder={`Enter your ${getEmailLabel(formData.userType).toLowerCase()}`}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                  onClick={togglePasswordVisibility}
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forget-password"
                className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
              >
                Forgot your password?
              </Link>
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
                  <span>Signing in...</span>
                </div>
              ) : (
                `Sign in as ${getUserTypeLabel(formData.userType)}`
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-orange-600 hover:text-orange-700 hover:underline font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
          <div className="text-center text-white p-8">
            <Image
              src="/hero-bg.jpg"
              alt="Authentication Background"
              width={500}
              height={400}
              className="rounded-lg shadow-lg opacity-90"
            />
            <h2 className="text-3xl font-bold mt-6 mb-4">Welcome to Evorgs</h2>
            <p className="text-lg opacity-90">
              Your one-stop platform for event management and vendor services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
