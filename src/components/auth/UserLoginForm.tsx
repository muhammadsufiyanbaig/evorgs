"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth";
import { toast } from "sonner";

export function UserLoginForm() {
  const router = useRouter();
  const { login, requestLoginOtp, isLoading } = useGraphQLAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      }, 'User');

      if (result.success) {
        router.push('/profile');
      }
    } catch (err) {
      // Error handling is done in the hook
      console.error('Login error:', err);
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      await requestLoginOtp(formData.email);
      // Redirect to OTP verification page
      router.push(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}&type=login`);
    } catch (err) {
      // Error handling is done in the hook
      console.error('OTP request error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.svg"
              alt="Evorgs™"
              width={180}
              height={60}
              className="mx-auto"
            />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          {/* Login Method Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setLoginMethod('password')}
              className={`flex-1 text-sm py-2 px-3 rounded-md transition-all ${
                loginMethod === 'password'
                  ? 'bg-white text-orange-600 shadow-sm font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('otp')}
              className={`flex-1 text-sm py-2 px-3 rounded-md transition-all ${
                loginMethod === 'otp'
                  ? 'bg-white text-orange-600 shadow-sm font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              OTP Login
            </button>
          </div>

          <form onSubmit={loginMethod === 'password' ? handlePasswordLogin : handleOtpLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {loginMethod === 'password' && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your password"
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
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  <span>{loginMethod === 'password' ? 'Signing in...' : 'Sending OTP...'}</span>
                </div>
              ) : (
                loginMethod === 'password' ? 'Sign In' : 'Send OTP'
              )}
            </Button>

            {loginMethod === 'password' && (
              <div className="text-center">
                <Link href="/auth/forgot-password" className="text-sm text-orange-600 hover:text-orange-500">
                  Forgot your password?
                </Link>
              </div>
            )}
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-orange-600 hover:text-orange-500 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
            
            <div className="text-center text-sm space-y-2">
              <p className="text-gray-600">Sign in as:</p>
              <div className="flex gap-2 justify-center">
                <Link href="/vendor/auth/login" className="text-orange-500 hover:text-orange-600 font-semibold">
                  Vendor
                </Link>
                <span className="text-gray-400">•</span>
                <Link href="/admin/auth/login" className="text-orange-500 hover:text-orange-600 font-semibold">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>Test credentials: user@test.com / password</p>
        </div>
      </div>
    </div>
  );
}
