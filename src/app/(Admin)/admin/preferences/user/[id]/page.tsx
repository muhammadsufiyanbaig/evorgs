"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, RotateCcw, User, Bell, Mail, Calendar, Activity } from "lucide-react"
import { toast } from "sonner"

// Mock data - in real app this would come from GraphQL
const mockUser = {
  id: "1",
  userId: "user_001",
  email: "john.doe@example.com",
  name: "John Doe",
  pushNotifications: true,
  emailNotifications: false,
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-20T14:45:00Z",
  lastActive: "2024-01-25T09:15:00Z",
}

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const router = useRouter()
  const [user, setUser] = useState(mockUser)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // In real app, this would call GraphQL mutation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("User preferences updated successfully")
    } catch (error) {
      toast.error("Failed to update user preferences")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setUser(mockUser)
    toast.info("Preferences reset to original values")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.back()}
            className="border-orange-200 text-orange-700 hover:bg-orange-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-orange-900">Edit User Preferences</h1>
            <p className="text-orange-700">Manage notification settings for {user.name}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* User Information */}
          <Card className="bg-white border-orange-200 shadow-lg">
            <CardHeader className="bg-orange-100 border-b border-orange-200">
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <User className="w-5 h-5 text-primary" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <Label className="text-sm font-medium text-orange-600">Name</Label>
                <p className="font-medium text-orange-900">{user.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-orange-600">Email</Label>
                <p className="font-medium text-orange-900">{user.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-orange-600">User ID</Label>
                <p className="font-mono text-sm text-orange-800">{user.userId}</p>
              </div>
              <Separator className="bg-orange-200" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-sm font-medium text-orange-600">Created</Label>
                </div>
                <p className="text-sm text-orange-800">{formatDate(user.createdAt)}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-sm font-medium text-orange-600">Last Active</Label>
                </div>
                <p className="text-sm text-orange-800">{formatDate(user.lastActive)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="lg:col-span-2 bg-white border-orange-200 shadow-lg">
            <CardHeader className="bg-orange-100 border-b border-orange-200">
              <CardTitle className="text-orange-900">Notification Preferences</CardTitle>
              <CardDescription className="text-orange-700">Configure how this user receives notifications from the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Push Notifications */}
              <div className="flex items-start justify-between space-x-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" />
                    <Label className="text-base font-medium text-orange-900">Push Notifications</Label>
                    <Badge 
                      variant={user.pushNotifications ? "default" : "secondary"}
                      className={user.pushNotifications ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-700"}
                    >
                      {user.pushNotifications ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-orange-700">
                    Receive real-time notifications on mobile devices and desktop browsers
                  </p>
                  <div className="text-xs text-orange-600">
                    Includes order updates, promotional offers, and system alerts
                  </div>
                </div>
                <Switch
                  checked={user.pushNotifications}
                  onCheckedChange={(checked) => setUser({ ...user, pushNotifications: checked })}
                  className="data-[state=checked]:bg-orange-600"
                />
              </div>

              <Separator className="bg-orange-200" />

              {/* Email Notifications */}
              <div className="flex items-start justify-between space-x-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <Label className="text-base font-medium text-orange-900">Email Notifications</Label>
                    <Badge 
                      variant={user.emailNotifications ? "default" : "secondary"}
                      className={user.emailNotifications ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-700"}
                    >
                      {user.emailNotifications ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-orange-700">Receive notifications via email at {user.email}</p>
                  <div className="text-xs text-orange-600">
                    Includes weekly summaries, important updates, and marketing communications
                  </div>
                </div>
                <Switch
                  checked={user.emailNotifications}
                  onCheckedChange={(checked) => setUser({ ...user, emailNotifications: checked })}
                  className="data-[state=checked]:bg-orange-600"
                />
              </div>

              <Separator className="bg-orange-200" />

              {/* Current Status Summary */}
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium mb-2 text-orange-900">Current Configuration</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-orange-600">Push Notifications:</span>
                    <span className={`ml-2 font-medium ${user.pushNotifications ? "text-green-600" : "text-red-600"}`}>
                      {user.pushNotifications ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div>
                    <span className="text-orange-600">Email Notifications:</span>
                    <span className={`ml-2 font-medium ${user.emailNotifications ? "text-green-600" : "text-red-600"}`}>
                      {user.emailNotifications ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-orange-600">Last updated: {formatDate(user.updatedAt)}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="border-orange-200 text-orange-700 hover:bg-orange-100"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Changes
                </Button>
                <Button 
                  onClick={handleSave} 
                  disabled={isLoading}
                  className="bg-orange-600 text-white hover:bg-orange-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
