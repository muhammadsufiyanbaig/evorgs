"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Bell, Shield, Trash2, ArrowLeft, RotateCcw, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth, useAuthUser, useAuthLoading, useAuthUserType } from "@/hooks/useAuth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { User } from "@/utils/graphql/auth"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const router = useRouter()
  const { deleteUserAccount } = useAuth()
  const authUser = useAuthUser()
  const userType = useAuthUserType()
  const isLoading = useAuthLoading()
  
  // Ensure we're dealing with a User type
  const user = (userType === 'User' ? authUser : null) as User | null

  const [preferences, setPreferences] = useState({
    pushNotifications: true,
    emailNotifications: true,
  })

  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
    // Would integrate with your updateUserPreferences functionality
    toast.success(`${key === 'pushNotifications' ? 'Push' : 'Email'} notifications ${value ? 'enabled' : 'disabled'}`)
  }

  const handleResetPreferences = () => {
    setPreferences({
      pushNotifications: true,
      emailNotifications: true,
    })
    toast.success("Preferences reset to default")
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount()
      toast.success("Account deleted successfully")
      router.push("/")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete account")
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/profile">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your account preferences and settings</p>
          </div>
        </div>

        {/* Notification Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications" className="text-base">
                  Push Notifications
                </Label>
                <div className="text-sm text-muted-foreground">Receive push notifications on your device</div>
              </div>
              <input
                type="checkbox"
                id="push-notifications"
                checked={preferences.pushNotifications}
                onChange={(e) => handlePreferenceChange("pushNotifications", e.target.checked)}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="text-base">
                  Email Notifications
                </Label>
                <div className="text-sm text-muted-foreground">Receive notifications via email</div>
              </div>
              <input
                type="checkbox"
                id="email-notifications"
                checked={preferences.emailNotifications}
                onChange={(e) => handlePreferenceChange("emailNotifications", e.target.checked)}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Account Security
            </CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Email Verification</h3>
                <p className="text-sm text-muted-foreground">Your email address is verified</p>
              </div>
              <Badge variant="default" className="bg-orange-100 text-orange-800 border-orange-200">
                {user?.isVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent">
                Change Password
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Reset Password</h3>
                <p className="text-sm text-muted-foreground">Send password reset email</p>
              </div>
              <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent">
                Reset Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Preferences Management</CardTitle>
            <CardDescription>Reset or manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Reset Preferences</h3>
                <p className="text-sm text-muted-foreground">Reset all preferences to their default values</p>
              </div>
              <Button
                variant="outline"
                onClick={handleResetPreferences}
                className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Default
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible actions that will permanently affect your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-destructive">Delete Account</h3>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteAccount}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
