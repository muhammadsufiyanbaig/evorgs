# EvOrgs Detailed Routing Structure

## Next.js File Structure & Routing

### **Root Directory Structure**
```
src/
├── app/
│   ├── (public)/          # Public routes group
│   ├── (auth)/            # Authentication routes group
│   ├── (user)/            # User-protected routes group
│   ├── (vendor)/          # Vendor-protected routes group
│   ├── (admin)/           # Admin-protected routes group
│   ├── api/               # API routes
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
└── middleware.ts
```

---

## 1. **PUBLIC ROUTES** (15 routes)

### **Root Level Routes**
```
src/app/
├── page.tsx                           # / (Homepage) - Main landing page with platform overview
├── about/
│   └── page.tsx                       # /about - Company information and mission
├── contact/
│   └── page.tsx                       # /contact - Contact form and business details
├── terms/
│   └── page.tsx                       # /terms - Terms of service and legal conditions
├── privacy/
│   └── page.tsx                       # /privacy - Privacy policy and data handling
└── help/
    └── page.tsx                       # /help - General help center and FAQs
```

### **Authentication Routes**
```
src/app/(auth)/
├── layout.tsx                         # Auth layout - Clean authentication pages layout
├── login/
│   └── page.tsx                       # /login - User/vendor/admin login form
├── register/
│   ├── page.tsx                       # /register - New user registration
│   └── vendor/
│       └── page.tsx                   # /register/vendor - Vendor-specific registration with business details
├── forgot-password/
│   └── page.tsx                       # /forgot-password - Password recovery email request
└── reset-password/
    └── page.tsx                       # /reset-password - New password setting after email verification
```

### **Public Service Browsing**
```
src/app/services/
├── page.tsx                           # /services - All available services listing with filters
├── venue/
│   └── page.tsx                       # /services/venue - Wedding halls, banquet halls, and event venues
├── farmhouse/
│   └── page.tsx                       # /services/farmhouse - Farmhouse rentals for events
├── catering/
│   └── page.tsx                       # /services/catering - Food and catering service providers
├── photography/
│   └── page.tsx                       # /services/photography - Event photographers and videographers
├── search/
│   └── page.tsx                       # /services/search - Advanced search with location, price, date filters
├── [category]/
│   ├── page.tsx                       # /services/[category] - Dynamic category pages for any service type
│   └── [id]/
│       └── page.tsx                   # /services/[category]/[id] - Individual service detail page with booking
└── layout.tsx                         # Services layout - Consistent navigation for service browsing
```

### **Public Blog Routes**
```
src/app/blog/
├── page.tsx                           # /blog - Blog listing with latest articles and event tips
├── [slug]/
│   └── page.tsx                       # /blog/[slug] - Individual blog post reading page
├── category/
│   └── [category]/
│       └── page.tsx                   # /blog/category/[category] - Category-specific blog posts (wedding, corporate, etc.)
├── search/
│   └── page.tsx                       # /blog/search - Blog search functionality with keywords and tags
└── layout.tsx                         # Blog layout - Consistent blog navigation and sidebar
```

---

## 2. **USER ROUTES** (25 routes)

### **User Dashboard & Profile**
```
src/app/(user)/
├── layout.tsx                         # User layout - User navigation sidebar and header
├── dashboard/
│   └── page.tsx                       # /dashboard - User's main dashboard with bookings overview and quick actions
├── profile/
│   ├── page.tsx                       # /profile - Personal information and account details management
│   ├── settings/
│   │   └── page.tsx                   # /profile/settings - Privacy settings, notifications, and preferences
│   └── verification/
│       └── page.tsx                   # /profile/verification - Account verification status and document upload
```

### **User Booking Management**
```
src/app/(user)/bookings/
├── page.tsx                           # /bookings - User's booking history with status and details
├── create/
│   └── page.tsx                       # /bookings/create - New booking form with service selection and dates
├── payment/
│   └── page.tsx                       # /bookings/payment - Payment processing and gateway integration
├── confirmation/
│   └── page.tsx                       # /bookings/confirmation - Booking success page with details and next steps
├── [id]/
│   └── page.tsx                       # /bookings/[id] - Individual booking details, status, and modifications
└── layout.tsx                         # Booking layout - Booking-specific navigation and progress indicators
```

### **User Reviews**
```
src/app/(user)/user/
├── reviews/
│   └── page.tsx                       # /user/reviews - User's submitted reviews and ratings history
└── coupons/
    └── page.tsx                       # /user/coupons - Available and used coupons/vouchers collection
```

### **User Communication & Support**
```
src/app/(user)/
├── messages/
│   ├── page.tsx                       # /messages - User's chat inbox with vendors and support
│   └── [conversationId]/
│       └── page.tsx                   # /messages/[conversationId] - Individual chat conversation with real-time messaging
├── notifications/
│   ├── page.tsx                       # /notifications - All notifications including booking updates and system alerts
│   └── settings/
│       └── page.tsx                   # /notifications/settings - Notification preferences and frequency settings
└── support/
    ├── page.tsx                       # /support - Support center with FAQ and contact options
    ├── create/
    │   └── page.tsx                   # /support/create - Create new support ticket with issue description
    ├── tickets/
    │   ├── page.tsx                   # /support/tickets - User's support ticket history and status
    │   └── [id]/
    │       └── page.tsx               # /support/tickets/[id] - Individual support ticket conversation and updates
    └── layout.tsx                     # Support layout - Support navigation and help resources
```

### **User Review Management**
```
src/app/(user)/reviews/
├── page.tsx                           # /reviews - Browse all public reviews and ratings for services
├── write/
│   └── page.tsx                       # /reviews/write - Write and submit review for booked services
└── [serviceId]/
    └── page.tsx                       # /reviews/[serviceId] - All reviews for a specific service with filtering
```

---

## 3. **VENDOR ROUTES** (45 routes)

### **Vendor Dashboard**
```
src/app/(vendor)/vendor/
├── layout.tsx                         # Vendor layout - Vendor navigation with business metrics sidebar
├── dashboard/
│   └── page.tsx                       # /vendor/dashboard - Business overview with bookings, revenue, and performance metrics
```

### **Vendor Service Management**
```
src/app/(vendor)/vendor/services/
├── page.tsx                           # /vendor/services - Vendor's service portfolio management and status overview
├── create/
│   └── page.tsx                       # /vendor/services/create - Add new service with photos, pricing, and availability
└── [id]/
    ├── page.tsx                       # /vendor/services/[id] - Individual service analytics and booking history
    └── edit/
        └── page.tsx                   # /vendor/services/[id]/edit - Edit service details, pricing, and availability
```

### **Vendor Booking Management**
```
src/app/(vendor)/vendor/bookings/
├── page.tsx                           # /vendor/bookings - All incoming bookings with status and calendar view
└── [id]/
    └── page.tsx                       # /vendor/bookings/[id] - Individual booking details with customer info and service specifics
```

### **Vendor POS System**
```
src/app/(vendor)/vendor/pos/
├── page.tsx                           # /vendor/pos - Point of Sale dashboard with today's transactions and quick actions
├── payments/
│   └── page.tsx                       # /vendor/pos/payments - Payment schedule, pending payments, and payment history
├── expenses/
│   └── page.tsx                       # /vendor/pos/expenses - Business expense tracking and categorization
├── revenue/
│   └── page.tsx                       # /vendor/pos/revenue - Revenue analytics with charts and growth metrics
├── balance-sheet/
│   └── page.tsx                       # /vendor/pos/balance-sheet - Complete financial statement and profit/loss analysis
├── invoices/
│   └── page.tsx                       # /vendor/pos/invoices - Generate, send, and manage customer invoices
├── receipts/
│   └── page.tsx                       # /vendor/pos/receipts - Digital receipt management and customer delivery
├── transactions/
│   └── page.tsx                       # /vendor/pos/transactions - Detailed transaction history with search and filters
└── layout.tsx                         # POS layout - Financial navigation with quick stats sidebar
```

### **Vendor Content Management**
```
src/app/(vendor)/vendor/
├── reviews/
│   ├── page.tsx                       # /vendor/reviews - All received reviews with ratings and customer feedback
│   └── respond/
│       └── page.tsx                   # /vendor/reviews/respond - Respond to customer reviews and manage reputation
├── blog/
│   ├── page.tsx                       # /vendor/blog - Vendor's blog post management and publishing dashboard
│   ├── create/
│   │   └── page.tsx                   # /vendor/blog/create - Create new blog post with rich text editor and media
│   └── [id]/
│       └── edit/
│           └── page.tsx               # /vendor/blog/[id]/edit - Edit existing blog posts and update content
```

### **Vendor Advertising**
```
src/app/(vendor)/vendor/ads/
├── page.tsx                           # /vendor/ads - Advertisement campaign management and performance tracking
├── create/
│   └── page.tsx                       # /vendor/ads/create - Create new ad request with targeting and budget settings
├── payment/
│   └── page.tsx                       # /vendor/ads/payment - Ad campaign payment processing and billing
└── [id]/
    └── page.tsx                       # /vendor/ads/[id] - Individual ad campaign analytics and performance metrics
```

### **Vendor Coupon Management**
```
src/app/(vendor)/vendor/coupons/
├── page.tsx                           # /vendor/coupons - Coupon and voucher management with usage analytics
├── create/
│   └── page.tsx                       # /vendor/coupons/create - Create new discount coupons with terms and conditions
└── [id]/
    ├── page.tsx                       # /vendor/coupons/[id] - Individual coupon performance and usage statistics
    └── edit/
        └── page.tsx                   # /vendor/coupons/[id]/edit - Edit coupon details, validity, and discount rates
```

### **Vendor Communication**
```
src/app/(vendor)/vendor/
├── messages/
│   └── page.tsx                       # /messages/vendor - Vendor chat interface with customers and support team
├── notifications/
│   └── page.tsx                       # /vendor/notifications - Business notifications, booking alerts, and system updates
└── support/
    └── page.tsx                       # /vendor/support - Vendor support portal for business-related queries and help
```

---

## 4. **ADMIN ROUTES** (35 routes)

### **Admin Dashboard**
```
src/app/(admin)/admin/
├── layout.tsx                         # Admin layout - Administrative navigation with system monitoring sidebar
├── dashboard/
│   └── page.tsx                       # /admin/dashboard - Platform overview with key metrics, recent activities, and alerts
├── settings/
│   └── page.tsx                       # /admin/settings - System configuration, platform settings, and global preferences
```

### **Admin User Management**
```
src/app/(admin)/admin/
├── users/
│   └── page.tsx                       # /admin/users - Complete user management with search, suspension, and account controls
└── vendors/
    └── page.tsx                       # /admin/vendors - Vendor management, verification, and business oversight
```

### **Admin Content Management**
```
src/app/(admin)/admin/blog/
├── page.tsx                           # /admin/blog - Blog content moderation, featured posts, and editorial oversight
└── layout.tsx                         # Admin blog layout - Content management navigation
```

### **Admin Advertisement Management**
```
src/app/(admin)/admin/ads/
├── page.tsx                           # /admin/ads - Advertisement overview with approval queue and active campaigns
├── requests/
│   └── page.tsx                       # /admin/ads/requests - Vendor ad requests requiring approval and review
├── active/
│   └── page.tsx                       # /admin/ads/active - Currently running ad campaigns with performance monitoring
├── external/
│   └── page.tsx                       # /admin/ads/external - External advertiser management and third-party campaigns
├── schedule/
│   └── page.tsx                       # /admin/ads/schedule - Ad scheduling, placement management, and campaign calendar
└── layout.tsx                         # Admin ads layout - Advertisement management navigation
```

### **Admin Notification System**
```
src/app/(admin)/admin/notifications/
├── page.tsx                           # /admin/notifications - Notification center with sent/pending messages and delivery status
├── send/
│   └── page.tsx                       # /admin/notifications/send - Send targeted notifications to users, vendors, or all platform members
├── templates/
│   └── page.tsx                       # /admin/notifications/templates - Pre-designed notification templates and message customization
└── layout.tsx                         # Admin notifications layout - Notification management navigation
```

### **Admin Analytics & Reports**
```
src/app/(admin)/admin/analytics/
├── page.tsx                           # /admin/analytics - Main analytics dashboard with platform-wide metrics and trends
├── events/
│   └── page.tsx                       # /admin/analytics/events - Event booking analytics, popular services, and seasonal trends
├── users/
│   └── page.tsx                       # /admin/analytics/users - User behavior analytics, registration trends, and engagement metrics
├── vendors/
│   └── page.tsx                       # /admin/analytics/vendors - Vendor performance analytics, revenue tracking, and business insights
├── revenue/
│   └── page.tsx                       # /admin/analytics/revenue - Platform revenue analytics, commission tracking, and financial growth
└── layout.tsx                         # Admin analytics layout - Analytics navigation with metric filters

src/app/(admin)/admin/reports/
├── page.tsx                           # /admin/reports - Report dashboard with scheduled reports and export options
├── generate/
│   └── page.tsx                       # /admin/reports/generate - Custom report generator with date ranges and data selection
├── export/
│   └── page.tsx                       # /admin/reports/export - Report export in multiple formats (PDF, Excel, CSV)
└── layout.tsx                         # Admin reports layout - Report management navigation
```analytics/vendors
├── revenue/
│   └── page.tsx                       # /admin/analytics/revenue
└── layout.tsx

src/app/(admin)/admin/reports/
├── page.tsx                           # /admin/reports
├── generate/
│   └── page.tsx                       # /admin/reports/generate
├── export/
│   └── page.tsx                       # /admin/reports/export
└── layout.tsx
```

### **Admin Support Management**
```
src/app/(admin)/admin/support/
├── page.tsx                           # /admin/support
├── tickets/
│   └── page.tsx                       # /admin/support/tickets
├── knowledge-base/
│   └── page.tsx                       # /admin/support/knowledge-base
└── layout.tsx
```

### **Admin Oversight**
```
src/app/(admin)/admin/
├── coupons/
│   ├── page.tsx                       # /admin/coupons
│   └── reports/
│       └── page.tsx                   # /admin/coupons/reports
└── messages/
    ├── page.tsx                       # /admin/messages
    ├── analytics/
    │   └── page.tsx                   # /admin/messages/analytics
    └── [conversationId]/
        └── page.tsx                   # /admin/messages/[conversationId]
```

---

## 5. **API ROUTES** (GraphQL & REST)

### **GraphQL Endpoint**
```
src/app/api/
├── graphql/
│   └── route.ts                       # /api/graphql
```

### **Authentication APIs**
```
src/app/api/auth/
├── login/
│   └── route.ts                       # /api/auth/login
├── register/
│   └── route.ts                       # /api/auth/register
├── refresh/
│   └── route.ts                       # /api/auth/refresh
└── logout/
    └── route.ts                       # /api/auth/logout
```

### **File Upload APIs**
```
src/app/api/upload/
├── images/
│   └── route.ts                       # /api/upload/images
├── documents/
│   └── route.ts                       # /api/upload/documents
└── avatars/
    └── route.ts                       # /api/upload/avatars
```

### **Payment APIs**
```
src/app/api/payments/
├── create/
│   └── route.ts                       # /api/payments/create
├── webhook/
│   └── route.ts                       # /api/payments/webhook
└── verify/
    └── route.ts                       # /api/payments/verify
```

### **Notification APIs**
```
src/app/api/notifications/
├── send/
│   └── route.ts                       # /api/notifications/send
└── webhook/
    └── route.ts                       # /api/notifications/webhook
```

---

## 6. **MIDDLEWARE CONFIGURATION**

### **Route Protection Middleware**
```typescript
// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Public routes (no protection needed)
  const publicRoutes = [
    '/', '/about', '/contact', '/terms', '/privacy', '/help',
    '/login', '/register', '/forgot-password', '/reset-password',
    '/services', '/blog'
  ]
  
  // Role-based route protection
  const roleRoutes = {
    user: ['/dashboard', '/bookings', '/user', '/messages', '/notifications', '/support'],
    vendor: ['/vendor'],
    admin: ['/admin']
  }
  
  // Check if route is public
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }
  
  // Authentication and role checking logic here
  // ...
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

---

## 7. **LAYOUT HIERARCHY**

### **Root Layout**
```typescript
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
```

### **Role-Based Layouts**
```typescript
// src/app/(user)/layout.tsx - User Layout
export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <UserSidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

// src/app/(vendor)/layout.tsx - Vendor Layout
export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavbar />
      <VendorSidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

// src/app/(admin)/layout.tsx - Admin Layout
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <AdminSidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
```

---

## 8. **DYNAMIC ROUTING PATTERNS**

### **Service Categories**
```
/services/[category] - Dynamic category pages
/services/[category]/[id] - Individual service details
```

### **Blog System**
```
/blog/[slug] - Individual blog posts
/blog/category/[category] - Category-wise blog listing
```

### **ID-Based Routes**
```
/bookings/[id] - Specific booking details
/vendor/services/[id] - Specific service management
/support/tickets/[id] - Individual support ticket
/messages/[conversationId] - Chat conversations
```

---

## 9. **ROUTE PARAMETERS & SEARCH PARAMS**

### **Query Parameters**
```
/services/search?category=venue&location=karachi&price=min-max
/blog?tag=wedding&author=vendor123
/admin/analytics?date=2025-01-01&type=revenue
```

### **Route Segments**
```
/services/[category]/[id]/[action] - Nested dynamic routes
/vendor/pos/[report]/[period] - POS reporting routes
/admin/users/[userId]/[action] - User management actions
```

---

## 10. **TOTAL ROUTE COUNT BREAKDOWN**

| Route Category | Count | Description |
|----------------|-------|-------------|
| **Public Routes** | 15 | Open access routes |
| **User Routes** | 25 | User-specific functionality |
| **Vendor Routes** | 45 | Vendor business management |
| **Admin Routes** | 35 | Platform administration |
| **API Routes** | 15 | Backend API endpoints |
| **TOTAL** | **135** | Complete routing structure |

This comprehensive routing structure provides:
- **Clear separation of concerns** between different user roles
- **Scalable architecture** using Next.js App Router
- **Security through route grouping** and middleware protection
- **SEO-friendly URLs** with dynamic routing
- **Maintainable code structure** with proper layout hierarchy