"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"

interface VendorSuspensionDialogProps {
    vendor: any
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuspend: (reason: string, duration?: number) => void
}

export function VendorSuspensionDialog({ vendor, open, onOpenChange, onSuspend }: VendorSuspensionDialogProps) {
    const [reason, setReason] = useState("")
    const [customReason, setCustomReason] = useState("")
    const [duration, setDuration] = useState("")
    const [suspendVouchers, setSuspendVouchers] = useState(true)

    const predefinedReasons = [
        "Multiple fraud incidents detected",
        "Terms of service violation",
        "Poor customer service ratings",
        "Suspicious voucher activity",
        "Non-compliance with platform policies",
        "Custom reason",
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const finalReason = reason === "Custom reason" ? customReason : reason
        const suspensionDuration = duration ? Number.parseInt(duration) : undefined
        onSuspend(finalReason, suspensionDuration)

        // Reset form
        setReason("")
        setCustomReason("")
        setDuration("")
        setSuspendVouchers(true)
    }

    if (!vendor) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-white border-orange-200">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-orange-600">
                        <AlertTriangle className="h-5 w-5" />
                        Suspend Vendor
                    </DialogTitle>
                    <DialogDescription className="text-orange-700">
                        You are about to suspend <strong className="text-orange-800">{vendor.name}</strong>. This action will affect their ability to create and
                        manage vouchers.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="reason" className="text-orange-800">Suspension Reason</Label>
                        <Select value={reason} onValueChange={setReason} required>
                            <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                                <SelectValue placeholder="Select a reason for suspension" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-orange-200">
                                {predefinedReasons.map((reasonOption) => (
                                    <SelectItem key={reasonOption} value={reasonOption} className="hover:bg-orange-50 focus:bg-orange-50">
                                        {reasonOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {reason === "Custom reason" && (
                        <div>
                            <Label htmlFor="customReason" className="text-orange-800">Custom Reason</Label>
                            <Textarea
                                id="customReason"
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                                placeholder="Provide detailed reason for suspension..."
                                required
                                rows={3}
                                className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                            />
                        </div>
                    )}

                    <div>
                        <Label htmlFor="duration" className="text-orange-800">Suspension Duration (days)</Label>
                        <Input
                            id="duration"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Leave empty for indefinite suspension"
                            min="1"
                            max="365"
                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        />
                        <p className="text-xs text-orange-600 mt-1">Leave empty for indefinite suspension</p>
                    </div>

                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                        <h4 className="text-sm font-medium mb-2 text-orange-800">Suspension Effects:</h4>
                        <ul className="text-xs text-orange-700 space-y-1">
                            <li>• Vendor will be unable to create new vouchers</li>
                            <li>• Existing active vouchers will be deactivated</li>
                            <li>• Vendor dashboard access will be restricted</li>
                            <li>• Customers cannot use this vendor's vouchers</li>
                        </ul>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => onOpenChange(false)}
                            className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!reason || (reason === "Custom reason" && !customReason)}
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                            Suspend Vendor
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
