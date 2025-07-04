# EvOrgs Frontend Routes - RBAC

## Public Routes (No Authentication Required)

```
/                               # Homepage
/login                          # Login page
/register                       # Registration page
/services                       # Browse services
/services/[category]            # Browse by category
/services/[id]                  # Service details
/blog                          # Blog listing
/blog/[id]                     # Blog post details
/about                         # About page
/contact                       # Contact page
/terms                         # Terms of service
/privacy                       # Privacy policy
```

## USER Role Routes

```
/dashboard                      # User dashboard
/profile                        # User profile
/profile/edit                   # Edit profile

# Bookings
/bookings                       # My bookings
/bookings/new                   # Create booking
/bookings/visitingreq
/bookings/[id]                  # Booking details
/bookings/[id]/cancel           # Cancel booking

# Reviews
/reviews                        # My reviews
/reviews/new                    # Write review
/reviews/[id]/edit              # Edit review

# Coupons
/coupons                        # Available coupons
/coupons/my                     # My coupons

# Messages
/messages                       # Messages inbox
/messages/[id]                  # Message thread

# Notifications
/notifications                  # User notifications

# Support
/support                        # Support tickets
/support/new                    # Create ticket
/support/[id]                   # Ticket details
```

## VENDOR Role Routes

```
/vendor/dashboard               # Vendor dashboard
/vendor/profile                 # Vendor profile
/vendor/profile/edit            # Edit vendor profile

# Services
/vendor/services                # My services
/vendor/services/new            # Create service
/vendor/services/[id]           # Service details
/vendor/services/[id]/edit      # Edit service

# Bookings
/vendor/bookings                # Service bookings
/vendor/bookings/[id]           # Booking details

# POS System
/vendor/pos                     # POS dashboard
/vendor/pos/payments            # Payment history
/vendor/pos/expenses            # Expense tracking
/vendor/pos/balance             # Balance sheet
/vendor/pos/reports             # Financial reports

# Reviews
/vendor/reviews                 # Service reviews
/vendor/reviews/[id]            # Review details

# Blog
/vendor/blog                    # My blog posts
/vendor/blog/new                # Create blog post
/vendor/blog/[id]               # Blog post details
/vendor/blog/[id]/edit          # Edit blog post

# Advertisements
/vendor/ads                     # My advertisements
/vendor/ads/new                 # Create ad
/vendor/ads/[id]                # Ad details
/vendor/ads/[id]/edit           # Edit ad

# Coupons
/vendor/coupons                 # My coupons
/vendor/coupons/new             # Create coupon
/vendor/coupons/[id]            # Coupon details
/vendor/coupons/[id]/edit       # Edit coupon

# Messages
/vendor/messages                # Messages
/vendor/messages/[id]           # Message thread

# Notifications
/vendor/notifications           # Vendor notifications

# Support
/vendor/support                 # Support tickets
/vendor/support/new             # Create ticket
/vendor/support/[id]            # Ticket details

# Analytics
/vendor/analytics               # Analytics dashboard
/vendor/analytics/revenue       # Revenue analytics
/vendor/analytics/bookings      # Booking analytics
```

## ADMIN Role Routes

```
/admin/dashboard                # Admin dashboard

# User Management
/admin/users                    # All users
/admin/users/new                # Create user
/admin/users/[id]               # User details
/admin/users/[id]/edit          # Edit user

# Vendor Management
/admin/vendors                  # All vendors
/admin/vendors/new              # Create vendor
/admin/vendors/[id]             # Vendor details
/admin/vendors/[id]/edit        # Edit vendor

# Service Management
/admin/services                 # All services
/admin/services/[id]            # Service details
/admin/services/[id]/edit       # Edit service

# Booking Management
/admin/bookings                 # All bookings
/admin/bookings/[id]            # Booking details
/admin/bookings/[id]/edit       # Edit booking

# Review Management
/admin/reviews                  # All reviews
/admin/reviews/[id]             # Review details
/admin/reviews/[id]/edit        # Edit review

# Blog Management
/admin/blog                     # All blog posts
/admin/blog/new                 # Create blog post
/admin/blog/[id]                # Blog post details
/admin/blog/[id]/edit           # Edit blog post

# Advertisement Management
/admin/ads                      # All advertisements
/admin/ads/[id]                 # Ad details
/admin/ads/[id]/edit            # Edit ad

# Notification Management
/admin/notifications            # All notifications
/admin/notifications/new        # Create notification
/admin/notifications/[id]       # Notification details
/admin/notifications/[id]/edit  # Edit notification

# Analytics & Reports
/admin/analytics                # Platform analytics
/admin/analytics/users          # User analytics
/admin/analytics/vendors        # Vendor analytics
/admin/analytics/revenue        # Revenue analytics
/admin/analytics/bookings       # Booking analytics
/admin/reports                  # All reports
/admin/reports/[type]           # Specific report

# Support Management
/admin/support                  # All support tickets
/admin/support/new              # Create ticket
/admin/support/[id]             # Ticket details
/admin/support/[id]/edit        # Edit ticket

# Coupon Management
/admin/coupons                  # All coupons
/admin/coupons/new              # Create coupon
/admin/coupons/[id]             # Coupon details
/admin/coupons/[id]/edit        # Edit coupon

# Message Management
/admin/messages                 # All messages
/admin/messages/[id]            # Message thread

# System Settings
/admin/settings                 # System settings
/admin/settings/security        # Security settings
/admin/settings/general         # General settings
```

## Frontend Route Protection

### Next.js Implementation

```javascript
// middleware.js
import { NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/services',
  '/blog',
  '/about',
  '/contact',
  '/terms',
  '/privacy'
]

const roleRoutes = {
  USER: ['/dashboard', '/profile', '/bookings', '/reviews', '/coupons', '/messages', '/notifications', '/support'],
  VENDOR: ['/vendor'],
  ADMIN: ['/admin']
}

export async function middleware(request) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value
  
  // Allow public routes
  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next()
  }
  
  // Check authentication
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  const user = await verifyToken(token)
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Check role-based access
  const userRole = user.role
  const hasAccess = Object.entries(roleRoutes).some(([role, routes]) => {
    return userRole === role && routes.some(route => path.startsWith(route))
  })
  
  if (!hasAccess) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
```
