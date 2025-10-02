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

export function VendorLoginForm() {
  const router = useRouter();
  const { login, isLoading } = useGraphQLAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      console.log('=== VENDOR LOGIN ATTEMPT ===');
      console.log('Email:', formData.email);
      
      const result = await login({ 
        vendorEmail: formData.email, 
        password: formData.password 
      }, 'Vendor');
      
      console.log('=== VENDOR LOGIN SUCCESS ===');
      console.log('Login Result:', result);
      console.log('Token stored:', localStorage.getItem('auth_token'));
      console.log('===========================');
      
      toast.success('Successfully logged in as Vendor');
      router.push('/vendor');
    } catch (err) {
      console.error('=== VENDOR LOGIN ERROR ===');
      console.error('Error:', err);
      console.error('========================');
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
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
            <h2 className="text-3xl font-bold text-gray-900">Vendor Portal</h2>
            <p className="text-gray-600 mt-2">Sign in to your vendor account</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Vendor Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your vendor email"
                required
              />
            </div>

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
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In as Vendor'
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-center text-sm space-y-2">
              <p className="text-gray-600">Sign in as:</p>
              <div className="flex gap-2 justify-center">
                <Link href="/auth/login" className="text-blue-500 hover:text-blue-600 font-semibold">
                  User
                </Link>
                <span className="text-gray-400">•</span>
                <Link href="/admin/auth/login" className="text-blue-500 hover:text-blue-600 font-semibold">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>Test credentials: vendor@test.com / password</p>
        </div>
      </div>
    </div>
  );
}
