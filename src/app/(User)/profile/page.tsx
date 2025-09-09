"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, Mail, Phone, MapPin, Calendar, User, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth, useAuthUser, useAuthLoading, useAuthUserType } from "@/hooks/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User as UserType } from "@/utils/graphql/auth"

export default function ProfilePage() {
  const router = useRouter()
  const { refreshUserData } = useAuth()
  const authUser = useAuthUser()
  const userType = useAuthUserType()
  const isLoading = useAuthLoading()
  
  // Ensure we're dealing with a User type
  const user = (userType === 'User' ? authUser : null) as UserType | null

  // Refresh user data when component mounts
  useEffect(() => {
    if (userType === 'User' && !user) {
      refreshUserData()
    }
  }, [userType, user, refreshUserData])

  // Redirect if not a user
  useEffect(() => {
    if (userType && userType !== 'User') {
      router.push('/login')
    }
  }, [userType, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Link href="/profile/edit">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage
                    src={user.profileImage || "/placeholder.svg"}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <AvatarFallback className="text-lg">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mb-2">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  {user.isVerified ? (
                    <Badge variant="default" className="bg-orange-100 text-orange-800 border-orange-200">
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Unverified</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{user.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{user.address || 'Not provided'}</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-muted-foreground">
                      {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Gender</p>
                    <p className="text-sm text-muted-foreground">{user.gender}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/profile/settings">
            <Button variant="outline">Settings</Button>
          </Link>
          <Button variant="destructive" className="ml-auto">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
