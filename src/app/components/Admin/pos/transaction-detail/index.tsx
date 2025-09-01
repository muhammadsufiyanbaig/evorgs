"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, CreditCard, User, Calendar, Building } from "lucide-react"

const mockTransactionDetails = {
    "1": {
        id: "1",
        transactionNumber: "TXN-001",
        amount: 250.0,
        transactionType: "PAYMENT",
        paymentMethod: "CREDIT_CARD",
        status: "COMPLETED",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:35:00Z",
        description: "Payment for catering services - Wedding event",
        fees: 7.5,
        netAmount: 242.5,
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
        },
        user: {
            id: "U001",
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            phone: "+1-555-9876",
        },
        paymentDetails: {
            cardLast4: "4242",
            cardBrand: "Visa",
            authorizationCode: "AUTH123456",
            processorResponse: "Approved",
        },
    },
}

const exportTransactionPDF = (transaction: any) => {
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Transaction ${transaction.transactionNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background-color: #ffffff; }
                .header { color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px; }
                .section { margin: 20px 0; }
                .label { font-weight: bold; color: #ea580c; }
                .value { margin-left: 10px; color: #1f2937; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #fed7aa; padding: 8px; text-align: left; }
                th { background-color: #ea580c; color: white; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Transaction Details</h1>
                <p>Transaction #: ${transaction.transactionNumber}</p>
                <p>Generated on: ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="section">
                <h2>Transaction Information</h2>
                <p><span class="label">Amount:</span><span class="value">$${transaction.amount.toFixed(2)}</span></p>
                <p><span class="label">Type:</span><span class="value">${transaction.transactionType}</span></p>
                <p><span class="label">Status:</span><span class="value">${transaction.status}</span></p>
                <p><span class="label">Date:</span><span class="value">${new Date(transaction.createdAt).toLocaleString()}</span></p>
            </div>

            <div class="section">
                <h2>Vendor Information</h2>
                <p><span class="label">Business:</span><span class="value">${transaction.vendor.businessName}</span></p>
                <p><span class="label">Email:</span><span class="value">${transaction.vendor.email}</span></p>
                <p><span class="label">Phone:</span><span class="value">${transaction.vendor.phone}</span></p>
            </div>

            <div class="section">
                <h2>Customer Information</h2>
                <p><span class="label">Name:</span><span class="value">${transaction.user.firstName} ${transaction.user.lastName}</span></p>
                <p><span class="label">Email:</span><span class="value">${transaction.user.email}</span></p>
                <p><span class="label">Phone:</span><span class="value">${transaction.user.phone}</span></p>
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

interface TransactionDetailContentProps {
    transactionId: string
}

export function TransactionDetailContent({ transactionId }: TransactionDetailContentProps) {
    const transaction = mockTransactionDetails[transactionId as keyof typeof mockTransactionDetails]

    if (!transaction) {
        return (
            <div className="space-y-6 bg-white min-h-screen p-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/pos/transactions">
                        <Button variant="outline" size="sm" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Transactions
                        </Button>
                    </Link>
                </div>
                <Card className="border-orange-200 bg-white">
                    <CardContent className="p-6">
                        <p className="text-center text-orange-400">Transaction not found</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6 bg-white min-h-screen p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/pos/transactions">
                        <Button variant="outline" size="sm" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Transactions
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold text-orange-600">Transaction Details</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <Button 
                        variant="outline" 
                        onClick={() => exportTransactionPDF(transaction)}
                        className="border-orange-600 text-orange-600 hover:bg-orange-50"
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Transaction Information */}
                <Card className="border-orange-200 bg-white shadow-lg">
                    <CardHeader className="bg-orange-50 border-b border-orange-200">
                        <CardTitle className="flex items-center text-orange-600">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Transaction Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div className="flex justify-between">
                            <span className="text-orange-400">Transaction #:</span>
                            <span className="font-medium text-gray-800">{transaction.transactionNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Amount:</span>
                            <span className="font-bold text-orange-600 text-lg">${transaction.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Fees:</span>
                            <span className="font-medium text-gray-800">${transaction.fees.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Net Amount:</span>
                            <span className="font-medium text-gray-800">${transaction.netAmount.toFixed(2)}</span>
                        </div>
                        <Separator className="bg-orange-200" />
                        <div className="flex justify-between">
                            <span className="text-orange-400">Type:</span>
                            <Badge
                                className={
                                    transaction.transactionType === "PAYMENT"
                                        ? "bg-orange-600 text-white"
                                        : transaction.transactionType === "EXPENSE"
                                            ? "bg-orange-200 text-orange-800"
                                            : "bg-orange-100 text-orange-600 border-orange-300"
                                }
                            >
                                {transaction.transactionType}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Status:</span>
                            <Badge
                                className={
                                    transaction.status === "COMPLETED"
                                        ? "bg-orange-600 text-white"
                                        : transaction.status === "PENDING"
                                            ? "bg-orange-200 text-orange-800"
                                            : "bg-red-100 text-red-800"
                                }
                            >
                                {transaction.status}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Payment Method:</span>
                            <span className="font-medium text-gray-800">{transaction.paymentMethod.replace("_", " ")}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Created:</span>
                            <span className="font-medium text-gray-800">{new Date(transaction.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Updated:</span>
                            <span className="font-medium text-gray-800">{new Date(transaction.updatedAt).toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Details */}
                <Card className="border-orange-200 bg-white shadow-lg">
                    <CardHeader className="bg-orange-50 border-b border-orange-200">
                        <CardTitle className="flex items-center text-orange-600">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Payment Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div className="flex justify-between">
                            <span className="text-orange-400">Card Brand:</span>
                            <span className="font-medium text-gray-800">{transaction.paymentDetails.cardBrand}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Card Last 4:</span>
                            <span className="font-medium text-gray-800">****{transaction.paymentDetails.cardLast4}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Authorization:</span>
                            <span className="font-medium text-gray-800">{transaction.paymentDetails.authorizationCode}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Processor Response:</span>
                            <span className="font-medium text-orange-600">{transaction.paymentDetails.processorResponse}</span>
                        </div>
                        <Separator className="bg-orange-200" />
                        <div className="space-y-2">
                            <span className="text-orange-400">Description:</span>
                            <p className="text-sm text-gray-700">{transaction.description}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Vendor Information */}
                <Card className="border-orange-200 bg-white shadow-lg">
                    <CardHeader className="bg-orange-50 border-b border-orange-200">
                        <CardTitle className="flex items-center text-orange-600">
                            <Building className="mr-2 h-5 w-5" />
                            Vendor Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div className="flex justify-between">
                            <span className="text-orange-400">Business Name:</span>
                            <span className="font-medium text-gray-800">{transaction.vendor.businessName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Email:</span>
                            <span className="font-medium text-gray-800">{transaction.vendor.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Phone:</span>
                            <span className="font-medium text-gray-800">{transaction.vendor.phone}</span>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-400">Address:</span>
                            <p className="text-sm text-gray-700">{transaction.vendor.address}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Customer Information */}
                <Card className="border-orange-200 bg-white shadow-lg">
                    <CardHeader className="bg-orange-50 border-b border-orange-200">
                        <CardTitle className="flex items-center text-orange-600">
                            <User className="mr-2 h-5 w-5" />
                            Customer Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div className="flex justify-between">
                            <span className="text-orange-400">Name:</span>
                            <span className="font-medium text-gray-800">
                                {transaction.user.firstName} {transaction.user.lastName}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Email:</span>
                            <span className="font-medium text-gray-800">{transaction.user.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-orange-400">Phone:</span>
                            <span className="font-medium text-gray-800">{transaction.user.phone}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Booking Information */}
            <Card className="border-orange-200 bg-white shadow-lg">
                <CardHeader className="bg-orange-50 border-b border-orange-200">
                    <CardTitle className="flex items-center text-orange-600">
                        <Calendar className="mr-2 h-5 w-5" />
                        Booking Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <span className="text-orange-400">Booking ID:</span>
                            <p className="font-medium text-gray-800">{transaction.booking.id}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-400">Event Type:</span>
                            <p className="font-medium text-gray-800">{transaction.booking.eventType}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-400">Status:</span>
                            <Badge className={transaction.booking.bookingStatus === "CONFIRMED" ? "bg-orange-600 text-white" : "bg-orange-200 text-orange-800"}>
                                {transaction.booking.bookingStatus}
                            </Badge>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-400">Event Date:</span>
                            <p className="font-medium text-gray-800">{transaction.booking.eventDate}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-400">Event Time:</span>
                            <p className="font-medium text-gray-800">{transaction.booking.eventTime}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-400">Guest Count:</span>
                            <p className="font-medium text-gray-800">{transaction.booking.guestCount}</p>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <span className="text-orange-400">Venue:</span>
                            <p className="font-medium text-gray-800">{transaction.booking.venue}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-orange-400">Total Amount:</span>
                            <p className="font-bold text-orange-600">${transaction.booking.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
