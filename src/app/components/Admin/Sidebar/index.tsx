"use client"

import {
  BarChart3,
  Users,
  Store,
  Home,
  UtensilsCrossed,
  Camera,
  Calendar,
  CreditCard,
  Megaphone,
  Bell,
  Ticket,
  MessageSquare,
  Settings,
  ChevronRight,
  Building2,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      { title: "View Users", url: "/admin/users" },
      { title: "User Create", url: "/admin/users/create" },
    ],
  },
  {
    title: "Vendor Management",
    icon: Store,
    items: [
      { title: "View Vendors", url: "/admin/vendors" },
      { title: "Vendor Create", url: "/admin/vendors/create" },
    ],
  },
  {
    title: "Venue Management",
    icon: Building2,
    items: [
      { title: "All Venues", url: "/admin/venues" },
      { title: "Create Venue", url: "/admin/venues/create" },
    ],
  },
  {
    title: "Farmhouse Management",
    icon: Home,
    items: [
      { title: "All Farmhouses", url: "/admin/farmhouses" },
      { title: "Create Farmhouse", url: "/admin/farmhouses/create" },
    ],
  },
  {
    title: "Catering Management",
    icon: UtensilsCrossed,
    items: [
      { title: "Custom Orders", url: "/admin/catering/custom" },
      { title: "Standard Packages", url: "/admin/catering/standard" },
      { title: "Create Packages", url: "/admin/catering/standard/create" }
    ],
  },
  {
    title: "Photography Management",
    icon: Camera,
    items: [
      { title: "Custom Orders", url: "/admin/photography/custom" },
      { title: "Photography Packages", url: "/admin/photography/standard" },
      { title: "Create Packages", url: "/admin/photography/standard/create" },
    ],
  },
  {
    title: "Booking Management",
    icon: Calendar,
    items: [
      { title: "All Bookings", url: "/admin/bookings" },
      { title: "Booking List", url: "/admin/bookings/list" },
      { title: "Visiting Requests", url: "/admin/bookings/visits" },
      { title: "Scheduling", url: "/admin/bookings/scheduling" },
      { title: "Booking Analytics", url: "/admin/bookings/analytics" },
    ],
  },
  {
    title: "Voucher Management",
    icon: Ticket,
    items: [
      { title: "Dashboard", url: "/admin/vouchers" },
      { title: "Voucher List", url: "/admin/vouchers/list" },
      { title: "Create Voucher", url: "/admin/vouchers/create" },
      { title: "Vendor Voucher", url: "/admin/vouchers/vendors" },
      { title: "Voucher Analytics", url: "/admin/vouchers/analytics" },
      { title: "Voucher Report", url: "/admin/vouchers/report" },
    ],
  },
  {
    title: "Chat Management",
    icon: MessageSquare,
    items: [
      { title: "Chats Dashboard", url: "/admin/chats" },
      { title: "All Chats", url: "/admin/chats/all" },
      { title: "Service Inquiries", url: "/admin/chats/inquiries" },
    ],
  },
  {
    title: "POS Management",
    icon: CreditCard,
    items: [
      { title: "Dashboard", url: "/admin/pos/dashboard" },
      { title: "Transactions", url: "/admin/pos/transactions" },
      { title: "Expense Management", url: "/admin/pos/expenses" },
      { title: "Payment Schedules", url: "/admin/pos/payment-schedules" },
      { title: "Logs", url: "/admin/pos/logs" },
    ],
  },
  {
    title: "Ads Management",
    icon: Megaphone,
    items: [
      { title: "Ads Dashboard", url: "/admin/advertisement/" },
      { title: "Ads Details", url: "/admin/advertisement/details" },
      { title: "Ad Analytics", url: "/admin/advertisement/analytics" },
    ],
  },
  {
    title: "Notification Management",
    icon: Bell,
    items: [
      { title: "Notifications Dashboard", url: "/admin/notifications" },
      { title: "All Notifications", url: "/admin/notifications/all" },
      { title: "Send Notification", url: "/admin/notifications/send" },
      { title: "Notification Scheduled", url: "/admin/notifications/scheduled" },
    ],
  },
  {
    title: "Support Management",
    icon: HelpCircle,
    items: [
      { title: "All Support Tickets", url: "/admin/support" },
      { title: "Support Ticket Analytics", url: "/admin/support/analytics" },
    ],
  },
  {
    title: "Review Management",
    icon: Bell,
    items: [
      { title: "All Reviews", url: "/admin/reviews" },
      { title: "Review Analytics", url: "/admin/reviews/analytics" },
    ],
  },
  
  {
    title: "Settings & Preferences",
    icon: Settings,
    items: [
      { title: "General", url: "/admin/preferences/" },
      { title: "Search Alerts", url: "/admin/preferences/alerts" },
      { title: "System Settings", url: "/admin/preferences/system" },
      { title: "User Preferences", url: "/admin/preferences/user" },
      { title: "Vendor Preferences", url: "/admin/preferences/vendor" },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800">
      <SidebarContent className="bg-white dark:bg-gray-950">
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-600 font-semibold text-sm uppercase tracking-wide">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-950/20">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                                className="hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-950/20 data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-950/30"
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-950/20 data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-950/30"
                    >
                      <Link href={item.url!}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
