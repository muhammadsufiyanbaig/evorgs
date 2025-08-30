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
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Add Vendor Response
        </CardTitle>
        <CardDescription>Respond to this review as {vendorName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-3">
          <Label>Response Templates</Label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(responseTemplates).map(([key, template]) => (
              <Button
                key={key}
                variant={templateType === key ? "default" : "outline"}
                size="sm"
                onClick={() => handleTemplateSelect(key as ResponseTemplateType)}
                className="justify-start text-xs h-auto p-2"
              >
                {key.toLowerCase().replace("_", " ")}
              </Button>
            ))}
          </div>
          {templateType && (
            <Badge variant="secondary" className="text-xs">
              Using template: {templateType.toLowerCase().replace("_", " ")}
            </Badge>
          )}
        </div>

        {/* Response Text */}
        <div className="space-y-2">
          <Label htmlFor="response">Response Text *</Label>
          <Textarea
            id="response"
            placeholder="Write your response to this review..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            rows={6}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">{responseText.length}/1000 characters</p>
        </div>

        {/* Action Plan */}
        <div className="space-y-2">
          <Label htmlFor="actionPlan">Action Plan (Optional)</Label>
          <Textarea
            id="actionPlan"
            placeholder="Describe any specific actions you plan to take..."
            value={actionPlan}
            onChange={(e) => setActionPlan(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>

        {/* Compensation Offer */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="compensation"
            checked={offerCompensation}
            onChange={(e) => setOfferCompensation(e.target.checked)}
            className="rounded border-border"
          />
          <Label htmlFor="compensation" className="text-sm">
            This response includes a compensation offer
          </Label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!responseText.trim() || responseText.length > 1000}>
            <Send className="mr-2 h-4 w-4" />
            Send Response
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
