"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, CreditCard, Calendar, Receipt, BarChart3, Menu, Plus, DollarSign } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/vendor/pos", icon: LayoutDashboard },
  { name: "Transactions", href: "/vendor/pos/transactions", icon: CreditCard },
  { name: "Payment Schedule", href: "/vendor/pos/payment-schedule", icon: Calendar },
  { name: "Expenses", href: "/vendor/pos/expenses", icon: Receipt },
  { name: "Financial Overview", href: "/vendor/pos/financial-overview", icon: BarChart3 },
]

const quickActions = [
  { name: "New Transaction", href: "/vendor/pos/transactions/new", icon: Plus },
  { name: "New Payment Schedule", href: "/vendor/pos/payment-schedule/new", icon: Calendar },
  { name: "New Expense", href: "/vendor/pos/expenses/new", icon: DollarSign },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex  flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-orange-600">POS System</h1>
      </div>

      <nav className=" space-y-2 p-4">
        <div className="space-y-1">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Navigation</h2>
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="space-y-1 pt-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Quick Actions</h2>
          {quickActions.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-700"
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:sticky md:top-0 md:h-screen">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}
