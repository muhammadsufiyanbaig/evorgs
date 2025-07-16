import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, CreditCard, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API calls
const dashboardData = {
  totalRevenue: 45231.89,
  totalTransactions: 1234,
  pendingPayments: 8,
  totalExpenses: 12450.5,
  recentTransactions: [
    { id: "1", amount: 250.0, type: "Full Payment", customer: "John Doe", date: "2024-01-15" },
    { id: "2", amount: 150.0, type: "Advance", customer: "Jane Smith", date: "2024-01-15" },
    { id: "3", amount: 300.0, type: "Balance", customer: "Mike Johnson", date: "2024-01-14" },
  ],
  upcomingPayments: [
    { id: "1", amount: 500.0, dueDate: "2024-01-20", customer: "Alice Brown" },
    { id: "2", amount: 750.0, dueDate: "2024-01-22", customer: "Bob Wilson" },
  ],
}

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your business overview.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/vendor/pos/transactions/new">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              New Transaction
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalTransactions}</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.pendingPayments}</div>
            <p className="text-xs text-orange-600">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-red-600 flex items-center">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Link href="/vendor/pos/transactions">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{transaction.customer}</p>
                    <p className="text-sm text-gray-600">{transaction.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${transaction.amount}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Payments</CardTitle>
            <Link href="/vendor/pos/payment-schedule">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{payment.customer}</p>
                    <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${payment.amount}</p>
                    <p className="text-sm text-orange-600">Pending</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
