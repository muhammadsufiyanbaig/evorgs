"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, X } from "lucide-react"
import type { ResponseTemplateType } from "@/utils/interfaces"

interface ResponseFormProps {
  reviewId: string
  vendorName: string
  onSubmit: (response: {
    responseText: string
    templateType?: ResponseTemplateType
    actionPlan?: string
    offerCompensation?: boolean
  }) => void
  onCancel: () => void
}

const responseTemplates = {
  THANK_YOU:
    "Thank you so much for your wonderful review! We're thrilled that you had a great experience with our service. Your feedback means the world to us and motivates our team to continue providing excellent service.",
  ADDRESS_CONCERNS:
    "Thank you for your feedback. We take all reviews seriously and would like to address your concerns. We're committed to improving our service and would appreciate the opportunity to make things right.",
  APOLOGIZE:
    "We sincerely apologize for the experience you had with our service. This is not the standard we strive for, and we take full responsibility. We would like to discuss this further and find a way to resolve the situation.",
  CLARIFY:
    "Thank you for your review. We'd like to provide some clarification regarding your experience and ensure we address any misunderstandings. Your feedback helps us improve our communication and service delivery.",
  INVITE_CONTACT:
    "Thank you for taking the time to share your feedback. We would love to discuss your experience further and see how we can improve. Please feel free to contact us directly so we can address your concerns personally.",
}

export function ResponseForm({ reviewId, vendorName, onSubmit, onCancel }: ResponseFormProps) {
  const [responseText, setResponseText] = useState("")
  const [templateType, setTemplateType] = useState<ResponseTemplateType | "">("")
  const [actionPlan, setActionPlan] = useState("")
  const [offerCompensation, setOfferCompensation] = useState(false)

  const handleTemplateSelect = (template: ResponseTemplateType) => {
    setTemplateType(template)
    if (template in responseTemplates) {
      setResponseText(responseTemplates[template as keyof typeof responseTemplates])
    }
  }

  const handleSubmit = () => {
    if (!responseText.trim()) return

    onSubmit({
      responseText: responseText.trim(),
      templateType: templateType || undefined,
      actionPlan: actionPlan.trim() || undefined,
      offerCompensation,
    })
  }

  return (
    <Card className="w-full max-w-2xl bg-white border-orange-200 shadow-lg">
      <CardHeader className="bg-orange-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-white">
          <MessageSquare className="h-5 w-5" />
          Add Vendor Response
        </CardTitle>
        <CardDescription className="text-orange-100">
          Respond to this review as {vendorName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 bg-white p-6">
        {/* Template Selection */}
        <div className="space-y-3">
          <Label className="text-orange-800 font-medium">Response Templates</Label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(responseTemplates).map(([key, template]) => (
              <Button
                key={key}
                variant={templateType === key ? "default" : "outline"}
                size="sm"
                onClick={() => handleTemplateSelect(key as ResponseTemplateType)}
                className={`justify-start text-xs h-auto p-2 ${
                  templateType === key
                    ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                    : "border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 bg-white"
                }`}
              >
                {key.toLowerCase().replace("_", " ")}
              </Button>
            ))}
          </div>
          {templateType && (
            <Badge className="text-xs bg-orange-100 text-orange-800 border-orange-300">
              Using template: {templateType.toLowerCase().replace("_", " ")}
            </Badge>
          )}
        </div>

        {/* Response Text */}
        <div className="space-y-2">
          <Label htmlFor="response" className="text-orange-800 font-medium">
            Response Text *
          </Label>
          <Textarea
            id="response"
            placeholder="Write your response to this review..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            rows={6}
            className="resize-none border-orange-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
          />
          <p className="text-xs text-orange-600">{responseText.length}/1000 characters</p>
        </div>

        {/* Action Plan */}
        <div className="space-y-2">
          <Label htmlFor="actionPlan" className="text-orange-800 font-medium">
            Action Plan (Optional)
          </Label>
          <Textarea
            id="actionPlan"
            placeholder="Describe any specific actions you plan to take..."
            value={actionPlan}
            onChange={(e) => setActionPlan(e.target.value)}
            rows={3}
            className="resize-none border-orange-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
          />
        </div>

        {/* Compensation Offer */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="compensation"
            checked={offerCompensation}
            onChange={(e) => setOfferCompensation(e.target.checked)}
            className="rounded border-orange-300 text-orange-500 focus:ring-orange-500 focus:ring-offset-white"
          />
          <Label htmlFor="compensation" className="text-sm text-orange-800">
            This response includes a compensation offer
          </Label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-orange-200">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 bg-white"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!responseText.trim() || responseText.length > 1000}
            className="bg-orange-500 hover:bg-orange-600 text-white disabled:bg-orange-300 disabled:text-white"
          >
            <Send className="mr-2 h-4 w-4" />
            Send Response
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
