"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, ArrowLeft, CheckCircle, XCircle } from "lucide-react"

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const validatePassword = (password: string) => {
    const minLength = password.length >= 16
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasNoSpaces = !/\s/.test(password)
    const hasMultipleNumbers = (password.match(/\d/g) || []).length >= 2
    const hasMultipleSpecialChars = (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length >= 2

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      hasNoSpaces,
      hasMultipleNumbers,
      hasMultipleSpecialChars,
      isValid:
        minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar &&
        hasNoSpaces &&
        hasMultipleNumbers &&
        hasMultipleSpecialChars,
    }
  }

  const passwordValidation = validatePassword(formData.newPassword)

  const getPasswordStrength = () => {
    const validCount = Object.values(passwordValidation).filter(Boolean).length - 1 // Exclude isValid
    if (validCount <= 2) return { strength: "Weak", color: "text-red-600", bgColor: "bg-red-100" }
    if (validCount <= 5) return { strength: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-100" }
    if (validCount <= 7) return { strength: "Strong", color: "text-orange-600", bgColor: "bg-orange-100" }
    return { strength: "Very Strong", color: "text-green-600", bgColor: "bg-green-100" }
  }

  const strengthInfo = getPasswordStrength()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match")
      setLoading(false)
      return
    }

    if (!passwordValidation.isValid) {
      setError("Please ensure your new password meets all security requirements")
      setLoading(false)
      return
    }

    try {
      // GraphQL mutation call would go here
      // const result = await adminChangePassword({
      //   input: {
      //     currentPassword: formData.currentPassword,
      //     newPassword: formData.newPassword
      //   }
      // })
      console.log("Changing password...")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      setError("Failed to change password. Please check your current password and try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Password Changed Successfully</CardTitle>
              <CardDescription>Your password has been updated successfully</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col space-y-4">
              <Link href="/admin/dashboard" className="w-full">
                <Button className="w-full">Back to Dashboard</Button>
              </Link>
              <Link href="/admin/login" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  Sign In Again
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Change Password</h1>
          <p className="text-muted-foreground">Update your account password with enhanced security</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
            <CardDescription>
              Enter your current password and choose a new secure password (minimum 16 characters)
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    placeholder="Enter current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility("current")}
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    placeholder="Enter new secure password (min 16 characters)"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium">Password Strength:</span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${strengthInfo.bgColor} ${strengthInfo.color}`}
                      >
                        {strengthInfo.strength}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          strengthInfo.strength === "Weak"
                            ? "bg-red-500 w-1/4"
                            : strengthInfo.strength === "Medium"
                              ? "bg-yellow-500 w-2/4"
                              : strengthInfo.strength === "Strong"
                                ? "bg-orange-500 w-3/4"
                                : "bg-green-500 w-full"
                        }`}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Enhanced Password Requirements */}
                {formData.newPassword && (
                  <div className="text-xs space-y-1 mt-3 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Security Requirements:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      <div
                        className={`flex items-center ${passwordValidation.minLength ? "text-green-600" : "text-red-600"}`}
                      >
                        {passwordValidation.minLength ? (
                          <CheckCircle className="h-3 w-3 mr-2" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-2" />
                        )}
                        At least 16 characters ({formData.newPassword.length}/16)
                      </div>
                      <div
                        className={`flex items-center ${passwordValidation.hasUpperCase ? "text-green-600" : "text-red-600"}`}
                      >
                        {passwordValidation.hasUpperCase ? (
                          <CheckCircle className="h-3 w-3 mr-2" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-2" />
                        )}
                        At least one uppercase letter (A-Z)
                      </div>
                      <div
                        className={`flex items-center ${passwordValidation.hasLowerCase ? "text-green-600" : "text-red-600"}`}
                      >
                        {passwordValidation.hasLowerCase ? (
                          <CheckCircle className="h-3 w-3 mr-2" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-2" />
                        )}
                        At least one lowercase letter (a-z)
                      </div>
                      <div
                        className={`flex items-center ${passwordValidation.hasMultipleNumbers ? "text-green-600" : "text-red-600"}`}
                      >
                        {passwordValidation.hasMultipleNumbers ? (
                          <CheckCircle className="h-3 w-3 mr-2" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-2" />
                        )}
                        At least two numbers (0-9)
                      </div>
                      <div
                        className={`flex items-center ${passwordValidation.hasMultipleSpecialChars ? "text-green-600" : "text-red-600"}`}
                      >
                        {passwordValidation.hasMultipleSpecialChars ? (
                          <CheckCircle className="h-3 w-3 mr-2" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-2" />
                        )}
                        At least two special characters (!@#$%^&*(),.?":{}|{`<>`})
                      </div>
                      <div
                        className={`flex items-center ${passwordValidation.hasNoSpaces ? "text-green-600" : "text-red-600"}`}
                      >
                        {passwordValidation.hasNoSpaces ? (
                          <CheckCircle className="h-3 w-3 mr-2" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-2" />
                        )}
                        No spaces allowed
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                  <div className="flex items-center text-red-600 text-xs">
                    <XCircle className="h-3 w-3 mr-1" />
                    Passwords do not match
                  </div>
                )}
                {formData.confirmPassword &&
                  formData.newPassword === formData.confirmPassword &&
                  formData.confirmPassword.length > 0 && (
                    <div className="flex items-center text-green-600 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Passwords match
                    </div>
                  )}
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading || !passwordValidation.isValid}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Change Password
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Security Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">🔒 Password Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Use a unique password that you don't use anywhere else
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Consider using a passphrase with numbers and symbols
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Avoid using personal information like names or dates
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Store your password securely using a password manager
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
