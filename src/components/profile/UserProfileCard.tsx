"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Edit, Camera, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface UserProfileCardProps {
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    phone?: string;
    address?: string;
    profileImage?: string;
    isVerified?: boolean;
    dateOfBirth?: string;
    createdAt?: string;
  };
  userType: 'User' | 'Vendor' | 'Admin';
  onEditProfile?: () => void;
  onChangeAvatar?: () => void;
}

export function UserProfileCard({ user, userType, onEditProfile, onChangeAvatar }: UserProfileCardProps) {
  const displayName = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email;
  const initials = user.firstName && user.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : displayName[0].toUpperCase();

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMembershipDuration = () => {
    if (!user.createdAt) return null;
    const createdDate = new Date(user.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years`;
  };

  const getTypeColor = () => {
    switch (userType) {
      case 'User': return 'bg-green-100 text-green-700 border-green-200';
      case 'Vendor': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar Section */}
          <div className="relative">
            <Avatar className="w-24 h-24 ring-4 ring-gray-100">
              <AvatarImage 
                src={user.profileImage || "/placeholder.svg"} 
                alt={displayName}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            {/* Verification Badge */}
            {user.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 ring-4 ring-white">
                <Shield className="h-4 w-4 text-white" />
              </div>
            )}
            
            {/* Change Avatar Button */}
            {onChangeAvatar && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute -bottom-1 -right-1 rounded-full h-8 w-8 p-0 bg-white border border-gray-200 hover:bg-gray-50"
                onClick={onChangeAvatar}
              >
                <Camera className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* User Info */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{displayName}</h3>
              <Badge 
                variant="outline" 
                className={`text-xs font-medium ${getTypeColor()}`}
              >
                {userType}
              </Badge>
            </div>
            
            {user.isVerified && (
              <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                <Shield className="h-4 w-4" />
                <span>Verified Account</span>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="w-full space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700">{user.email}</span>
            </div>
            
            {user.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{user.phone}</span>
              </div>
            )}
            
            {user.address && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{user.address}</span>
              </div>
            )}
            
            {user.dateOfBirth && (
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">Born {formatDate(user.dateOfBirth)}</span>
              </div>
            )}
          </div>

          {/* Membership Info */}
          {user.createdAt && (
            <div className="w-full pt-3 border-t border-gray-100">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Member for {getMembershipDuration()}
                </p>
                <p className="text-xs text-gray-400">
                  Since {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          )}

          {/* Edit Profile Button */}
          {onEditProfile && (
            <Button 
              onClick={onEditProfile}
              className="w-full mt-4"
              variant="outline"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
