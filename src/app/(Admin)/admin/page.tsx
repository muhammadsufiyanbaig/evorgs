"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Store,
  Calendar,
  DollarSign,
  Megaphone,
  Bell,
  Receipt,
  Ticket,
  TrendingUp,
  TrendingDown,
  Plus,
  Send,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data - in real app, this would come from APIs
const dashboardStats = {
  totalUsers: 12543,
  totalVendors: 856,
  totalBookings: 3421,
  totalRevenue: 2847392,
  pendingAdRequests: 23,
  unreadNotifications: 5,
  totalExpenses: 145230,
  voucherUsage: 1247,
}

const recentActivity = [
  {
    id: 1,
    type: "booking",
    title: "New wedding booking",
    description: "Grand Palace Venue - Dec 25, 2024",
    time: "2 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    type: "vendor",
    title: "Vendor approval",
    description: "Delicious Catering Co. approved",
    time: "1 hour ago",
    status: "completed",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment received",
    description: "$5,500 for booking #BK-2024-001",
    time: "3 hours ago",
    status: "completed",
  },
]

const transactionData = [
  { name: "Jan", bookings: 65, revenue: 28000 },
  { name: "Feb", bookings: 59, revenue: 32000 },
  { name: "Mar", bookings: 80, revenue: 45000 },
  { name: "Apr", bookings: 81, revenue: 48000 },
  { name: "May", bookings: 56, revenue: 35000 },
  { name: "Jun", bookings: 95, revenue: 52000 },
]

const expenseData = [
  { name: "Marketing", value: 45000 },
  { name: "Operations", value: 32000 },
  { name: "Staff", value: 28000 },
  { name: "Technology", value: 15000 },
  { name: "Other", value: 8000 },
]

export default function AdminDashboard() {
  const exportReport = (format: 'csv' | 'pdf') => {
    if (format === 'csv') {
      // Generate CSV data
      const csvData = [
        ['Metric', 'Value', 'Change'],
        ['Total Users', dashboardStats.totalUsers.toString(), '+12.5%'],
        ['Total Vendors', dashboardStats.totalVendors.toString(), '+8.2%'],
        ['Total Bookings', dashboardStats.totalBookings.toString(), '+15.3%'],
        ['Total Revenue', `$${dashboardStats.totalRevenue.toLocaleString()}`, '+22.1%'],
        ['Pending Ad Requests', dashboardStats.pendingAdRequests.toString(), '-5.2%'],
        ['Unread Notifications', dashboardStats.unreadNotifications.toString(), 'N/A'],
        ['Total Expenses', `$${dashboardStats.totalExpenses.toLocaleString()}`, '-3.1%'],
        ['Voucher Usage', dashboardStats.voucherUsage.toString(), '+18.7%'],
        [''],
        ['Monthly Revenue Data'],
        ['Month', 'Bookings', 'Revenue'],
        ...transactionData.map(item => [item.name, item.bookings.toString(), `$${item.revenue.toLocaleString()}`]),
        [''],
        ['Expense Breakdown'],
        ['Category', 'Amount'],
        ...expenseData.map(item => [item.name, `$${item.value.toLocaleString()}`])
      ];

      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `admin-dashboard-report-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'pdf') {
      // Generate HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Admin Dashboard Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #f97316; margin-bottom: 10px; }
            h2 { color: #333; border-bottom: 2px solid #f97316; padding-bottom: 5px; }
            .header { margin-bottom: 30px; }
            .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .stat-item { padding: 10px; border-left: 4px solid #f97316; background: #f9f9f9; }
            .change-positive { color: #16a34a; }
            .change-negative { color: #dc2626; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f97316; color: white; }
            .activity-item { margin: 10px 0; padding: 10px; border-left: 3px solid #f97316; background: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Admin Dashboard Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>

          <h2>Dashboard Statistics</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <strong>Total Users:</strong> ${dashboardStats.totalUsers.toLocaleString()}
              <span class="change-positive">(+12.5%)</span>
            </div>
            <div class="stat-item">
              <strong>Total Vendors:</strong> ${dashboardStats.totalVendors.toLocaleString()}
              <span class="change-positive">(+8.2%)</span>
            </div>
            <div class="stat-item">
              <strong>Total Bookings:</strong> ${dashboardStats.totalBookings.toLocaleString()}
              <span class="change-positive">(+15.3%)</span>
            </div>
            <div class="stat-item">
              <strong>Total Revenue:</strong> $${dashboardStats.totalRevenue.toLocaleString()}
              <span class="change-positive">(+22.1%)</span>
            </div>
            <div class="stat-item">
              <strong>Pending Ad Requests:</strong> ${dashboardStats.pendingAdRequests}
              <span class="change-negative">(-5.2%)</span>
            </div>
            <div class="stat-item">
              <strong>Unread Notifications:</strong> ${dashboardStats.unreadNotifications}
            </div>
            <div class="stat-item">
              <strong>Total Expenses:</strong> $${dashboardStats.totalExpenses.toLocaleString()}
              <span class="change-positive">(-3.1%)</span>
            </div>
            <div class="stat-item">
              <strong>Voucher Usage:</strong> ${dashboardStats.voucherUsage.toLocaleString()}
              <span class="change-positive">(+18.7%)</span>
            </div>
          </div>

          <h2>Monthly Revenue Trend</h2>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Bookings</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              ${transactionData.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.bookings}</td>
                  <td>$${item.revenue.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <h2>Expense Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${expenseData.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>$${item.value.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <h2>Recent Activity</h2>
          ${recentActivity.map(activity => `
            <div class="activity-item">
              <strong>${activity.title}</strong><br>
              ${activity.description}<br>
              <small>${activity.time} - Status: ${activity.status}</small>
            </div>
          `).join('')}
        </body>
        </html>
      `;

      // Create a new window and print
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      } else {
        alert('Please allow popups to export PDF');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => exportReport('csv')}
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => exportReport('pdf')}
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Store className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalVendors.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalBookings.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardStats.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +22.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Ad Requests</CardTitle>
            <Megaphone className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.pendingAdRequests}</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -5.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Notifications</CardTitle>
            <Bell className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.unreadNotifications}</div>
            <div className="text-xs text-gray-600">Requires attention</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardStats.totalExpenses.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voucher Usage</CardTitle>
            <Ticket className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.voucherUsage.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18.7% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Bookings Trend</CardTitle>
            <CardDescription>Monthly performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Monthly expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity and quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex-shrink-0">
                    {activity.type === "booking" && <Calendar className="h-5 w-5 text-blue-600" />}
                    {activity.type === "vendor" && <Store className="h-5 w-5 text-green-600" />}
                    {activity.type === "payment" && <DollarSign className="h-5 w-5 text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                      <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Booking
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Send className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Vendor
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Ticket className="h-4 w-4 mr-2" />
              Create Voucher
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
