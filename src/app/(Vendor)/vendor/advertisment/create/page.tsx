"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Upload,
  Calendar,
  DollarSign,
  Target,
  ImageIcon,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export default function CreateAdRequest() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<{
    adType: string
    entityType: string
    entityId: string
    adTitle: string
    adDescription: string
    price: string
    duration: string
    startDate: string
    targetAudience: string[]
    adImage: File | null
    termsAccepted: boolean
  }>({
    adType: "",
    entityType: "",
    entityId: "",
    adTitle: "",
    adDescription: "",
    price: "",
    duration: "",
    startDate: "",
    targetAudience: [],
    adImage: null,
    termsAccepted: false,
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const adTypePricing = {
    Featured: { price: 299, description: "Premium placement on homepage and search results" },
    Sponsored: { price: 199, description: "Highlighted in relevant search results" },
  }

  const entityTypes = [
    { value: "Farmhouse", label: "Farmhouse", icon: "🏡" },
    { value: "Venue", label: "Wedding Venue", icon: "💒" },
    { value: "Photography Package", label: "Photography Package", icon: "📸" },
    { value: "Catering Package", label: "Catering Package", icon: "🍽️" },
  ]

  const targetAudienceOptions = [
    "Wedding Planners",
    "Event Organizers",
    "Couples Planning Wedding",
    "Corporate Event Managers",
    "Birthday Party Planners",
    "Anniversary Celebrations",
    "Photography Enthusiasts",
    "Catering Professionals",
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData)
    // In real app, this would call your createAdRequest API
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.adType && formData.entityType && formData.entityId
      case 2:
        return formData.adTitle && formData.adDescription
      case 3:
        return formData.price && formData.duration && formData.startDate
      case 4:
        return formData.termsAccepted
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-orange-50 border-b border-orange-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button variant="ghost" className="mr-4 text-orange-600 hover:text-orange-700 hover:bg-orange-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Advertisement Request</h1>
              <p className="text-gray-600">Submit your service for advertisement approval</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <progress value={progress} className="h-2" />

          <div className="flex justify-between mt-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                <span className="text-xs mt-1 text-gray-500">
                  {step === 1 && "Service Details"}
                  {step === 2 && "Ad Content"}
                  {step === 3 && "Budget & Timeline"}
                  {step === 4 && "Review & Submit"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {/* Step 1: Service Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Service Details</h3>
                  <p className="text-gray-600 mb-6">
                    Select the type of advertisement and service you want to promote.
                  </p>
                </div>

                {/* Ad Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Advertisement Type</Label>
                  <RadioGroup
                    value={formData.adType}
                    onValueChange={(value) => setFormData({ ...formData, adType: value })}
                  >
                    {Object.entries(adTypePricing).map(([type, info]) => (
                      <div key={type} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-orange-50">
                        <RadioGroupItem value={type} id={type} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={type} className="font-medium cursor-pointer">
                              {type}
                            </Label>
                            <Badge variant="outline" className="text-orange-600 border-orange-300">
                              ${info.price}/month
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Service Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Service Type</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {entityTypes.map((entity) => (
                      <div
                        key={entity.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.entityType === entity.value
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                        onClick={() => setFormData({ ...formData, entityType: entity.value })}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{entity.icon}</div>
                          <div className="font-medium">{entity.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="entityId">Select Your Service</Label>
                  <Select
                    value={formData.entityId}
                    onValueChange={(value) => setFormData({ ...formData, entityId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose from your existing services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service1">Garden Paradise Wedding Venue</SelectItem>
                      <SelectItem value="service2">Rustic Farmhouse Experience</SelectItem>
                      <SelectItem value="service3">Professional Wedding Photography</SelectItem>
                      <SelectItem value="service4">Gourmet Catering Package</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    Don't see your service?{" "}
                    <a href="#" className="text-orange-600 hover:underline">
                      Add a new service first
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Ad Content */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Advertisement Content</h3>
                  <p className="text-gray-600 mb-6">Create compelling content that will attract potential customers.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adTitle">Advertisement Title *</Label>
                    <Input
                      id="adTitle"
                      placeholder="e.g., Luxury Wedding Venue with Garden Views"
                      value={formData.adTitle}
                      onChange={(e) => setFormData({ ...formData, adTitle: e.target.value })}
                      className="focus:ring-orange-500 focus:border-orange-500"
                    />
                    <p className="text-sm text-gray-500">Keep it under 60 characters for best visibility</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adDescription">Advertisement Description *</Label>
                    <Textarea
                      id="adDescription"
                      placeholder="Describe what makes your service special. Highlight key features, benefits, and what sets you apart from competitors..."
                      rows={4}
                      value={formData.adDescription}
                      onChange={(e) => setFormData({ ...formData, adDescription: e.target.value })}
                      className="focus:ring-orange-500 focus:border-orange-500"
                    />
                    <p className="text-sm text-gray-500">{formData.adDescription.length}/500 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Advertisement Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB. Recommended size: 1200x630px</p>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Content Guidelines</AlertTitle>
                    <AlertDescription>
                      Ensure your content is accurate, professional, and complies with our advertising policies.
                      Misleading information may result in ad rejection.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Budget & Timeline</h3>
                  <p className="text-gray-600 mb-6">Set your advertising budget and campaign duration.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Campaign Budget ($) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          className="pl-10 focus:ring-orange-500 focus:border-orange-500"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                      </div>
                      {formData.adType && (
                        <p className="text-sm text-gray-500">
                          Minimum budget for {formData.adType}: $
                          {adTypePricing[formData.adType as keyof typeof adTypePricing]?.price}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Campaign Duration *</Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) => setFormData({ ...formData, duration: value })}
                      >
                        <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 Days - $50/day</SelectItem>
                          <SelectItem value="14">14 Days - $45/day</SelectItem>
                          <SelectItem value="30">30 Days - $40/day (Popular)</SelectItem>
                          <SelectItem value="60">60 Days - $35/day (Best Value)</SelectItem>
                          <SelectItem value="90">90 Days - $30/day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Campaign Start Date *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="startDate"
                          type="date"
                          className="pl-10 focus:ring-orange-500 focus:border-orange-500"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-800 mb-2">Campaign Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Ad Type:</span>
                          <span className="font-medium">{formData.adType || "Not selected"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">
                            {formData.duration ? `${formData.duration} days` : "Not selected"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Budget:</span>
                          <span className="font-medium">${formData.price || "0.00"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Target Audience (Optional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {targetAudienceOptions.map((audience) => (
                      <div key={audience} className="flex items-center space-x-2">
                        <Checkbox
                          id={audience}
                          checked={formData.targetAudience.includes(audience)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                targetAudience: [...formData.targetAudience, audience],
                              })
                            } else {
                              setFormData({
                                ...formData,
                                targetAudience: formData.targetAudience.filter((item) => item !== audience),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={audience} className="text-sm cursor-pointer">
                          {audience}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    <Target className="inline h-4 w-4 mr-1" />
                    Selecting target audiences helps improve ad relevance and performance
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
                  <p className="text-gray-600 mb-6">Please review your advertisement request before submitting.</p>
                </div>

                <div className="space-y-6">
                  {/* Review Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Service Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ad Type:</span>
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            {formData.adType}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Type:</span>
                          <span className="font-medium">{formData.entityType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-medium">Selected Service</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Campaign Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-medium">${formData.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{formData.duration} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Start Date:</span>
                          <span className="font-medium">{formData.startDate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Advertisement Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-600 text-sm">Title:</span>
                          <p className="font-medium">{formData.adTitle || "No title provided"}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Description:</span>
                          <p className="text-sm">{formData.adDescription || "No description provided"}</p>
                        </div>
                        {formData.targetAudience.length > 0 && (
                          <div>
                            <span className="text-gray-600 text-sm">Target Audience:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {formData.targetAudience.map((audience) => (
                                <Badge key={audience} variant="secondary" className="text-xs">
                                  {audience}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important Information</AlertTitle>
                    <AlertDescription>
                      Your advertisement request will be reviewed by our admin team within 24-48 hours. You will receive
                      an email notification once your request is approved or if any changes are needed. Payment will be
                      processed only after approval.
                    </AlertDescription>
                  </Alert>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: !!checked })}
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I agree to the{" "}
                      <a href="#" className="text-orange-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-orange-600 hover:underline">
                        Advertising Policies
                      </a>
                    </Label>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
          >
            Previous
          </Button>

          <div className="flex space-x-3">
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Submit Request
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
