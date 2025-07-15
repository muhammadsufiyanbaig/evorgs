"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Send, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const ticketTypes = [
  { value: "Account", label: "Account Issues", description: "Login, profile, or account-related problems" },
  { value: "Booking", label: "Booking Support", description: "Reservation, scheduling, or booking issues" },
  { value: "Payment", label: "Payment Issues", description: "Billing, refunds, or payment problems" },
  { value: "Technical", label: "Technical Support", description: "App bugs, performance, or technical issues" },
  { value: "Feature", label: "Feature Request", description: "Suggestions for new features or improvements" },
  { value: "Other", label: "Other", description: "General inquiries or other topics" },
]

const priorities = [
  { value: "Low", label: "Low", color: "bg-green-100 text-green-800" },
  { value: "Medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "High", label: "High", color: "bg-orange-100 text-orange-800" },
  { value: "Urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
]

export default function CreateSupportTicket() {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    ticketType: "",
    priority: "Medium",
  })
  const [attachments, setAttachments] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments((prev) => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitStatus("success")

      // Reset form after success
      setTimeout(() => {
        setFormData({ subject: "", description: "", ticketType: "", priority: "Medium" })
        setAttachments([])
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.subject.trim() && formData.description.trim() && formData.ticketType

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="max-w-2xl mt-16 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Support Ticket</h1>
          <p className="text-gray-600">We're here to help! Describe your issue and we'll get back to you soon.</p>
        </div>

        {submitStatus === "success" && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your support ticket has been created successfully! We'll respond within 24 hours.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              There was an error creating your ticket. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">Support Request Details</CardTitle>
            <CardDescription className="text-orange-100">
              Please provide as much detail as possible to help us assist you better
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Ticket Type */}
              <div className="space-y-2">
                <Label htmlFor="ticketType" className="text-sm font-medium text-gray-700">
                  Issue Category *
                </Label>
                <Select value={formData.ticketType} onValueChange={(value) => handleInputChange("ticketType", value)}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Select the type of issue" />
                  </SelectTrigger>
                  <SelectContent>
                    {ticketTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{type.label}</span>
                          <span className="text-xs text-gray-500">{type.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                  Priority Level
                </Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={`${priority.color} text-xs`}>{priority.label}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Detailed Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your issue in detail. Include any error messages, steps to reproduce, or relevant information..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-[120px] border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              {/* File Attachments */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Attachments (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-400 transition-colors">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-sm text-gray-600 mb-2">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-orange-600 hover:text-orange-500 font-medium"
                      >
                        Click to upload files
                      </label>{" "}
                      or drag and drop
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB each</p>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Attachment List */}
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Attached Files:</p>
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Ticket...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Create Support Ticket
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Need immediate help?</h3>
                <p className="text-sm text-gray-600">
                  For urgent issues, you can also reach us at{" "}
                  <a href="mailto:support@company.com" className="text-orange-600 hover:text-orange-700 font-medium">
                    support@company.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+1234567890" className="text-orange-600 hover:text-orange-700 font-medium">
                    (123) 456-7890
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
