"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, DollarSign, Receipt, Calendar, Download, FileText, FileSpreadsheet } from "lucide-react"

// Mock data for different time periods
const mockData = {
  daily: {
    revenue: 1250.0,
    expenses: 350.0,
    profit: 900.0,
    transactions: 8,
    chartData: [
      { name: "Mon", revenue: 1200, expenses: 300 },
      { name: "Tue", revenue: 1100, expenses: 250 },
      { name: "Wed", revenue: 1300, expenses: 400 },
      { name: "Thu", revenue: 1250, expenses: 350 },
      { name: "Fri", revenue: 1400, expenses: 300 },
      { name: "Sat", revenue: 1600, expenses: 450 },
      { name: "Sun", revenue: 1000, expenses: 200 },
    ],
  },
  weekly: {
    revenue: 8750.0,
    expenses: 2450.0,
    profit: 6300.0,
    transactions: 56,
    chartData: [
      { name: "Week 1", revenue: 8200, expenses: 2100 },
      { name: "Week 2", revenue: 8500, expenses: 2300 },
      { name: "Week 3", revenue: 8750, expenses: 2450 },
      { name: "Week 4", revenue: 9100, expenses: 2600 },
    ],
  },
  monthly: {
    revenue: 35000.0,
    expenses: 9800.0,
    profit: 25200.0,
    transactions: 224,
    chartData: [
      { name: "Jan", revenue: 32000, expenses: 8500 },
      { name: "Feb", revenue: 28000, expenses: 7800 },
      { name: "Mar", revenue: 35000, expenses: 9800 },
      { name: "Apr", revenue: 31000, expenses: 8900 },
      { name: "May", revenue: 38000, expenses: 10200 },
      { name: "Jun", revenue: 42000, expenses: 11500 },
    ],
  },
  quarterly: {
    revenue: 105000.0,
    expenses: 29400.0,
    profit: 75600.0,
    transactions: 672,
    chartData: [
      { name: "Q1 2023", revenue: 95000, expenses: 26000 },
      { name: "Q2 2023", revenue: 98000, expenses: 27500 },
      { name: "Q3 2023", revenue: 102000, expenses: 28800 },
      { name: "Q4 2023", revenue: 105000, expenses: 29400 },
    ],
  },
  yearly: {
    revenue: 420000.0,
    expenses: 117600.0,
    profit: 302400.0,
    transactions: 2688,
    chartData: [
      { name: "2020", revenue: 350000, expenses: 98000 },
      { name: "2021", revenue: 380000, expenses: 106000 },
      { name: "2022", revenue: 400000, expenses: 112000 },
      { name: "2023", revenue: 420000, expenses: 117600 },
    ],
  },
}

const expenseBreakdown = [
  { name: "Equipment", value: 35, amount: 4116 },
  { name: "Supplies", value: 25, amount: 2940 },
  { name: "Transportation", value: 15, amount: 1764 },
  { name: "Marketing", value: 12, amount: 1411 },
  { name: "Other", value: 13, amount: 1529 },
]

const COLORS = ["#ea580c", "#fb923c", "#fed7aa", "#ffedd5", "#fff7ed"]

export default function FinancialOverviewPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const currentData = mockData[selectedPeriod as keyof typeof mockData]

  const profitMargin = ((currentData.profit / currentData.revenue) * 100).toFixed(1)
  const expenseRatio = ((currentData.expenses / currentData.revenue) * 100).toFixed(1)

  // Export to XLSX
  const exportToXLSX = () => {
    // Create workbook data
    const summaryData = [
      ["Financial Summary", "", "", ""],
      ["Period", selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1), "", ""],
      ["", "", "", ""],
      ["Key Metrics", "", "", ""],
      ["Total Revenue", `$${currentData.revenue.toLocaleString()}`, "", ""],
      ["Total Expenses", `$${currentData.expenses.toLocaleString()}`, "", ""],
      ["Net Profit", `$${currentData.profit.toLocaleString()}`, "", ""],
      ["Profit Margin", `${profitMargin}%`, "", ""],
      ["Expense Ratio", `${expenseRatio}%`, "", ""],
      ["Total Transactions", currentData.transactions, "", ""],
      ["Avg Transaction", `$${(currentData.revenue / currentData.transactions).toFixed(2)}`, "", ""],
      ["", "", "", ""],
      ["Period Data", "", "", ""],
      ["Period", "Revenue", "Expenses", "Profit"],
      ...currentData.chartData.map(item => [
        item.name,
        `$${item.revenue.toLocaleString()}`,
        `$${item.expenses.toLocaleString()}`,
        `$${(item.revenue - item.expenses).toLocaleString()}`
      ]),
      ["", "", "", ""],
      ["Expense Breakdown", "", "", ""],
      ["Category", "Percentage", "Amount", ""],
      ...expenseBreakdown.map(item => [
        item.name,
        `${item.value}%`,
        `$${item.amount.toLocaleString()}`,
        ""
      ])
    ]

    // Create CSV content
    const csvContent = summaryData.map(row => 
      row.map(cell => `"${cell}"`).join(",")
    ).join("\n")

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `financial_report_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  
  // Export to PDF using jsPDF
  const exportToPDF = () => {
    // Create a comprehensive HTML structure that can be easily converted to PDF
    const reportContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Financial Report - ${selectedPeriod}</title>
          <style>
            @page {
              size: A4;
              margin: 20mm;
            }
            body { 
              font-family: Arial, sans-serif; 
              margin: 0;
              color: #333;
              font-size: 12px;
              line-height: 1.4;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #ea580c;
              padding-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              color: #ea580c;
              font-size: 24px;
            }
            .metrics { 
              display: grid; 
              grid-template-columns: repeat(2, 1fr); 
              gap: 15px; 
              margin-bottom: 30px;
            }
            .metric-card { 
              border: 1px solid #ddd; 
              padding: 15px; 
              border-radius: 8px;
              background: #f9f9f9;
            }
            .metric-title { 
              font-size: 12px; 
              color: #666; 
              margin-bottom: 5px;
            }
            .metric-value { 
              font-size: 20px; 
              font-weight: bold; 
              color: #ea580c;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 25px;
              font-size: 11px;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left;
            }
            th { 
              background-color: #ea580c; 
              color: white;
              font-weight: bold;
            }
            .section-title { 
              font-size: 16px; 
              font-weight: bold; 
              margin: 20px 0 10px 0;
              color: #ea580c;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 10px;
              color: #666;
            }
            .page-break {
              page-break-before: always;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Financial Report</h1>
            <p><strong>Period:</strong> ${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}</p>
            <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="metrics">
            <div class="metric-card">
              <div class="metric-title">Total Revenue</div>
              <div class="metric-value">${currentData.revenue.toLocaleString()}</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">Total Expenses</div>
              <div class="metric-value">${currentData.expenses.toLocaleString()}</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">Net Profit</div>
              <div class="metric-value">${currentData.profit.toLocaleString()}</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">Profit Margin</div>
              <div class="metric-value">${profitMargin}%</div>
            </div>
          </div>

          <div class="section-title">Period Performance</div>
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Revenue</th>
                <th>Expenses</th>
                <th>Profit</th>
                <th>Profit Margin</th>
              </tr>
            </thead>
            <tbody>
              ${currentData.chartData.map(item => {
                const profit = item.revenue - item.expenses;
                const margin = ((profit / item.revenue) * 100).toFixed(1);
                return `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.revenue.toLocaleString()}</td>
                    <td>${item.expenses.toLocaleString()}</td>
                    <td>${profit.toLocaleString()}</td>
                    <td>${margin}%</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="section-title">Expense Breakdown</div>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Percentage</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${expenseBreakdown.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.value}%</td>
                  <td>${item.amount.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="section-title">Summary Statistics</div>
          <table>
            <tbody>
              <tr>
                <td><strong>Total Transactions</strong></td>
                <td>${currentData.transactions}</td>
              </tr>
              <tr>
                <td><strong>Average Transaction Value</strong></td>
                <td>${(currentData.revenue / currentData.transactions).toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Expense Ratio</strong></td>
                <td>${expenseRatio}%</td>
              </tr>
              <tr>
                <td><strong>Revenue Growth</strong></td>
                <td>+12.5%</td>
              </tr>
              <tr>
                <td><strong>Profit Growth</strong></td>
                <td>+15.3%</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <p>This report was generated automatically from the Financial Overview Dashboard</p>
            <p>Report Date: ${new Date().toLocaleString()}</p>
          </div>
        </body>
      </html>
    `;

    // Create a new window and write the content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to export PDF');
      return;
    }

    printWindow.document.write(reportContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      // Add a small delay to ensure all content is rendered
      setTimeout(() => {
        printWindow.print();
        // Don't close the window automatically - let user decide
      }, 500);
    };
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
            <p className="text-gray-600">Track your revenue, expenses, and profitability</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={exportToXLSX}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentData.revenue.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <Receipt className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentData.expenses.toLocaleString()}</div>
              <p className="text-xs text-red-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${currentData.profit.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.3% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profitMargin}%</div>
              <p className="text-xs text-gray-600">Expense ratio: {expenseRatio}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue vs Expenses Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, ""]} />
                  <Bar dataKey="revenue" fill="#ea580c" name="Revenue" />
                  <Bar dataKey="expenses" fill="#fb923c" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expense Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Profit Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, ""]} />
                <Line type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#fb923c" strokeWidth={2} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Financial Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Metric</th>
                    <th className="text-left p-3 font-medium">Current Period</th>
                    <th className="text-left p-3 font-medium">Previous Period</th>
                    <th className="text-left p-3 font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Revenue</td>
                    <td className="p-3">${currentData.revenue.toLocaleString()}</td>
                    <td className="p-3">$31,200</td>
                    <td className="p-3 text-green-600">+12.2%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Expenses</td>
                    <td className="p-3">${currentData.expenses.toLocaleString()}</td>
                    <td className="p-3">$9,050</td>
                    <td className="p-3 text-red-600">+8.3%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Net Profit</td>
                    <td className="p-3">${currentData.profit.toLocaleString()}</td>
                    <td className="p-3">$22,150</td>
                    <td className="p-3 text-green-600">+13.8%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Transactions</td>
                    <td className="p-3">{currentData.transactions}</td>
                    <td className="p-3">198</td>
                    <td className="p-3 text-green-600">+13.1%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Avg Transaction</td>
                    <td className="p-3">${(currentData.revenue / currentData.transactions).toFixed(2)}</td>
                    <td className="p-3">$157.58</td>
                    <td className="p-3 text-red-600">-0.8%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}