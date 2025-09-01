"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Save, User, Mail, UserCheck, Upload } from "lucide-react"

// Mock user data for editing
const mockUserData = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  profileImage: "/placeholder.svg?height=120&width=120",
  dateOfBirth: "1990-05-15",
  gender: "Male",
  createdAt: "2024-01-15T10:30:00Z",
  isVerified: true,
}

export default function EditUserPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    isVerified: false,
    profileImage: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load user data on component mount
  useEffect(() => {
    // In a real app, you would fetch user data by ID
    setFormData({
      firstName: mockUserData.firstName,
      lastName: mockUserData.lastName,
      email: mockUserData.email,
      phone: mockUserData.phone,
      address: mockUserData.address,
      dateOfBirth: mockUserData.dateOfBirth,
      gender: mockUserData.gender,
      isVerified: mockUserData.isVerified,
      profileImage: mockUserData.profileImage,
    })
  }, [userId])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedUser = {
        ...formData,
        id: userId,
        createdAt: mockUserData.createdAt,
        updatedAt: new Date().toISOString(),
      }

      console.log("User updated:", updatedUser)
      // In a real app, you would save to your backend
      router.push(`/admin/users/${userId}`)
    } catch (error) {
      console.error("Error updating user:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/admin/users/${userId}`}>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to User Details
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit User</h1>
            <p className="text-gray-600">Update user information and settings</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-100">
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <User className="h-5 w-5" />
              Profile Picture
            </CardTitle>
            <CardDescription>Update the user's profile image</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={formData.profileImage || "/placeholder.svg"}
                  alt={`${formData.firstName} ${formData.lastName}`}
                />
                <AvatarFallback className="text-2xl bg-orange-100 text-orange-800">
                  {getInitials(formData.firstName, formData.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                >
                  <Upload className="h-4 w-4" />
                  Upload New Picture
                </Button>
                <p className="text-sm text-gray-600">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-100">
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Basic details about the user</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className={`border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                    errors.dateOfBirth ? "border-red-500" : ""
                  }`}
                />
                {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger
                    className={`border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.gender ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-100">
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>How to reach the user</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                  errors.address ? "border-red-500" : ""
                }`}
                placeholder="Enter full address"
                rows={3}
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-100">
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <UserCheck className="h-5 w-5" />
              Account Settings
            </CardTitle>
            <CardDescription>User account preferences and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isVerified">Verified User</Label>
                <p className="text-sm text-gray-600">Mark this user as verified</p>
              </div>
              <Switch
                id="isVerified"
                checked={formData.isVerified}
                onCheckedChange={(checked) => handleInputChange("isVerified", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link href={`/admin/users/${userId}`}>
            <Button
              type="button"
              variant="outline"
              className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
            >
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
