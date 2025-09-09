import { gql } from '@apollo/client';

// ============== UNIFIED USER AUTHENTICATION QUERIES & MUTATIONS ==============

// ======== FRAGMENTS ========
export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
    phone
    address
    fcmToken
    profileImage
    dateOfBirth
    gender
    createdAt
    isVerified
  }
`;

export const VENDOR_FRAGMENT = gql`
  fragment VendorFragment on Vendor {
    id
    vendorName
    vendorEmail
    vendorPhone
    fcmToken
    vendorAddress
    vendorProfileDescription
    vendorWebsite
    vendorSocialLinks
    profileImage
    bannerImage
    vendorType
    vendorStatus
    vendorTypeId
    rating
    reviewCount
    createdAt
    updatedAt
  }
`;

export const ADMIN_FRAGMENT = gql`
  fragment AdminFragment on Admin {
    id
    firstName
    lastName
    email
    phone
    profileImage
    createdAt
    updatedAt
  }
`;

export const AUTH_PAYLOAD_FRAGMENT = gql`
  fragment AuthPayloadFragment on AuthPayload {
    token
    user {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const VENDOR_AUTH_PAYLOAD_FRAGMENT = gql`
  fragment VendorAuthPayloadFragment on VendorAuthPayload {
    token
    vendor {
      ...VendorFragment
    }
  }
  ${VENDOR_FRAGMENT}
`;

export const ADMIN_AUTH_RESPONSE_FRAGMENT = gql`
  fragment AdminAuthResponseFragment on AdminAuthResponse {
    success
    message
    token
    admin {
      ...AdminFragment
    }
  }
  ${ADMIN_FRAGMENT}
`;

// ======== USER QUERIES ========
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_VENDOR_PROFILE = gql`
  query GetVendorProfile {
    vendorProfile {
      ...VendorFragment
    }
  }
  ${VENDOR_FRAGMENT}
`;

export const ADMIN_ME = gql`
  query AdminMe {
    adminMe {
      ...AdminFragment
    }
  }
  ${ADMIN_FRAGMENT}
`;

// ======== REGISTRATION MUTATIONS ========
export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input)
  }
`;

export const VENDOR_REGISTER = gql`
  mutation VendorRegister($input: VendorRegisterInput!) {
    vendorRegister(input: $input)
  }
`;

export const ADMIN_SIGNUP = gql`
  mutation AdminSignup($input: AdminSignupInput!) {
    adminSignup(input: $input) {
      ...AdminAuthResponseFragment
    }
  }
  ${ADMIN_AUTH_RESPONSE_FRAGMENT}
`;

// ======== LOGIN MUTATIONS ========
export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      ...AuthPayloadFragment
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`;

export const VENDOR_LOGIN = gql`
  mutation VendorLogin($input: VendorLoginInput!) {
    vendorLogin(input: $input) {
      ...VendorAuthPayloadFragment
    }
  }
  ${VENDOR_AUTH_PAYLOAD_FRAGMENT}
`;

export const ADMIN_LOGIN = gql`
  mutation AdminLogin($input: AdminLoginInput!) {
    adminLogin(input: $input) {
      ...AdminAuthResponseFragment
    }
  }
  ${ADMIN_AUTH_RESPONSE_FRAGMENT}
`;

// ======== OTP VERIFICATION MUTATIONS ========
export const VERIFY_USER_REGISTRATION = gql`
  mutation VerifyUserRegistration($input: VerifyOtpInput!) {
    verifyRegistration(input: $input) {
      ...AuthPayloadFragment
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`;

export const VERIFY_VENDOR_REGISTRATION = gql`
  mutation VerifyVendorRegistration($input: VendorVerifyOtpInput!) {
    vendorVerifyRegistration(input: $input) {
      ...VendorAuthPayloadFragment
    }
  }
  ${VENDOR_AUTH_PAYLOAD_FRAGMENT}
`;

export const ADMIN_VERIFY_OTP = gql`
  mutation AdminVerifyOtp($input: AdminVerifyOtpInput!) {
    adminVerifyOtp(input: $input) {
      success
      message
      email
    }
  }
`;

// ======== PASSWORD RESET MUTATIONS ========
export const RESET_USER_PASSWORD = gql`
  mutation ResetUserPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

export const RESET_VENDOR_PASSWORD = gql`
  mutation ResetVendorPassword($input: VendorResetPasswordInput!) {
    vendorResetPassword(input: $input)
  }
`;

export const ADMIN_RESET_PASSWORD = gql`
  mutation AdminResetPassword($input: AdminResetPasswordInput!) {
    adminResetPassword(input: $input) {
      ...AdminAuthResponseFragment
    }
  }
  ${ADMIN_AUTH_RESPONSE_FRAGMENT}
`;

// ======== USER PROFILE MANAGEMENT MUTATIONS ========
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const CHANGE_USER_PASSWORD = gql`
  mutation ChangeUserPassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
  }
`;

// OTP Management
export const REQUEST_LOGIN_OTP = gql`
  mutation RequestLoginOtp($email: String!, $userType: UserType!) {
    requestLoginOtp(email: $email, userType: $userType)
  }
`;

export const VERIFY_LOGIN_OTP = gql`
  mutation VerifyLoginOtp($input: VerifyOtpInput!) {
    verifyLoginOtp(input: $input) {
      ...AuthPayloadFragment
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`;

export const RESEND_USER_OTP = gql`
  mutation ResendUserOtp($input: ResendOtpInput!) {
    resendOtp(input: $input)
  }
`;

// Password Reset Flow
export const SET_NEW_USER_PASSWORD = gql`
  mutation SetNewUserPassword($input: SetNewPasswordInput!) {
    setNewPassword(input: $input)
  }
`;

// Account Management
export const DELETE_USER_ACCOUNT = gql`
  mutation DeleteUserAccount {
    deleteAccount
  }
`;

// ======== TYPESCRIPT TYPES ========
export type UserType = 'User' | 'Vendor' | 'Admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  fcmToken?: string[];
  profileImage?: string;
  dateOfBirth?: string;
  gender: 'Male' | 'Female' | 'Others';
  createdAt: string;
  isVerified: boolean;
}

export interface Vendor {
  id: string;
  vendorName: string;
  vendorEmail: string;
  vendorPhone?: string;
  fcmToken?: string[];
  vendorAddress?: string;
  vendorProfileDescription?: string;
  vendorWebsite?: string;
  vendorSocialLinks?: string[];
  profileImage?: string;
  bannerImage?: string;
  vendorType: 'FarmHouse' | 'Venue' | 'Catering' | 'Photography';
  vendorStatus: 'Pending' | 'Approved' | 'Rejected';
  vendorTypeId?: string;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface VendorAuthPayload {
  token: string;
  vendor: Vendor;
}

export interface AdminAuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  admin?: Admin;
}

// ======== INPUT TYPES ========
export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  dateOfBirth?: string;
  gender: 'Male' | 'Female' | 'Others';
}

export interface VendorRegisterInput {
  vendorName: string;
  vendorEmail: string;
  password: string;
  vendorPhone?: string;
  vendorAddress?: string;
  vendorProfileDescription?: string;
  vendorWebsite?: string;
  vendorSocialLinks?: string[];
  profileImage?: string;
  bannerImage?: string;
  vendorType: 'FarmHouse' | 'Venue' | 'Catering' | 'Photography';
  vendorTypeId?: string;
}

export interface AdminSignupInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  profileImage?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface VendorLoginInput {
  vendorEmail: string;
  password: string;
}

export interface AdminLoginInput {
  email: string;
  password: string;
}

export interface VerifyOtpInput {
  email: string;
  otp: string;
  purpose: 'registration' | 'password_reset';
  userType: UserType;
}

export interface VendorVerifyOtpInput {
  vendorEmail: string;
  otp: string;
  purpose: 'registration' | 'password_reset';
  userType: UserType;
}

export interface AdminVerifyOtpInput {
  email: string;
  otp: string;
  purpose?: 'registration' | 'login' | 'password_reset';
}

export interface ResetPasswordInput {
  email: string;
  userType: UserType;
}

export interface VendorResetPasswordInput {
  vendorEmail: string;
  userType: UserType;
}

export interface AdminResetPasswordInput {
  email: string;
  otp: string;
  newPassword: string;
}

// ======== USER PROFILE MANAGEMENT INPUT TYPES ========
export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Others';
  fcmToken?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface ResendOtpInput {
  email: string;
  purpose: 'registration' | 'password_reset';
  userType: 'User' | 'Vendor' | 'Admin';
}

export interface SetNewPasswordInput {
  email: string;
  otp: string;
  newPassword: string;
  userType: 'User' | 'Vendor' | 'Admin';
}
