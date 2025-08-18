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
      { title: "All Ads", url: "/admin/ads" },
      { title: "Pending Requests", url: "/admin/ads/pending" },
      { title: "Ad Analytics", url: "/admin/ads/analytics" },
    ],
  },
  {
    title: "Notification Management",
    icon: Bell,
    items: [
      { title: "All Notifications", url: "/admin/notifications" },
      { title: "Send Notification", url: "/admin/notifications/send" },
      { title: "Notification Settings", url: "/admin/notifications/settings" },
    ],
  },
  {
    title: "Voucher Management",
    icon: Ticket,
    items: [
      { title: "All Vouchers", url: "/admin/vouchers" },
      { title: "Create Voucher", url: "/admin/vouchers/create" },
      { title: "Voucher Analytics", url: "/admin/vouchers/analytics" },
    ],
  },
  {
    title: "Chat Management",
    icon: MessageSquare,
    items: [
      { title: "All Chats", url: "/admin/chats" },
      { title: "Service Inquiries", url: "/admin/chats/inquiries" },
      { title: "Message Status", url: "/admin/chats/status" },
    ],
  },
  {
    title: "Settings & Preferences",
    icon: Settings,
    items: [
      { title: "Search Alerts", url: "/admin/settings/alerts" },
      { title: "System Settings", url: "/admin/settings/system" },
      { title: "User Preferences", url: "/admin/settings/preferences" },
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
