# EvOrgs Role-Based Access Control (RBAC) Analysis

## User Roles Overview

The EvOrgs platform operates on a **3-tier role-based access system**:
1. **USER** - Event attendees/customers
2. **VENDOR** - Service providers
3. **ADMIN** - Platform administrators

---

## Detailed Role Analysis

### 1. **USER Role** 
**Primary Function**: Event attendees who book services and participate in events

#### **Permissions & Access**:
- ✅ **View/Browse Services**: Can view all available services (venue, farmhouse, catering, photography)
- ✅ **Book Services**: Can make bookings and process payments
- ✅ **Manage Personal Bookings**: View, modify, cancel their own bookings
- ✅ **Write Reviews**: Can review services they've used
- ✅ **Read Blogs**: Access to all blog content
- ✅ **Use Coupons**: Apply vouchers during booking
- ✅ **Chat with Vendors**: Direct communication with service providers
- ✅ **Receive Notifications**: Get booking updates, promotions, etc.
- ✅ **Access Support**: Create tickets and get help
- ✅ **Profile Management**: Update personal information

#### **Restrictions**:
- ❌ Cannot create or manage services
- ❌ Cannot access POS system
- ❌ Cannot view other users' bookings
- ❌ Cannot access admin functionalities
- ❌ Cannot create blog posts
- ❌ Cannot create advertisements
- ❌ Cannot view platform analytics

---

### 2. **VENDOR Role**
**Primary Function**: Service providers who offer event-related services

#### **Permissions & Access**:
- ✅ **Service Management**: Create, edit, delete their own services
- ✅ **Booking Management**: View and manage bookings for their services
- ✅ **POS System**: Complete financial management (payments, expenses, balance sheets)
- ✅ **Review Management**: View reviews and respond to them
- ✅ **Blog Creation**: Write and manage blog posts
- ✅ **Advertisement Requests**: Request ads and manage ad campaigns
- ✅ **Coupon Management**: Create and manage discount coupons
- ✅ **Chat with Users**: Communicate with potential customers
- ✅ **Notifications**: Receive booking alerts and system notifications
- ✅ **Support Access**: Get help and raise issues
- ✅ **Analytics**: View their own service performance metrics

#### **Restrictions**:
- ❌ Cannot access other vendors' data
- ❌ Cannot approve advertisements (admin approval required)
- ❌ Cannot view platform-wide analytics
- ❌ Cannot manage other users or vendors
- ❌ Cannot access admin settings
- ❌ Cannot send system-wide notifications
- ❌ Cannot modify platform policies

---

### 3. **ADMIN Role**
**Primary Function**: Platform administrators with full system access

#### **Permissions & Access**:
- ✅ **Complete User Management**: Create, edit, delete, suspend users and vendors
- ✅ **Service Oversight**: Monitor and moderate all services
- ✅ **Booking Management**: View all bookings across the platform
- ✅ **Review Moderation**: Monitor and moderate all reviews
- ✅ **Blog Management**: Create, edit, approve, and manage all blog content
- ✅ **Advertisement Control**: Approve/reject ads, manage ad scheduling
- ✅ **System Notifications**: Send notifications to users and vendors
- ✅ **Complete Analytics**: Access to all platform analytics and reports
- ✅ **Support Management**: Handle all support tickets and issues
- ✅ **Coupon Oversight**: Monitor and control coupon usage
- ✅ **Chat Monitoring**: View and moderate all chat conversations
- ✅ **System Configuration**: Manage platform settings and policies

#### **Full Access To**:
- ✅ All user data and activities
- ✅ All vendor data and financial information
- ✅ Platform revenue and financial reports
- ✅ System logs and security monitoring

---

## Route Access Matrix

### **Public Routes** (No Authentication Required)
```
/ (Homepage)
/login
/register
/services (browsing)
/services/[category] (browsing)
/blog (reading)
/about
/contact
/terms
/privacy
```

### **USER-Only Routes**
```
/dashboard (user dashboard)
/bookings/*
/user/reviews
/user/coupons
/messages (user chat)
/notifications (user)
/support (user tickets)
/profile
```

### **VENDOR-Only Routes**
```
/vendor/dashboard
/vendor/services/*
/vendor/bookings/*
/vendor/pos/*
/vendor/reviews
/vendor/blog/*
/vendor/ads/*
/vendor/coupons/*
/messages/vendor
/vendor/notifications
/vendor/support
```

### **ADMIN-Only Routes**
```
/admin/dashboard
/admin/users
/admin/vendors
/admin/services/*
/admin/bookings/*
/admin/reviews
/admin/blog/*
/admin/ads/*
/admin/notifications/*
/admin/analytics/*
/admin/reports/*
/admin/support/*
/admin/coupons/*
/admin/messages/*
/admin/settings
```

---

## Access Control Implementation Strategy

### **Frontend Route Protection**
```javascript
// Example middleware structure
const rolePermissions = {
  USER: ['user', 'public'],
  VENDOR: ['vendor', 'user', 'public'],
  ADMIN: ['admin', 'vendor', 'user', 'public']
}

// Route protection logic
function canAccess(userRole, requiredRole) {
  return rolePermissions[userRole].includes(requiredRole)
}
```

### **Hierarchical Access Levels**
1. **Public** < **User** < **Vendor** < **Admin**
2. Higher roles inherit lower role permissions
3. Specific restrictions apply even within inherited permissions

### **Data Isolation Rules**

#### **User Level**:
- Can only access their own data
- Cannot see other users' information
- Booking history is personal only

#### **Vendor Level**:
- Can access their own business data
- Can see their customers' booking info (limited scope)
- Cannot access other vendors' data
- Cannot see platform-wide financial data

#### **Admin Level**:
- Full access to all data
- Can impersonate other roles for testing
- Access to aggregated analytics across all users/vendors

---

## Security Considerations

### **Authentication & Authorization**
- JWT tokens with role-based claims
- Refresh token mechanism
- Session management
- API endpoint protection

### **Data Privacy**
- Role-based data filtering
- Encrypted sensitive information
- Audit logging for admin actions
- GDPR compliance for user data

### **Business Logic Security**
- Vendors can only modify their own services
- Users can only book available services
- Financial transactions are tracked and auditable
- Chat messages are encrypted

---

## Permission Escalation Rules

### **User → Vendor**
- Requires verification process
- Admin approval needed
- Additional documentation required
- Enhanced profile validation

### **Vendor → Admin**
- Not allowed through normal flow
- System-level access only
- Requires technical/business authorization

### **Role Suspension**
- Admin can suspend any user/vendor
- Suspended accounts lose all permissions
- Booking obligations remain intact
- Appeal process available

---

## API Access Control

### **GraphQL Schema-Level Protection**
```graphql
type Query {
  # User-accessible
  services: [Service] @auth(role: "USER")
  myBookings: [Booking] @auth(role: "USER", scope: "own")
  
  # Vendor-accessible
  vendorBookings: [Booking] @auth(role: "VENDOR", scope: "own")
  vendorAnalytics: Analytics @auth(role: "VENDOR", scope: "own")
  
  # Admin-accessible
  allUsers: [User] @auth(role: "ADMIN")
  platformAnalytics: Analytics @auth(role: "ADMIN")
}
```

### **Database-Level Security**
- Row-level security policies
- Role-based database users
- Encrypted connections
- Audit logging

This comprehensive RBAC system ensures secure, scalable access control while maintaining clear separation of concerns between different user types in the EvOrgs platform.