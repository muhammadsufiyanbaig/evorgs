"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Settings,
    Shield,
    Database,
    Mail,
    Smartphone,
    Globe,
    Clock,
    Users,
    Store,
    AlertTriangle,
    CheckCircle,
    Save,
    RefreshCw,
    Download,
    Trash2,
} from "lucide-react"

const systemStats = [
    {
        name: "System Uptime",
        value: "99.9%",
        status: "healthy",
        icon: CheckCircle,
    },
    {
        name: "Database Status",
        value: "Connected",
        status: "healthy",
        icon: Database,
    },
    {
        name: "API Response Time",
        value: "145ms",
        status: "healthy",
        icon: Globe,
    },
    {
        name: "Background Jobs",
        value: "Running",
        status: "healthy",
        icon: RefreshCw,
    },
]

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        // General Settings
        systemName: "Preference Management System",
        systemDescription: "Comprehensive user and vendor preference management",
        maintenanceMode: false,
        debugMode: false,

        // Default Preferences
        defaultUserPushNotifications: true,
        defaultUserEmailNotifications: false,
        defaultVendorPushNotifications: true,
        defaultVendorEmailNotifications: true,
        defaultVendorSearchVisibility: true,
        defaultVendorReviewVisibility: true,

        // Notification Settings
        emailProvider: "smtp",
        smtpHost: "smtp.example.com",
        smtpPort: "587",
        smtpUsername: "admin@example.com",
        smtpPassword: "",
        pushNotificationProvider: "firebase",
        firebaseServerKey: "",

        // Security Settings
        sessionTimeout: "24",
        maxLoginAttempts: "5",
        passwordMinLength: "8",
        requireTwoFactor: false,
        allowBulkOperations: true,

        // System Limits
        maxUsersPerBatch: "100",
        maxVendorsPerBatch: "50",
        apiRateLimit: "1000",
        dataRetentionDays: "365",
    })

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    const handleSettingChange = (key: string, value: any) => {
        setSettings((prev) => ({ ...prev, [key]: value }))
        setHasUnsavedChanges(true)
    }

    const handleSaveSettings = () => {
        // In real app, this would call API to save settings
        console.log("Saving settings:", settings)
        setHasUnsavedChanges(false)
    }

    const handleResetSettings = () => {
        // Reset to default values
        setHasUnsavedChanges(false)
    }

    const handleExportSettings = () => {
        // Export settings as JSON
        const dataStr = JSON.stringify(settings, null, 2)
        const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
        const exportFileDefaultName = "preference-system-settings.json"
        const linkElement = document.createElement("a")
        linkElement.setAttribute("href", dataUri)
        linkElement.setAttribute("download", exportFileDefaultName)
        linkElement.click()
    }

    const handleExportToPDF = () => {
        const printContent = `
            <html>
                <head>
                    <title>System Settings Configuration Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; background-color: white; color: #1a1a1a; }
                        h1 { color: #ea580c; margin-bottom: 20px; }
                        h2 { color: #f97316; margin-top: 30px; margin-bottom: 15px; }
                        h3 { color: #fb923c; margin-top: 20px; margin-bottom: 10px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #fed7aa; padding: 8px; text-align: left; }
                        th { background-color: #f97316; color: white; }
                        .stats { display: flex; gap: 20px; margin: 20px 0; }
                        .stat-card { border: 1px solid #fed7aa; padding: 15px; border-radius: 5px; background-color: #fff7ed; }
                        .enabled { color: #16a34a; font-weight: bold; }
                        .disabled { color: #dc2626; font-weight: bold; }
                        .section { margin-bottom: 30px; }
                    </style>
                </head>
                <body>
                    <h1>System Settings Configuration Report</h1>
                    <p>Generated on: ${new Date().toLocaleDateString()}</p>
                    
                    <div class="stats">
                        ${systemStats
                            .map(
                                (stat) => `
                            <div class="stat-card">
                                <h3>${stat.name}</h3>
                                <p>${stat.value}</p>
                                <p><strong>Status:</strong> ${stat.status === "healthy" ? "Healthy" : "Issues"}</p>
                            </div>
                        `,
                            )
                            .join("")}
                    </div>

                    <div class="section">
                        <h2>General Settings</h2>
                        <table>
                            <tr><th>Setting</th><th>Value</th></tr>
                            <tr><td>System Name</td><td>${settings.systemName}</td></tr>
                            <tr><td>System Description</td><td>${settings.systemDescription}</td></tr>
                            <tr><td>Maintenance Mode</td><td class="${settings.maintenanceMode ? "enabled" : "disabled"}">${settings.maintenanceMode ? "Enabled" : "Disabled"}</td></tr>
                            <tr><td>Debug Mode</td><td class="${settings.debugMode ? "enabled" : "disabled"}">${settings.debugMode ? "Enabled" : "Disabled"}</td></tr>
                        </table>
                    </div>

                    <div class="section">
                        <h2>Default User Preferences</h2>
                        <table>
                            <tr><th>Setting</th><th>Value</th></tr>
                            <tr><td>Push Notifications</td><td class="${settings.defaultUserPushNotifications ? "enabled" : "disabled"}">${settings.defaultUserPushNotifications ? "Enabled" : "Disabled"}</td></tr>
                            <tr><td>Email Notifications</td><td class="${settings.defaultUserEmailNotifications ? "enabled" : "disabled"}">${settings.defaultUserEmailNotifications ? "Enabled" : "Disabled"}</td></tr>
                        </table>
                    </div>

                    <div class="section">
                        <h2>Default Vendor Preferences</h2>
                        <table>
                            <tr><th>Setting</th><th>Value</th></tr>
                            <tr><td>Push Notifications</td><td class="${settings.defaultVendorPushNotifications ? "enabled" : "disabled"}">${settings.defaultVendorPushNotifications ? "Enabled" : "Disabled"}</td></tr>
                            <tr><td>Email Notifications</td><td class="${settings.defaultVendorEmailNotifications ? "enabled" : "disabled"}">${settings.defaultVendorEmailNotifications ? "Enabled" : "Disabled"}</td></tr>
                            <tr><td>Search Visibility</td><td class="${settings.defaultVendorSearchVisibility ? "enabled" : "disabled"}">${settings.defaultVendorSearchVisibility ? "Enabled" : "Disabled"}</td></tr>
                            <tr><td>Review Visibility</td><td class="${settings.defaultVendorReviewVisibility ? "enabled" : "disabled"}">${settings.defaultVendorReviewVisibility ? "Enabled" : "Disabled"}</td></tr>
                        </table>
                    </div>

                    <div class="section">
                        <h2>Security Settings</h2>
                        <table>
                            <tr><th>Setting</th><th>Value</th></tr>
                            <tr><td>Session Timeout</td><td>${settings.sessionTimeout} hours</td></tr>
                            <tr><td>Max Login Attempts</td><td>${settings.maxLoginAttempts}</td></tr>
                            <tr><td>Password Min Length</td><td>${settings.passwordMinLength} characters</td></tr>
                            <tr><td>Two-Factor Authentication</td><td class="${settings.requireTwoFactor ? "enabled" : "disabled"}">${settings.requireTwoFactor ? "Required" : "Optional"}</td></tr>
                            <tr><td>Bulk Operations</td><td class="${settings.allowBulkOperations ? "enabled" : "disabled"}">${settings.allowBulkOperations ? "Allowed" : "Disabled"}</td></tr>
                        </table>
                    </div>

                    <div class="section">
                        <h2>System Limits</h2>
                        <table>
                            <tr><th>Setting</th><th>Value</th></tr>
                            <tr><td>Max Users Per Batch</td><td>${settings.maxUsersPerBatch}</td></tr>
                            <tr><td>Max Vendors Per Batch</td><td>${settings.maxVendorsPerBatch}</td></tr>
                            <tr><td>API Rate Limit</td><td>${settings.apiRateLimit} requests/hour</td></tr>
                            <tr><td>Data Retention</td><td>${settings.dataRetentionDays} days</td></tr>
                        </table>
                    </div>
                </body>
            </html>
        `

        const printWindow = window.open("", "_blank")
        if (printWindow) {
            printWindow.document.write(printContent)
            printWindow.document.close()
            printWindow.print()
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="space-y-8 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-orange-600 text-balance">Settings & Configuration</h1>
                        <p className="mt-2 text-gray-600 text-pretty">
                            Configure system settings, default preferences, and security options.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleExportSettings} className="border-orange-200 text-orange-700 hover:bg-orange-50">
                            <Download className="w-4 h-4 mr-2" />
                            Export JSON
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleExportToPDF} className="border-orange-200 text-orange-700 hover:bg-orange-50">
                            <Download className="w-4 h-4 mr-2" />
                            Export PDF
                        </Button>
                        {hasUnsavedChanges && (
                            <Button onClick={handleSaveSettings} className="bg-orange-600 hover:bg-orange-700 text-white">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        )}
                    </div>
                </div>

                {/* Unsaved Changes Alert */}
                {hasUnsavedChanges && (
                    <Alert className="border-orange-200 bg-orange-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="text-orange-800">Unsaved Changes</AlertTitle>
                        <AlertDescription className="text-orange-700">
                            You have unsaved changes. Don't forget to save your configuration before leaving this page.
                        </AlertDescription>
                    </Alert>
                )}

                {/* System Health */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {systemStats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <Card key={stat.name} className="border-orange-200 bg-white shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
                                    <Icon className={`h-4 w-4 ${stat.status === "healthy" ? "text-green-600" : "text-red-600"}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-orange-600">{stat.value}</div>
                                    <Badge variant={stat.status === "healthy" ? "default" : "destructive"} className={`text-xs mt-2 ${stat.status === "healthy" ? "bg-orange-100 text-orange-800 hover:bg-orange-200" : ""}`}>
                                        {stat.status === "healthy" ? "Healthy" : "Issues"}
                                    </Badge>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Settings Tabs */}
                <Card className="border-orange-200 bg-white shadow-sm">
                    <CardHeader className="bg-orange-50 border-b border-orange-200">
                        <CardTitle className="flex items-center gap-2 text-orange-600">
                            <Settings className="w-5 h-5" />
                            System Configuration
                        </CardTitle>
                        <CardDescription className="text-gray-600">Configure various aspects of the preference management system</CardDescription>
                    </CardHeader>
                    <CardContent className="bg-white">
                        <Tabs defaultValue="general" className="w-full">
                            <TabsList className="grid w-full grid-cols-5 bg-orange-50 border border-orange-200">
                                <TabsTrigger value="general" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-orange-700">General</TabsTrigger>
                                <TabsTrigger value="defaults" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-orange-700">Defaults</TabsTrigger>
                                <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-orange-700">Notifications</TabsTrigger>
                                <TabsTrigger value="security" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-orange-700">Security</TabsTrigger>
                                <TabsTrigger value="limits" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-orange-700">Limits</TabsTrigger>
                            </TabsList>

                            <TabsContent value="general" className="space-y-6 bg-white">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="systemName" className="text-orange-700 font-medium">System Name</Label>
                                        <Input
                                            id="systemName"
                                            value={settings.systemName}
                                            onChange={(e) => handleSettingChange("systemName", e.target.value)}
                                            className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="systemDescription" className="text-orange-700 font-medium">System Description</Label>
                                        <Textarea
                                            id="systemDescription"
                                            value={settings.systemDescription}
                                            onChange={(e) => handleSettingChange("systemDescription", e.target.value)}
                                            rows={3}
                                            className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>

                                    <Separator className="bg-orange-200" />

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label className="text-sm font-medium text-orange-700">Maintenance Mode</Label>
                                                <div className="text-xs text-gray-600">
                                                    Temporarily disable system access for maintenance
                                                </div>
                                            </div>
                                            <Switch
                                                checked={settings.maintenanceMode}
                                                onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                                                className="data-[state=checked]:bg-orange-600"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label className="text-sm font-medium text-orange-700">Debug Mode</Label>
                                                <div className="text-xs text-gray-600">Enable detailed logging and error reporting</div>
                                            </div>
                                            <Switch
                                                checked={settings.debugMode}
                                                onCheckedChange={(checked) => handleSettingChange("debugMode", checked)}
                                                className="data-[state=checked]:bg-orange-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="defaults" className="space-y-6 bg-white">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-orange-600">
                                            <Users className="w-5 h-5" />
                                            Default User Preferences
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-sm font-medium text-orange-700">Push Notifications</Label>
                                                    <div className="text-xs text-gray-600">
                                                        Default push notification setting for new users
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={settings.defaultUserPushNotifications}
                                                    onCheckedChange={(checked) => handleSettingChange("defaultUserPushNotifications", checked)}
                                                    className="data-[state=checked]:bg-orange-600"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-sm font-medium text-orange-700">Email Notifications</Label>
                                                    <div className="text-xs text-gray-600">
                                                        Default email notification setting for new users
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={settings.defaultUserEmailNotifications}
                                                    onCheckedChange={(checked) => handleSettingChange("defaultUserEmailNotifications", checked)}
                                                    className="data-[state=checked]:bg-orange-600"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="bg-orange-200" />

                                    <div>
                                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-orange-600">
                                            <Store className="w-5 h-5" />
                                            Default Vendor Preferences
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-sm font-medium text-orange-700">Push Notifications</Label>
                                                    <div className="text-xs text-gray-600">
                                                        Default push notification setting for new vendors
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={settings.defaultVendorPushNotifications}
                                                    onCheckedChange={(checked) => handleSettingChange("defaultVendorPushNotifications", checked)}
                                                    className="data-[state=checked]:bg-orange-600"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-sm font-medium text-orange-700">Email Notifications</Label>
                                                    <div className="text-xs text-gray-600">
                                                        Default email notification setting for new vendors
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={settings.defaultVendorEmailNotifications}
                                                    onCheckedChange={(checked) => handleSettingChange("defaultVendorEmailNotifications", checked)}
                                                    className="data-[state=checked]:bg-orange-600"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-sm font-medium text-orange-700">Search Visibility</Label>
                                                    <div className="text-xs text-gray-600">Default search visibility for new vendors</div>
                                                </div>
                                                <Switch
                                                    checked={settings.defaultVendorSearchVisibility}
                                                    onCheckedChange={(checked) => handleSettingChange("defaultVendorSearchVisibility", checked)}
                                                    className="data-[state=checked]:bg-orange-600"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-sm font-medium text-orange-700">Review Visibility</Label>
                                                    <div className="text-xs text-gray-600">Default review visibility for new vendors</div>
                                                </div>
                                                <Switch
                                                    checked={settings.defaultVendorReviewVisibility}
                                                    onCheckedChange={(checked) => handleSettingChange("defaultVendorReviewVisibility", checked)}
                                                    className="data-[state=checked]:bg-orange-600"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="notifications" className="space-y-6 bg-white">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-orange-600">
                                            <Mail className="w-5 h-5" />
                                            Email Configuration
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="emailProvider" className="text-orange-700 font-medium">Email Provider</Label>
                                                <Select
                                                    value={settings.emailProvider}
                                                    onValueChange={(value) => handleSettingChange("emailProvider", value)}
                                                >
                                                    <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white border-orange-200">
                                                        <SelectItem value="smtp" className="hover:bg-orange-50">SMTP</SelectItem>
                                                        <SelectItem value="sendgrid" className="hover:bg-orange-50">SendGrid</SelectItem>
                                                        <SelectItem value="mailgun" className="hover:bg-orange-50">Mailgun</SelectItem>
                                                        <SelectItem value="ses" className="hover:bg-orange-50">Amazon SES</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="smtpHost" className="text-orange-700 font-medium">SMTP Host</Label>
                                                    <Input
                                                        id="smtpHost"
                                                        value={settings.smtpHost}
                                                        onChange={(e) => handleSettingChange("smtpHost", e.target.value)}
                                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="smtpPort" className="text-orange-700 font-medium">SMTP Port</Label>
                                                    <Input
                                                        id="smtpPort"
                                                        value={settings.smtpPort}
                                                        onChange={(e) => handleSettingChange("smtpPort", e.target.value)}
                                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="smtpUsername" className="text-orange-700 font-medium">SMTP Username</Label>
                                                <Input
                                                    id="smtpUsername"
                                                    value={settings.smtpUsername}
                                                    onChange={(e) => handleSettingChange("smtpUsername", e.target.value)}
                                                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="smtpPassword" className="text-orange-700 font-medium">SMTP Password</Label>
                                                <Input
                                                    id="smtpPassword"
                                                    type="password"
                                                    value={settings.smtpPassword}
                                                    onChange={(e) => handleSettingChange("smtpPassword", e.target.value)}
                                                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="bg-orange-200" />

                                    <div>
                                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-orange-600">
                                            <Smartphone className="w-5 h-5" />
                                            Push Notification Configuration
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="pushProvider" className="text-orange-700 font-medium">Push Notification Provider</Label>
                                                <Select
                                                    value={settings.pushNotificationProvider}
                                                    onValueChange={(value) => handleSettingChange("pushNotificationProvider", value)}
                                                >
                                                    <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white border-orange-200">
                                                        <SelectItem value="firebase" className="hover:bg-orange-50">Firebase Cloud Messaging</SelectItem>
                                                        <SelectItem value="apns" className="hover:bg-orange-50">Apple Push Notification Service</SelectItem>
                                                        <SelectItem value="onesignal" className="hover:bg-orange-50">OneSignal</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="firebaseKey" className="text-orange-700 font-medium">Firebase Server Key</Label>
                                                <Input
                                                    id="firebaseKey"
                                                    type="password"
                                                    value={settings.firebaseServerKey}
                                                    onChange={(e) => handleSettingChange("firebaseServerKey", e.target.value)}
                                                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="security" className="space-y-6 bg-white">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-orange-600">
                                            <Shield className="w-5 h-5" />
                                            Authentication & Security
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="sessionTimeout" className="text-orange-700 font-medium">Session Timeout (hours)</Label>
                                                    <Input
                                                        id="sessionTimeout"
                                                        type="number"
                                                        value={settings.sessionTimeout}
                                                        onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="maxLoginAttempts" className="text-orange-700 font-medium">Max Login Attempts</Label>
                                                    <Input
                                                        id="maxLoginAttempts"
                                                        type="number"
                                                        value={settings.maxLoginAttempts}
                                                        onChange={(e) => handleSettingChange("maxLoginAttempts", e.target.value)}
                                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="passwordMinLength" className="text-orange-700 font-medium">Minimum Password Length</Label>
                                                <Input
                                                    id="passwordMinLength"
                                                    type="number"
                                                    value={settings.passwordMinLength}
                                                    onChange={(e) => handleSettingChange("passwordMinLength", e.target.value)}
                                                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-sm font-medium text-orange-700">Require Two-Factor Authentication</Label>
                                                    <div className="text-xs text-gray-600">Require 2FA for all admin accounts</div>
                                                </div>
                                                <Switch
                                                    checked={settings.requireTwoFactor}
                                                    onCheckedChange={(checked) => handleSettingChange("requireTwoFactor", checked)}
                                                    className="data-[state=checked]:bg-orange-600"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-sm font-medium text-orange-700">Allow Bulk Operations</Label>
                                                    <div className="text-xs text-gray-600">
                                                        Enable bulk update operations for preferences
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={settings.allowBulkOperations}
                                                    onCheckedChange={(checked) => handleSettingChange("allowBulkOperations", checked)}
                                                    className="data-[state=checked]:bg-orange-600"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="limits" className="space-y-6 bg-white">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-orange-600">
                                            <Clock className="w-5 h-5" />
                                            System Limits & Performance
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="maxUsersPerBatch" className="text-orange-700 font-medium">Max Users Per Batch Operation</Label>
                                                    <Input
                                                        id="maxUsersPerBatch"
                                                        type="number"
                                                        value={settings.maxUsersPerBatch}
                                                        onChange={(e) => handleSettingChange("maxUsersPerBatch", e.target.value)}
                                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="maxVendorsPerBatch" className="text-orange-700 font-medium">Max Vendors Per Batch Operation</Label>
                                                    <Input
                                                        id="maxVendorsPerBatch"
                                                        type="number"
                                                        value={settings.maxVendorsPerBatch}
                                                        onChange={(e) => handleSettingChange("maxVendorsPerBatch", e.target.value)}
                                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="apiRateLimit" className="text-orange-700 font-medium">API Rate Limit (requests/hour)</Label>
                                                    <Input
                                                        id="apiRateLimit"
                                                        type="number"
                                                        value={settings.apiRateLimit}
                                                        onChange={(e) => handleSettingChange("apiRateLimit", e.target.value)}
                                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="dataRetentionDays" className="text-orange-700 font-medium">Data Retention (days)</Label>
                                                    <Input
                                                        id="dataRetentionDays"
                                                        type="number"
                                                        value={settings.dataRetentionDays}
                                                        onChange={(e) => handleSettingChange("dataRetentionDays", e.target.value)}
                                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="bg-orange-200" />

                                    <div>
                                        <h3 className="text-lg font-medium mb-4 text-orange-600">Maintenance Actions</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                                                <RefreshCw className="w-4 h-4 mr-2" />
                                                Clear Cache
                                            </Button>
                                            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                                                <Database className="w-4 h-4 mr-2" />
                                                Optimize Database
                                            </Button>
                                            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                                                <Download className="w-4 h-4 mr-2" />
                                                Backup Data
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Reset All Preferences
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
