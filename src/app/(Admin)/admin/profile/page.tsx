"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Loader2, Upload, Trash2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth"
import { useMutation } from "@apollo/client/react"
import { ADMIN_UPDATE_PROFILE, ADMIN_DELETE_ACCOUNT } from "@/lib/graphQL/auth/admin"
import { toast } from "sonner"

interface AdminProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  profileImage?: string
}

export default function AdminProfile() {
  const router = useRouter()
  
  // Get auth state from Zustand (primary source)
  const { adminData, isAuthenticated, userType } = useAuth()
  
  // Get admin from GraphQL (fallback/refresh)
  const { currentAdmin, logout } = useGraphQLAuth()
  
  // Multi-source strategy: Zustand first, GraphQL fallback
  const adminSource = adminData || currentAdmin
  
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  // GraphQL Mutations
  const [updateProfileMutation] = useMutation<{
    adminUpdateAdminProfile: {
      id: string
      firstName: string
      lastName: string
      email: string
      phone?: string
      profileImage?: string
    }
  }>(ADMIN_UPDATE_PROFILE)
  const [deleteAccountMutation] = useMutation(ADMIN_DELETE_ACCOUNT)

  useEffect(() => {
    console.log('=== ADMIN PROFILE DEBUG ===')
    console.log('isAuthenticated:', isAuthenticated)
    console.log('userType:', userType)
    console.log('adminData (from Zustand):', adminData)
    console.log('currentAdmin (from GraphQL):', currentAdmin)
    console.log('adminSource (final):', adminSource)
    
    // Check authentication
    if (!isAuthenticated || userType !== 'Admin') {
      toast.error('Please login as admin to access this page')
      router.push('/admin/auth/login')
      return
    }
    
    // Load profile data
    if (adminSource) {
      const profileData = {
        id: adminSource.id,
        firstName: adminSource.firstName,
        lastName: adminSource.lastName,
        email: adminSource.email,
        phone: adminSource.phone || "",
        profileImage: adminSource.profileImage || "",
      }
      
      setProfile(profileData)
      setFormData({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
      })
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [adminData, currentAdmin, isAuthenticated, userType, router, adminSource])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      console.log("Updating admin profile:", formData)
      
      // Call GraphQL mutation
      const { data } = await updateProfileMutation({
        variables: {
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone || undefined,
          }
        }
      })

      if (data?.adminUpdateAdminProfile) {
        setSuccess("Profile updated successfully!")
        toast.success("Profile updated successfully!")
        
        // Update local profile state
        if (profile) {
          setProfile({
            ...profile,
            firstName: data.adminUpdateAdminProfile.firstName,
            lastName: data.adminUpdateAdminProfile.lastName,
            phone: data.adminUpdateAdminProfile.phone || "",
          })
        }
      }
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update profile. Please try again."
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Update profile error:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleting(true)
    setError("")

    try {
      console.log("Deleting admin account...")
      
      // Call GraphQL mutation
      await deleteAccountMutation()

      toast.success("Account deleted successfully")
      
      // Logout and redirect to login
      await logout()
      router.push('/admin/auth/login')
    } catch (err: any) {
      const errorMessage = err.message || "Failed to delete account. Please try again."
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Delete account error:', err)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!profile && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">No Admin Profile Found</p>
              <p className="text-sm text-gray-500">Please login to access your profile</p>
              <Button onClick={() => router.push('/admin/auth/login')}>
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-muted-foreground">Update your personal information</p>
        </div>

        <div className="space-y-6">
          {/* Profile Image Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={profile?.profileImage || "/placeholder.svg"}
                    alt={profile ? `${profile.firstName} ${profile.lastName}` : "Admin"}
                  />
                  <AvatarFallback className="text-lg">
                    {profile?.firstName?.[0] || 'A'}
                    {profile?.lastName?.[0] || 'D'}
                  </AvatarFallback>
                </Avatar>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Danger Zone Card */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your admin account and remove all
                      associated data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive" onClick={handleDeleteAccount} disabled={deleting}>
                      {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Delete Account
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
