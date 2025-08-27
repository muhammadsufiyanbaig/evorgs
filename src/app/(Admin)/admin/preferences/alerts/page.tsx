"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Mail, Users, Store } from "lucide-react"

export default function NotificationsPage() {
    return (
        <div className="space-y-8 bg-white min-h-screen p-6">
            <div>
                <h1 className="text-3xl font-bold text-orange-600 text-balance">Notification Management</h1>
                <p className="mt-2 text-orange-500 text-pretty">
                    Send and manage notifications to users and vendors across the platform.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-white border-orange-200 shadow-lg">
                    <CardHeader className="bg-orange-50">
                        <CardTitle className="flex items-center gap-2 text-orange-700">
                            <Users className="w-5 h-5 text-primary" />
                            User Notifications
                        </CardTitle>
                        <CardDescription className="text-orange-600">Send notifications to users</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white">
                        <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white">
                            <Bell className="w-4 h-4 mr-2" />
                            Send Push Notification
                        </Button>
                        <Button className="w-full justify-start border-orange-300 text-orange-600 hover:bg-orange-50" variant="outline">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email Notification
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white border-orange-200 shadow-lg">
                    <CardHeader className="bg-orange-50">
                        <CardTitle className="flex items-center gap-2 text-orange-700">
                            <Store className="w-5 h-5 text-primary" />
                            Vendor Notifications
                        </CardTitle>
                        <CardDescription className="text-orange-600">Send notifications to vendors</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 bg-white">
                        <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white">
                            <Bell className="w-4 h-4 mr-2" />
                            Send Push Notification
                        </Button>
                        <Button className="w-full justify-start border-orange-300 text-orange-600 hover:bg-orange-50" variant="outline">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email Notification
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
