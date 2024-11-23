'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, Eye, EyeOff, X } from 'lucide-react'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const isPasswordStrong = (password: string) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasNonalphas = /\W/.test(password)
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!isPasswordStrong(password)) {
      setError('Password does not meet the strength requirements.')
      return
    }
    setIsSubmitting(true)
    setError('')

    // Simulate API call
    try {
      // Replace this with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSuccess(true)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Alert className="max-w-md mx-auto mt-8">
        <Check className="h-4 w-4" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your password has been reset successfully. You can now log in with your new password.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-orange-600">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 relative">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOff className="h-5 w-5 text-gray-600" /> : <Eye className="h-5 w-5 text-gray-600" />}
              </button>
            </div>
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              >
                {isConfirmPasswordVisible ? <EyeOff className="h-5 w-5 text-gray-600" /> : <Eye className="h-5 w-5 text-gray-600" />}
              </button>
            </div>
          </div>
          <div className="text-sm space-y-1">
            <p>Password must:</p>
            <ul className="list-inside space-y-1">
              <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : 'text-red-600'}`}>
                {password.length >= 8 ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                Be at least 8 characters long
              </li>
              <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                {/[A-Z]/.test(password) ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                Contain at least one uppercase letter
              </li>
              <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                {/[a-z]/.test(password) ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                Contain at least one lowercase letter
              </li>
              <li className={`flex items-center ${/\d/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                {/\d/.test(password) ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                Contain at least one number
              </li>
              <li className={`flex items-center ${/\W/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                {/\W/.test(password) ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                Contain at least one special character
              </li>
            </ul>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  )
}
