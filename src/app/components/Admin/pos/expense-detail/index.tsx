"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, ShoppingCart, User, Calendar, Building, Receipt } from "lucide-react"

const mockExpenseDetails = {
    "1": {
        id: "1",
        description: "Catering supplies for wedding event - Premium ingredients and decorative items",
        amount: 150.0,
        category: "SUPPLIES",
        expenseDate: "2024-01-10",
        createdAt: "2024-01-10T14:30:00Z",
        updatedAt: "2024-01-10T14:35:00Z",
        status: "APPROVED",
        receiptUrl: "/receipts/expense-1.pdf",
        vendor: {
            id: "1",
            businessName: "Elite Catering Co.",
            email: "contact@elitecatering.com",
            phone: "+1-555-0123",
            address: "123 Business St, City, State 12345",
        },
        booking: {
            id: "B001",
            eventDate: "2024-02-01",
            eventTime: "18:00",
            eventType: "Wedding",
            totalAmount: 1500.0,
            bookingStatus: "CONFIRMED",
            guestCount: 150,
            venue: "Grand Ballroom, Downtown Hotel",
            user: {
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                phone: "+1-555-9876",
            },
        },
        approvedBy: {
            id: "A001",
            name: "Admin Manager",
            email: "admin@company.com",
            approvedAt: "2024-01-10T15:00:00Z",
        },
        items: [
            { name: "Premium Beef Tenderloin", quantity: 10, unitPrice: 8.5, total: 85.0 },
            { name: "Fresh Vegetables", quantity: 5, unitPrice: 6.0, total: 30.0 },
            { name: "Decorative Flowers", quantity: 3, unitPrice: 11.67, total: 35.0 },
        ],
    },
    "2": {
        id: "2",
        description: "Equipment rental for corporate event - Sound system and lighting",
        amount: 200.0,
        category: "EQUIPMENT",
        expenseDate: "2024-01-12",
        createdAt: "2024-01-12T09:15:00Z",
        updatedAt: "2024-01-12T09:20:00Z",
        status: "PENDING",
        receiptUrl: "/receipts/expense-2.pdf",
        vendor: {
            id: "2",
            businessName: "Premium Event Planners",
            email: "info@premiuevents.com",
            phone: "+1-555-0124",
            address: "456 Event Ave, City, State 12345",
        },
        booking: {
            id: "B002",
            eventDate: "2024-02-05",
            eventTime: "14:00",
            eventType: "Corporate Meeting",
            totalAmount: 800.0,
            bookingStatus: "CONFIRMED",
            guestCount: 50,
            venue: "Conference Center, Business District",
            user: {
                firstName: "Sarah",
                lastName: "Brown",
                email: "sarah@example.com",
                phone: "+1-555-8765",
            },
        },
        approvedBy: null,
        items: [
            { name: "Sound System Rental", quantity: 1, unitPrice: 120.0, total: 120.0 },
            { name: "LED Lighting Setup", quantity: 1, unitPrice: 80.0, total: 80.0 },
        ],
    },
}

const exportExpensePDF = (expense: any) => {
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Expense ${expense.id}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background-color: #ffffff; color: #1a1a1a; }
                .header { color: #f97316; border-bottom: 3px solid #f97316; padding-bottom: 15px; background-color: #fff7ed; padding: 20px; border-radius: 8px; }
                .section { margin: 25px 0; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #fed7aa; }
                .label { font-weight: bold; color: #ea580c; }
                .value { margin-left: 10px; color: #1a1a1a; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #fed7aa; padding: 12px; text-align: left; }
                th { background-color: #f97316; color: white; font-weight: bold; }
                tr:nth-child(even) { background-color: #fff7ed; }
                .total-row { background-color: #f97316 !important; color: white; font-weight: bold; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Expense Details</h1>
                <p>Expense ID: ${expense.id}</p>
                <p>Generated on: ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="section">
                <h2 style="color: #f97316; border-bottom: 2px solid #fed7aa; padding-bottom: 10px;">Expense Information</h2>
                <p><span class="label">Description:</span><span class="value">${expense.description}</span></p>
                <p><span class="label">Amount:</span><span class="value">$${expense.amount.toFixed(2)}</span></p>
                <p><span class="label">Category:</span><span class="value">${expense.category}</span></p>
                <p><span class="label">Date:</span><span class="value">${expense.expenseDate}</span></p>
                <p><span class="label">Status:</span><span class="value">${expense.status}</span></p>
            </div>

            <div class="section">
                <h2 style="color: #f97316; border-bottom: 2px solid #fed7aa; padding-bottom: 10px;">Vendor Information</h2>
                <p><span class="label">Business:</span><span class="value">${expense.vendor.businessName}</span></p>
                <p><span class="label">Email:</span><span class="value">${expense.vendor.email}</span></p>
                <p><span class="label">Phone:</span><span class="value">${expense.vendor.phone}</span></p>
            </div>

            <div class="section">
                <h2 style="color: #f97316; border-bottom: 2px solid #fed7aa; padding-bottom: 10px;">Items</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${expense.items
                            .map(
                                (item: any) => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.unitPrice.toFixed(2)}</td>
                                <td>$${item.total.toFixed(2)}</td>
                            </tr>
                        `,
                            )
                            .join("")}
                        <tr class="total-row">
                            <td colspan="3" style="text-align: right; font-weight: bold;">Total:</td>
                            <td style="font-weight: bold;">$${expense.amount.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
        </html>
    `

    // Create a new window with the content and trigger print dialog
    const printWindow = window.open("", "_blank")
    if (printWindow) {
        printWindow.document.write(content)
        printWindow.document.close()
        printWindow.focus()

        // Wait for content to load then print
        printWindow.onload = () => {
            printWindow.print()
            printWindow.close()
        }
    }
}

interface ExpenseDetailContentProps {
    expenseId: string
}

export function ExpenseDetailContent({ expenseId }: ExpenseDetailContentProps) {
    const expense = mockExpenseDetails[expenseId as keyof typeof mockExpenseDetails]

    if (!expense) {
        return (
            <div className="space-y-6 bg-white min-h-screen p-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/pos/dashboard">
                        <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
                <Card className="bg-white border-orange-200">
                    <CardContent className="p-6">
                        <p className="text-center text-orange-600">Expense not found</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6 bg-white min-h-screen p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/pos/expenses">
                        <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Expenses
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold text-orange-500">Expense Details</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => exportExpensePDF(expense)} className="border-orange-500 text-orange-500 hover:bg-orange-50">
                        <FileText className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Expense Information */}
                <Card className="bg-white border-orange-200 shadow-lg">
                    <CardHeader className="bg-orange-50 border-b border-orange-200">
                        <CardTitle className="flex items-center text-orange-600">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Expense Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div className="space-y-2">
                            <span className="text-orange-600 font-medium">Description:</span>
                            <p className="font-medium text-gray-800">{expense.description}</p>
                        </div>
                        <Separator className="bg-orange-200" />
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Amount:</span>
                            <span className="font-bold text-orange-500 text-lg">${expense.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Category:</span>
                            <Badge variant="outline" className="border-orange-300 text-orange-600 bg-orange-50">{expense.category}</Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Status:</span>
                            <Badge
                                className={
                                    expense.status === "APPROVED" 
                                        ? "bg-orange-500 text-white" 
                                        : expense.status === "PENDING" 
                                        ? "bg-orange-200 text-orange-700" 
                                        : "bg-red-500 text-white"
                                }
                            >
                                {expense.status}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Expense Date:</span>
                            <span className="font-medium text-gray-800">{expense.expenseDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Created:</span>
                            <span className="font-medium text-gray-800">{new Date(expense.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Updated:</span>
                            <span className="font-medium text-gray-800">{new Date(expense.updatedAt).toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Vendor Information */}
                <Card className="bg-white border-orange-200 shadow-lg">
                    <CardHeader className="bg-orange-50 border-b border-orange-200">
                        <CardTitle className="flex items-center text-orange-600">
                            <Building className="mr-2 h-5 w-5" />
                            Vendor Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Business Name:</span>
                            <span className="font-medium text-gray-800">{expense.vendor.businessName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Email:</span>
                            <span className="font-medium text-gray-800">{expense.vendor.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Phone:</span>
                            <span className="font-medium text-gray-800">{expense.vendor.phone}</span>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-600 font-medium">Address:</span>
                            <p className="text-sm text-gray-700">{expense.vendor.address}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Customer Information */}
                <Card className="bg-white border-orange-200 shadow-lg">
                    <CardHeader className="bg-orange-50 border-b border-orange-200">
                        <CardTitle className="flex items-center text-orange-600">
                            <User className="mr-2 h-5 w-5" />
                            Customer Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Name:</span>
                            <span className="font-medium text-gray-800">
                                {expense.booking.user.firstName} {expense.booking.user.lastName}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Email:</span>
                            <span className="font-medium text-gray-800">{expense.booking.user.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Phone:</span>
                            <span className="font-medium text-gray-800">{expense.booking.user.phone}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Approval Information */}
                <Card className="bg-white border-orange-200 shadow-lg">
                    <CardHeader className="bg-orange-50 border-b border-orange-200">
                        <CardTitle className="flex items-center text-orange-600">
                            <Receipt className="mr-2 h-5 w-5" />
                            Approval Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        {expense.approvedBy ? (
                            <>
                                <div className="flex justify-between">
                                    <span className="text-orange-600 font-medium">Approved By:</span>
                                    <span className="font-medium text-gray-800">{expense.approvedBy.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-orange-600 font-medium">Approver Email:</span>
                                    <span className="font-medium text-gray-800">{expense.approvedBy.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-orange-600 font-medium">Approved At:</span>
                                    <span className="font-medium text-gray-800">{new Date(expense.approvedBy?.approvedAt).toLocaleString()}</span>
                                </div>
                            </>
                        ) : (
                            <p className="text-orange-400">Pending approval</p>
                        )}
                        <Separator className="bg-orange-200" />
                        <div className="flex justify-between">
                            <span className="text-orange-600 font-medium">Receipt:</span>
                            <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                                <FileText className="mr-2 h-4 w-4" />
                                View Receipt
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Booking Information */}
            <Card className="bg-white border-orange-200 shadow-lg">
                <CardHeader className="bg-orange-50 border-b border-orange-200">
                    <CardTitle className="flex items-center text-orange-600">
                        <Calendar className="mr-2 h-5 w-5" />
                        Related Booking Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <span className="text-orange-600 font-medium">Booking ID:</span>
                            <p className="font-medium text-gray-800">{expense.booking.id}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-600 font-medium">Event Type:</span>
                            <p className="font-medium text-gray-800">{expense.booking.eventType}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-600 font-medium">Status:</span>
                            <Badge className={expense.booking.bookingStatus === "CONFIRMED" ? "bg-orange-500 text-white" : "bg-orange-200 text-orange-700"}>
                                {expense.booking.bookingStatus}
                            </Badge>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-600 font-medium">Event Date:</span>
                            <p className="font-medium text-gray-800">{expense.booking.eventDate}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-600 font-medium">Event Time:</span>
                            <p className="font-medium text-gray-800">{expense.booking.eventTime}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-600 font-medium">Guest Count:</span>
                            <p className="font-medium text-gray-800">{expense.booking.guestCount}</p>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <span className="text-orange-600 font-medium">Venue:</span>
                            <p className="font-medium text-gray-800">{expense.booking.venue}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-600 font-medium">Total Amount:</span>
                            <p className="font-bold text-orange-500">${expense.booking.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Expense Items */}
            <Card className="bg-white border-orange-200 shadow-lg">
                <CardHeader className="bg-orange-50 border-b border-orange-200">
                    <CardTitle className="text-orange-600">Expense Items</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {expense.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50/30">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                    <p className="text-sm text-orange-600">
                                        Quantity: {item.quantity} × ${item.unitPrice.toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-orange-500">${item.total.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                        <Separator className="bg-orange-200" />
                        <div className="flex justify-between items-center font-bold text-lg bg-orange-100 p-4 rounded-lg">
                            <span className="text-orange-600">Total:</span>
                            <span className="text-orange-500">${expense.amount.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
