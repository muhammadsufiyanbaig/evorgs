import { links } from "../data";

export type AdminCustomPackage = {
  id: string
  userId: string
  vendorId: string
  orderDetails: string
  guestCount: number
  eventDate: string // ISO date
  price: number
  status: "pending" | "confirmed" | "canceled" | "fulfilled"
  createdAt: string
  updatedAt: string
}

export type AdminCustomPackageFilters = {
  status?: AdminCustomPackage["status"]
  q?: string
  page?: number
  pageSize?: number
}

export type AdminCustomPackageList = {
  packages: AdminCustomPackage[]
  total: number
  page: number
  totalPages: number
}

export type CateringPackage = {
  id: string
  vendorId: string
  packageName: string
  serviceArea: string
  description: string
  imageUrl: string
  price: number
  minGuests: number
  maxGuests: number
  menuItems: string[]
  dietaryOptions: string[]
  amenities: string[]
  isAvailable: boolean
  reviewCount: number
  createdAt: string
  updatedAt: string
}

export type CateringPackageList = {
  packages: CateringPackage[]
  total: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface ContactFormData {
  senderName: string;
  senderEmail: string;
  message: string;
}
export interface IconInterface {
  color?: string; // Color for the icon (optional)
  className?: string; // Color for the icon (optional)
  height?: string | number; // Height of the icon (optional)
  width?: string | number; // Width of the icon (optional)
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  profileImage: File | null;
}
export type Farmhouse = {
  id: string;
  vendorId: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  perNightPrice: number;
  minNights: number;
  maxNights: number;
  maxGuests: number;
  amenities: string[];
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type SectionName = (typeof links)[number]["name"];
export type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime?: string;
  location?: string;
  color: "blue" | "pink";
};


export type Client = {
  id: string;
  name: string;
  email: string;
  mobileNumber: string | null;
  reviews: number;
  sales: number;
  createdAt: Date;
};

export interface TeamMember {
  id: string;
  name: string;
  image: string;
  email?: string;
  phone?: string;
  reviews?: number;
}

export interface Shift {
  start: string;
  end: string;
  memberId: string;
}

export interface WeeklySchedule {
  startDate: Date;
  endDate: Date;
  shifts: Record<string, Shift[]>;
}

export interface TeamMember {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  image: string;
}

export interface Shift {
  start: string;
  end: string;
}

export interface TeamMemberShift extends TeamMember {
  shifts: Shift[];
}

export interface Report {
  id: string;
  title: string;
  description: string;
  type: "dashboard" | "report";
  category: Category;
  isFavorite: boolean;
  createdBy: string;
  icon: "chart" | "tag";
}

export type Category =
  | "All reports"
  | "Sales"
  | "Finance"
  | "Appointments"
  | "Team"
  | "Clients"
  | "Inventory";


type View = "all" | "favourites" | "dashboards" | "standard"

export interface ReportsState {
  reports: Report[]
  favorites: Set<string>
  activeCategory: Category
  searchQuery: string
  createdByFilter: string | null
  currentView: View
  toggleFavorite: (id: string) => void
  setActiveCategory: (category: Category) => void
  setSearchQuery: (query: string) => void
  setCreatedByFilter: (creator: string | null) => void
  setCurrentView: (view: View) => void
}

// Define types
interface Deal {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface StoreState {
  selectedCategory: "Sponsored" | "Featured";
  sponsoredDeals: Deal[];
  featuredDeals: Deal[];
  setCategory: (category: "Sponsored" | "Featured") => void;
}
export interface DealCardProps {
  deal: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
}

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Canceled"
export type PaymentStatus =
  | "Awaiting Advance"
  | "Advance Paid"
  | "Partially Paid"
  | "Fully Paid"
  | "Refunded"
  | "Canceled"
export type VisitStatus = "Not Requested" | "Requested" | "Scheduled" | "Completed" | null
export type CustomOrderStatus = "Requested" | "Quoted" | "Accepted" | "Rejected"

export interface User {
  id: string
  name: string
  email: string
}

export interface Booking {
  id: string
  bookingReference: string
  userId: string
  userName: string
  userAvatar: string
  serviceType: ServiceType
  serviceName: string
  serviceId: string
  eventDate: string
  numberOfGuests: number
  totalAmount: number
  advanceAmount: number
  balanceAmount: number
  status: BookingStatus
  paymentStatus: PaymentStatus
  visitRequested: boolean
  visitStatus: VisitStatus
  visitScheduledFor: string | null
  specialRequests: string
  createdAt: string
}

export interface Service {
  id: string
  name: string
  category: "Venue" | "Catering" | "Photography" | "FarmHouse"
  location: string
  price: number
  rating: number
  reviewCount: number
  imageUrl: string
}

export interface CateringCustomPackage {
  id: string
  vendorId: string
  userId: string
  orderDetails: string
  guestCount: number
  eventDate: string
  price: number
  status: CustomOrderStatus
  createdAt: string
  updatedAt: string
}

export interface PhotographyCustomOrder {
  id: string
  vendorId: string
  userId: string
  orderDetails: string
  eventDate: string
  eventDuration: number
  price: number
  status: CustomOrderStatus
  createdAt: string
  updatedAt: string
}

export type ViewType = "day" | "week" | "month"

export interface Event {
  id: string
  title: string
  date: Date
  startTime: string
  location: string
  color: "blue" | "pink" | "gray"
  bookingId?: string
}


// ==================== ENUM TYPES ====================

export enum AdType {
  Featured = "Featured",
  Sponsored = "Sponsored",
  Premium = "Premium",
}

export enum ScheduleStatus {
  SCHEDULED = "Scheduled",
  RUNNING = "Running",
  COMPLETED = "Completed",
  FAILED = "Failed",
  CANCELLED = "Cancelled",
  PAUSED = "Paused",
}

export enum EntityType {
  Farmhouse = "Farmhouse",
  Venue = "Venue",
  PhotographyPackage = "PhotographyPackage",
  CateringPackage = "CateringPackage",
}

export enum RequestStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  Under_Review = "Under_Review",
}

export enum ServiceAdStatus {
  Scheduled = "Scheduled",
  Active = "Active",
  Paused = "Paused",
  Expired = "Expired",
  Cancelled = "Cancelled",
}

export enum AdsPaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Failed = "Failed",
  Refunded = "Refunded",
}

// ==================== CORE ENTITY TYPES ====================

export interface AdRequest {
  id: string
  vendorId: string
  adType: AdType
  entityType: EntityType
  entityId: string
  adTitle: string
  adDescription?: string
  adImage?: string
  requestedPrice: number
  requestedStartDate: string
  requestedEndDate: string
  requestedDuration: number
  targetAudience?: string[]
  vendorNotes?: string
  status: RequestStatus
  adminNotes?: string
  reviewedBy?: string
  reviewedAt?: string
  createdAt: string
  updatedAt: string
}

export interface ServiceAd {
  id: string
  requestId: string
  vendorId: string
  adType: AdType
  entityType: EntityType
  entityId: string
  adTitle: string
  adDescription?: string
  adImage?: string
  finalPrice: number
  status: ServiceAdStatus
  adminStartDate: string
  adminEndDate: string
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  createdAt: string
  updatedAt: string
}

export interface DashboardStats {
  totalAdRequests: number
  pendingRequests: number
  activeAds: number
  totalRevenue: number
  totalImpressions: number
  totalClicks: number
  averageCTR: number
}

export interface DailyRevenue {
  date: string
  revenue: number
  adCount: number
}

export interface RevenueAnalytics {
  totalRevenue: number
  dailyRevenue: DailyRevenue[]
  averageDailyRevenue: number
  revenueGrowth: number
}


// TypeScript types for Notification System Client-Side GraphQL Operations

export enum NotificationType {
  General = "General",
  All_Vendors = "All_Vendors",
  Vendor_Personal = "Vendor_Personal",
  All_Users = "All_Users",
  User_Personal = "User_Personal",
}

export enum NotificationCategory {
  Booking = "Booking",
  Payment = "Payment",
  System = "System",
  Chat = "Chat",
  Promotion = "Promotion",
  General = "General",
}

export enum NotificationPriority {
  low = "low",
  medium = "medium",
  high = "high",
  urgent = "urgent",
}

export enum RelatedType {
  Booking = "Booking",
  Payment = "Payment",
  Chat = "Chat",
  Review = "Review",
  User = "User",
  Vendor = "Vendor",
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

// ==================== CORE TYPES ====================

export interface Notification {
  id: string
  notificationType: NotificationType
  targetUserId?: string
  targetVendorId?: string
  title: string
  message: string
  category: NotificationCategory
  data?: any
  linkTo?: string
  relatedId?: string
  relatedType?: RelatedType
  priority: NotificationPriority
  isActive: boolean
  scheduledAt?: string
  sentAt?: string
  totalRecipients: number
  successfulSends: number
  failedSends: number
  createdBy?: string
  createdAt: string
  updatedAt: string
  isRead?: boolean
  readAt?: string
  targetUser?: User
  targetVendor?: Vendor
  creator?: Admin
}

export interface NotificationReadStatus {
  id: string
  notificationId: string
  userId?: string
  vendorId?: string
  adminId?: string
  readAt: string
  notification?: Notification
  user?: User
  vendor?: Vendor
  admin?: Admin
}

export interface NotificationStats {
  totalNotifications: number
  totalSentToday: number
  totalReadToday: number
  totalUnread: number
  byCategory: CategoryStats[]
  byType: TypeStats[]
}

export interface CategoryStats {
  category: NotificationCategory
  count: number
}

export interface TypeStats {
  type: NotificationType
  count: number
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  profileImage?: string
}

export interface Vendor {
  vendorStatus: string;
  bannerImage: string;
  bannerImage: string;
  vendorSocialLinks: never[];
  vendorWebsite: string;
  vendorProfileDescription: string;
  vendorAddress: string;
  vendorPhone: string;
  id: string
  businessName: string
  email: string
  logo?: string
}

export interface Admin {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface FCMResponse {
  success: boolean
  message: string
  failedTokens: string[]
  successCount: number
  failureCount: number
}

export interface NotificationResponse {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  notifications: Notification[]
}

export interface NotificationFilter {
  category?: NotificationCategory
  priority?: NotificationPriority
  isRead?: boolean
  dateFrom?: string
  dateTo?: string
  search?: string
}

export interface NotificationPaginationInput {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

export interface CreateNotificationInput {
  notificationType: NotificationType
  targetUserId?: string
  targetVendorId?: string
  title: string
  message: string
  category: NotificationCategory
  data?: any
  linkTo?: string
  relatedId?: string
  relatedType?: RelatedType
  priority?: NotificationPriority
  scheduledAt?: string
}

export interface UpdateNotificationInput {
  id: string
  title?: string
  message?: string
  category?: NotificationCategory
  data?: any
  linkTo?: string
  priority?: NotificationPriority
  isActive?: boolean
  scheduledAt?: string
}
// TypeScript Types and Interfaces for Reviews System
// Complete type definitions for client-side operations

// ==================== CORE REVIEW TYPES ====================

export interface Review {
  id: string;
  rating: number;
  comment: string;
  serviceType: ServiceType;
  serviceId: string;
  userId: string;
  vendorId: string;
  isVerified: boolean;
  isPublished: boolean;
  moderationStatus?: ModerationStatus;
  moderationNotes?: string;
  moderatedBy?: string;
  moderatedAt?: string;
  flaggedCount?: number;
  reportedCount?: number;
  likesCount?: number;
  helpfulCount?: number;
  unhelpfulCount?: number;
  viewsCount?: number;
  isLikedByUser?: boolean;
  userMarkedHelpful?: boolean | null;
  attachments?: string[];
  serviceAspects?: ServiceAspects;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  vendor?: Vendor;
  response?: ReviewResponse;
}

export interface ReviewResponse {
  id: string
  responseText: string
  reviewId: string
  vendorId: string
  templateType?: ResponseTemplateType
  actionPlan?: string
  offerCompensation?: boolean
  attachments?: string[]
  createdAt: string
  updatedAt: string
  review?: Review
  vendor?: Vendor
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  profileImage?: string
  isActive: boolean
  isVerified?: boolean
}

export interface Vendor {
  id: string
  vendorName: string
  email: string
  phone?: string
  logo?: string
  businessType: string
  address?: string
  city?: string
  state?: string
  country?: string
  isActive: boolean
  isVerified: boolean
}

// ==================== ENUMS ====================

export type ServiceType = "VENUE" | "CATERING" | "PHOTOGRAPHY" | "FARMHOUSE" | "BOOKING" | "OTHER"

export type ModerationStatus = "PENDING" | "APPROVED" | "REJECTED" | "FLAGGED" | "UNDER_REVIEW"

export type ResponseTemplateType =
  | "THANK_YOU"
  | "ADDRESS_CONCERNS"
  | "APOLOGIZE"
  | "CLARIFY"
  | "INVITE_CONTACT"
  | "CUSTOM"

export type ModerationPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export type ExportFormat = "CSV" | "JSON" | "XML" | "PDF"

export type SortDirection = "asc" | "desc"

export type ReviewSortField = "createdAt" | "updatedAt" | "rating" | "helpfulCount" | "likesCount" | "viewsCount"

// ==================== SERVICE ASPECTS ====================

export interface ServiceAspects {
  venue?: VenueAspects
  catering?: CateringAspects
  photography?: PhotographyAspects
  farmhouse?: FarmhouseAspects
  booking?: BookingAspects
}

export interface VenueAspects {
  location: number
  ambiance: number
  cleanliness: number
  facilities: number
  staff: number
  valueForMoney: number
}

export interface CateringAspects {
  foodQuality: number
  presentation: number
  variety: number
  service: number
  hygiene: number
  valueForMoney: number
}

export interface PhotographyAspects {
  creativity: number
  technical: number
  professionalism: number
  communication: number
  timeliness: number
  valueForMoney: number
}

export interface FarmhouseAspects {
  location: number
  facilities: number
  cleanliness: number
  privacy: number
  activities: number
  valueForMoney: number
}

export interface BookingAspects {
  easeOfBooking: number
  communication: number
  flexibility: number
  support: number
  valueForMoney: number
}

// ==================== INPUT TYPES ====================

export interface CreateReviewInput {
  rating: number
  comment: string
  serviceType: ServiceType
  serviceId: string
  vendorId: string
  serviceAspects?: ServiceAspects
  attachments?: string[]
}

export interface UpdateReviewInput {
  id: string
  rating?: number
  comment?: string
  serviceAspects?: ServiceAspects
  attachments?: string[]
}

export interface CreateReviewResponseInput {
  reviewId: string
  responseText: string
  templateType?: ResponseTemplateType
  actionPlan?: string
  offerCompensation?: boolean
  attachments?: string[]
}

export interface UpdateReviewResponseInput {
  id: string
  responseText?: string
  actionPlan?: string
  offerCompensation?: boolean
  attachments?: string[]
}

export interface VenueAspectsInput {
  location: number
  ambiance: number
  cleanliness: number
  facilities: number
  staff: number
  valueForMoney: number
}

export interface CateringAspectsInput {
  foodQuality: number
  presentation: number
  variety: number
  service: number
  hygiene: number
  valueForMoney: number
}

export interface PhotographyAspectsInput {
  creativity: number
  technical: number
  professionalism: number
  communication: number
  timeliness: number
  valueForMoney: number
}

export interface ServiceAspectsInput {
  venue?: VenueAspectsInput
  catering?: CateringAspectsInput
  photography?: PhotographyAspectsInput
  farmhouse?: FarmhouseAspects
  booking?: BookingAspects
}

export interface ExternalReviewInput {
  externalId: string
  source: string
  rating: number
  comment: string
  reviewerName: string
  reviewerEmail?: string
  serviceType: ServiceType
  serviceId: string
  vendorId: string
  reviewDate: string
  isVerified?: boolean
}

// ==================== FILTER AND PAGINATION TYPES ====================

export interface ReviewFilters {
  rating?: number[]
  serviceType?: ServiceType[]
  isVerified?: boolean
  isPublished?: boolean
  moderationStatus?: ModerationStatus[]
  dateFrom?: string
  dateTo?: string
  vendorId?: string
  userId?: string
  serviceId?: string
  searchTerm?: string
  hasResponse?: boolean
  minRating?: number
  maxRating?: number
  updatedAfter?: string
  ids?: string[]
}

export interface PaginationInput {
  page: number
  limit: number
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ReviewSortOptions {
  field: ReviewSortField
  direction: SortDirection
}

// ==================== RESPONSE TYPES ====================

export interface PaginatedReviews {
  reviews: Review[]
  pagination: Pagination
  filters?: ReviewFilters
}

export interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: RatingDistribution[]
  verifiedReviews: number
  publishedReviews: number
  responseRate: number
  averageResponseTime: number
}

export interface VendorReviewStats extends ReviewStats {
  vendorId: string
  recentReviews: Review[]
  topRatedServices: ServiceStats[]
}

export interface ServiceReviewStats extends ReviewStats {
  serviceId: string
  serviceType: ServiceType
  recentReviews: Review[]
}

export interface RatingDistribution {
  rating: number
  count: number
  percentage: number
}

export interface ServiceStats {
  serviceType: ServiceType
  serviceId: string
  averageRating: number
  totalReviews: number
}

export interface ReviewMetrics {
  totalReviews: number
  totalRating: number
  averageRating: number
  fiveStarCount: number
  fourStarCount: number
  threeStarCount: number
  twoStarCount: number
  oneStarCount: number
  verifiedPercentage: number
  responsePercentage: number
}

// ==================== OPERATION RESULT TYPES ====================

export interface DeleteResult {
  success: boolean
  message: string
  deletedReviewId?: string
  deletedResponseId?: string
}

export interface BulkOperationResult {
  successCount: number
  failureCount: number
  errors?: BulkOperationError[]
}

export interface BulkVerifyResult extends BulkOperationResult {
  verifiedReviews: Review[]
}

export interface BulkUnverifyResult extends BulkOperationResult {
  unverifiedReviews: Review[]
}

export interface BulkPublishResult extends BulkOperationResult {
  publishedReviews: Review[]
}

export interface BulkUnpublishResult extends BulkOperationResult {
  unpublishedReviews: Review[]
}

export interface BulkDeleteResult extends BulkOperationResult {
  deletedIds: string[]
}

export interface BulkOperationError {
  reviewId: string
  message: string
}

export interface FlagReviewResult {
  success: boolean
  message: string
  flaggedReview: {
    id: string
    moderationStatus: ModerationStatus
    flaggedCount: number
  }
}

export interface ReportReviewResult {
  success: boolean
  message: string
  reportedReview: {
    id: string
    moderationStatus: ModerationStatus
    reportedCount: number
  }
}

export interface LikeReviewResult {
  success: boolean
  isLiked: boolean
  likeCount: number
  review: {
    id: string
    likesCount: number
    isLikedByUser: boolean
  }
}

export interface TrackViewResult {
  success: boolean
  viewCount: number
}

export interface MarkHelpfulResult {
  success: boolean
  helpfulCount: number
  unhelpfulCount: number
  userMarkedHelpful: boolean
}

export interface ImportResult {
  successCount: number
  failureCount: number
  importedReviews: Review[]
  errors: ImportError[]
}

export interface ImportError {
  index: number
  message: string
  externalId: string
}

export interface ExportResult {
  success: boolean
  downloadUrl: string
  fileName: string
  recordCount: number
  expiresAt: string
}

export interface ModerationTicket {
  id: string
  reviewId: string
  priority: ModerationPriority
  status: string
  assignedTo?: string
  createdAt: string
}

export interface SubmitModerationResult {
  success: boolean
  moderationTicket: ModerationTicket
}

// ==================== REACT HOOK TYPES ====================

export interface UseReviewsResult {
  reviews: Review[]
  pagination?: Pagination
  loading: boolean
  error?: Error
  refetch: () => void
}

export interface UseReviewResult {
  review?: Review
  loading: boolean
  error?: Error
  refetch: () => void
}

export interface UseCreateReviewResult {
  createReview: (input: CreateReviewInput) => Promise<Review>
  loading: boolean
  error?: Error
}

export interface UseUpdateReviewResult {
  updateReview: (input: UpdateReviewInput) => Promise<Review>
  loading: boolean
  error?: Error
}

export interface UseDeleteReviewResult {
  deleteReview: (id: string) => Promise<DeleteResult>
  loading: boolean
  error?: Error
}

export interface UseCreateResponseResult {
  createResponse: (input: CreateReviewResponseInput) => Promise<ReviewResponse>
  loading: boolean
  error?: Error
}

export interface UseReviewStatsResult {
  stats?: ReviewStats | VendorReviewStats | ServiceReviewStats
  loading: boolean
  error?: Error
  refetch: () => void
}

export interface UseReviewModerationResult {
  verifyReview: (id: string) => Promise<Review>
  unverifyReview: (id: string) => Promise<Review>
  publishReview: (id: string) => Promise<Review>
  unpublishReview: (id: string) => Promise<Review>
  deleteReview: (id: string) => Promise<DeleteResult>
  loading: boolean
  error?: Error
}

export interface UseBulkOperationsResult {
  bulkVerify: (ids: string[]) => Promise<BulkVerifyResult>
  bulkUnverify: (ids: string[]) => Promise<BulkUnverifyResult>
  bulkPublish: (ids: string[]) => Promise<BulkPublishResult>
  bulkUnpublish: (ids: string[]) => Promise<BulkUnpublishResult>
  bulkDelete: (ids: string[]) => Promise<BulkDeleteResult>
  loading: boolean
  error?: Error
}

export interface UseReviewInteractionsResult {
  flagReview: (reviewId: string, reason: string, description?: string) => Promise<FlagReviewResult>
  reportReview: (reviewId: string, reason: string, description?: string) => Promise<ReportReviewResult>
  likeReview: (reviewId: string) => Promise<LikeReviewResult>
  unlikeReview: (reviewId: string) => Promise<LikeReviewResult>
  markHelpful: (reviewId: string, isHelpful: boolean) => Promise<MarkHelpfulResult>
  loading: boolean
  error?: Error
}

// ==================== FORM VALIDATION TYPES ====================

export interface ReviewFormData {
  rating: number
  comment: string
  serviceType: ServiceType
  serviceId: string
  serviceAspects?: ServiceAspects
  attachments?: string[]
}

export interface ResponseFormData {
  responseText: string
  templateType?: ResponseTemplateType
  actionPlan?: string
  offerCompensation?: boolean
  attachments?: string[]
}

export interface ReviewFormErrors {
  rating?: string
  comment?: string
  serviceType?: string
  serviceId?: string
  serviceAspects?: Record<string, string>
  attachments?: string
  general?: string
}

export interface ResponseFormErrors {
  responseText?: string
  templateType?: string
  actionPlan?: string
  attachments?: string
  general?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

// ==================== UTILITY TYPES ====================

export interface ReviewFiltersState extends ReviewFilters {
  sortBy: ReviewSortField
  sortDirection: SortDirection
}

export interface ReviewListState {
  reviews: Review[]
  filters: ReviewFiltersState
  pagination: Pagination
  loading: boolean
  error?: string
  selectedReviews: string[]
}

export interface ReviewDetailState {
  review?: Review
  responses: ReviewResponse[]
  stats?: ReviewStats
  loading: boolean
  error?: string
}

export interface ReviewAnalytics {
  totalViews: number
  totalLikes: number
  totalFlags: number
  totalReports: number
  conversionRate: number
  engagementRate: number
  responseTime: number
  satisfactionScore: number
}

// ==================== CONSTANTS ====================

export const REVIEW_CONSTANTS = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  MIN_COMMENT_LENGTH: 10,
  MAX_COMMENT_LENGTH: 2000,
  MAX_RESPONSE_LENGTH: 1000,
  MAX_ATTACHMENTS: 5,
  RATING_LABELS: {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  },
  SERVICE_TYPES: ["VENUE", "CATERING", "PHOTOGRAPHY", "FARMHOUSE", "BOOKING", "OTHER"] as unknown as ServiceType[],
  MODERATION_STATUSES: ["PENDING", "APPROVED", "REJECTED", "FLAGGED", "UNDER_REVIEW"] as ModerationStatus[],
  RESPONSE_TEMPLATES: [
    "THANK_YOU",
    "ADDRESS_CONCERNS",
    "APOLOGIZE",
    "CLARIFY",
    "INVITE_CONTACT",
    "CUSTOM",
  ] as ResponseTemplateType[],
}

// ==================== DEFAULT VALUES ====================

export const DEFAULT_REVIEW_FILTERS: ReviewFilters = {
  rating: [],
  serviceType: [],
  isVerified: undefined,
  isPublished: true,
  moderationStatus: [],
  hasResponse: undefined,
}

export const DEFAULT_PAGINATION: PaginationInput = {
  page: 1,
  limit: 10,
}

export const DEFAULT_SORT_OPTIONS: ReviewSortOptions = {
  field: "createdAt",
  direction: "desc",
}

export const DEFAULT_SERVICE_ASPECTS: ServiceAspects = {
  venue: {
    location: 0,
    ambiance: 0,
    cleanliness: 0,
    facilities: 0,
    staff: 0,
    valueForMoney: 0,
  },
}

// TypeScript Types for Support System Client-Side Operations

// ==================== ENUMS ====================

export type TicketType = 'Account' | 'Booking' | 'Payment' | 'Technical' | 'Feature' | 'Other';

export type Priority = "Low" | "Medium" | "High" | "Urgent"

export type TicketStatus = "Open" | "InProgress" | "Resolved" | "Closed" | "Reopened"

// ==================== CORE TYPES ====================

export interface SupportTicket {
  id: string
  userId?: string
  vendorId?: string
  subject: string
  description: string
  ticketType: TicketType
  priority: Priority
  status: TicketStatus
  attachments: string[]
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  closedAt?: string
  responses?: SupportResponse[]
  creator?: TicketCreator
}

export interface SupportResponse {
  id: string
  ticketId: string
  adminId?: string
  userId?: string
  vendorId?: string
  responseText: string
  attachments: string[]
  isInternal: boolean
  createdAt: string
  updatedAt: string
  responder?: ResponseCreator
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  profileImage?: string
}

export interface Vendor {
  id: string
  vendorName: string
  vendorEmail: string
  profileImage?: string
  vendorType: string
}

export interface Admin {
  id: string
  firstName: string
  lastName: string
  email: string
  profileImage?: string
}

export type TicketCreator = User | Vendor
export type ResponseCreator = User | Vendor | Admin

// ==================== INPUT TYPES ====================

export interface CreateTicketInput {
  subject: string
  description: string
  ticketType: TicketType
  attachments?: string[]
}

export interface CreateResponseInput {
  ticketId: string
  responseText: string
  attachments?: string[]
  isInternal?: boolean
}

export interface UpdateTicketInput {
  id: string
  priority?: Priority
  status?: TicketStatus
}

// ==================== QUERY VARIABLES TYPES ====================

export type GetMyTicketsVariables = {}

export type GetAllTicketsVariables = {}

export interface GetTicketVariables {
  id: string
}

export interface GetTicketResponsesVariables {
  ticketId: string
}

// ==================== MUTATION VARIABLES TYPES ====================

export interface CreateTicketVariables {
  input: CreateTicketInput
}

export interface AddResponseVariables {
  input: CreateResponseInput
}

export interface UpdateTicketPriorityVariables {
  id: string
  priority: Priority
}

export interface UpdateTicketStatusVariables {
  id: string
  status: TicketStatus
}

export interface ResolveTicketVariables {
  id: string
  responseText: string
  attachments?: string[]
}

export interface CloseTicketVariables {
  id: string
}

export interface ReopenTicketVariables {
  id: string
}

export interface SetTicketHighPriorityVariables {
  id: string
}

export interface SetTicketUrgentPriorityVariables {
  id: string
}

export interface MarkTicketInProgressVariables {
  id: string
}

export interface AddInternalNoteVariables {
  ticketId: string
  responseText: string
  attachments?: string[]
}

export interface AddPublicResponseVariables {
  ticketId: string
  responseText: string
  attachments?: string[]
}

export interface CreateAccountTicketVariables {
  subject: string
  description: string
  attachments?: string[]
}

export interface CreateBookingTicketVariables {
  subject: string
  description: string
  attachments?: string[]
}

export interface CreatePaymentTicketVariables {
  subject: string
  description: string
  attachments?: string[]
}

export interface CreateTechnicalTicketVariables {
  subject: string
  description: string
  attachments?: string[]
}

export interface CreateFeatureTicketVariables {
  subject: string
  description: string
  attachments?: string[]
}

// ==================== BULK OPERATION TYPES ====================

export interface UpdateMultipleTicketsPriorityVariables {
  ticketIds: string[]
  priority: Priority
}

export interface UpdateMultipleTicketsStatusVariables {
  ticketIds: string[]
  status: TicketStatus
}

export interface CloseMultipleTicketsVariables {
  ticketIds: string[]
}

export interface BulkOperationResult {
  success: boolean
  updatedCount?: number
  closedCount?: number
  errors?: BulkOperationError[]
}

export interface BulkOperationError {
  ticketId: string
  message: string
}

// ==================== RESPONSE TYPES ====================

export interface GetMyTicketsResponse {
  getMyTickets: SupportTicket[]
}

export interface GetAllTicketsResponse {
  getAllTickets: SupportTicket[]
}

export interface GetTicketResponse {
  getTicket: SupportTicket
}

export interface GetTicketResponsesResponse {
  getTicketResponses: SupportResponse[]
}

export interface CreateTicketResponse {
  createTicket: SupportTicket
}

export interface AddResponseResponse {
  addResponse: SupportResponse
}

export interface UpdateTicketPriorityResponse {
  updateTicketPriority: SupportTicket
}

export interface UpdateTicketStatusResponse {
  updateTicketStatus: SupportTicket
}

export interface ResolveTicketResponse {
  resolveTicket: SupportTicket
}

export interface CloseTicketResponse {
  closeTicket: SupportTicket
}

export interface ReopenTicketResponse {
  reopenTicket: SupportTicket
}

// ==================== HOOK RETURN TYPES ====================

export interface UseMyTicketsResult {
  tickets: SupportTicket[]
  loading: boolean
  error?: Error
  refetch: () => void
}

export interface UseAllTicketsResult {
  tickets: SupportTicket[]
  loading: boolean
  error?: Error
  refetch: () => void
}

export interface UseTicketResult {
  ticket?: SupportTicket
  loading: boolean
  error?: Error
  refetch: () => void
}

export interface UseTicketResponsesResult {
  responses: SupportResponse[]
  loading: boolean
  error?: Error
  refetch: () => void
}

export interface UseCreateTicketResult {
  createTicket: (input: CreateTicketInput) => Promise<SupportTicket>
  loading: boolean
  error?: Error
}

export interface UseAddResponseResult {
  addResponse: (input: CreateResponseInput) => Promise<SupportResponse>
  loading: boolean
  error?: Error
}

export interface UseUpdateTicketResult {
  updatePriority: (id: string, priority: Priority) => Promise<SupportTicket>
  updateStatus: (id: string, status: TicketStatus) => Promise<SupportTicket>
  resolveTicket: (id: string, responseText: string, attachments?: string[]) => Promise<SupportTicket>
  closeTicket: (id: string) => Promise<SupportTicket>
  reopenTicket: (id: string) => Promise<SupportTicket>
  loading: boolean
  error?: Error
}

// ==================== FORM TYPES ====================

export interface TicketFormData {
  subject: string
  description: string
  ticketType: TicketType
  attachments: string[]
}

export interface ResponseFormData {
  responseText: string
  attachments?: string[]
  isInternal: boolean
}

export interface TicketFilterFormData {
  status?: TicketStatus[]
  priority?: Priority[]
  ticketType?: TicketType[]
  dateRange?: {
    start: string
    end: string
  }
  creatorType?: ("User" | "Vendor")[]
}

// ==================== UTILITY TYPES ====================

export interface TicketState {
  tickets: SupportTicket[]
  selectedTicket?: SupportTicket
  filters: TicketFilterFormData
  isLoading: boolean
  error?: string
}

export interface TicketStats {
  total: number
  open: number
  inProgress: number
  resolved: number
  closed: number
  byPriority: {
    low: number
    medium: number
    high: number
    urgent: number
  }
  byType: {
    account: number
    booking: number
    payment: number
    technical: number
    feature: number
    other: number
  }
}

export interface TicketMetrics {
  averageResponseTime: number
  averageResolutionTime: number
  satisfactionRating: number
  totalTicketsThisMonth: number
  resolvedTicketsThisMonth: number
  resolutionRate: number
}

// ==================== VALIDATION TYPES ====================

export interface TicketValidationError {
  field: string
  message: string
}

export interface TicketFormValidation {
  isValid: boolean
  errors: Record<string, string>
}

export interface ResponseValidationError {
  field: string
  message: string
}

export interface ResponseFormValidation {
  isValid: boolean
  errors: Record<string, string>
}

// ==================== CONSTANTS TYPES ====================

export interface SupportConstants {
  TICKET_TYPES: TicketType[]
  PRIORITIES: Priority[]
  TICKET_STATUSES: TicketStatus[]
  MAX_ATTACHMENT_SIZE: number
  ALLOWED_ATTACHMENT_TYPES: string[]
  MAX_ATTACHMENTS_PER_TICKET: number
  MAX_SUBJECT_LENGTH: number
  MAX_DESCRIPTION_LENGTH: number
  MAX_RESPONSE_LENGTH: number
}

// ==================== APOLLO CLIENT TYPES ====================

export interface SupportQueryOptions {
  pollInterval?: number
  errorPolicy?: "none" | "ignore" | "all"
  notifyOnNetworkStatusChange?: boolean
}

export interface SupportMutationOptions {
  refetchQueries?: string[]
  awaitRefetchQueries?: boolean
  optimisticResponse?: any
  update?: (cache: any, result: any) => void
}

// ==================== SEARCH AND FILTER TYPES ====================

export interface TicketSearchParams {
  query?: string
  status?: TicketStatus[]
  priority?: Priority[]
  ticketType?: TicketType[]
  createdBy?: string
  assignedTo?: string
  dateFrom?: string
  dateTo?: string
  sortBy?: "createdAt" | "updatedAt" | "priority" | "status"
  sortOrder?: "ASC" | "DESC"
  page?: number
  limit?: number
}

export interface TicketSearchResult {
  tickets: SupportTicket[]
  total: number
  page: number
  hasMore: boolean
}

