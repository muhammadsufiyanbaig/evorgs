import { links } from "../data";


export interface ContactFormData {
  senderName: string;
  senderEmail: string;
  message: string;
}
export interface IconInterface {
  color?: string;              // Color for the icon (optional)
  className?: string;              // Color for the icon (optional)
  height?: string | number;    // Height of the icon (optional)
  width?: string | number;     // Width of the icon (optional)
}

export interface ProfileFormData {
  firstName: string
  lastName: string
  sex: string
  dateOfBirth: string
  profileImage: File | null
}

export type SectionName = (typeof links)[number]["name"];
export type Event = {
    id: string
    title: string
    date: Date
    startTime: string
    endTime?: string
    location?: string
    color: "blue" | "pink"
  }
  
  export type ViewType = "day" | "week" | "month" | "year"
  
  export type Client = {
    id: string
    name: string
    email: string
    mobileNumber: string | null
    reviews: number
    sales: number
    createdAt: Date
  }

  export interface TeamMember {
    id: string
    name: string
    image: string
    email?: string
    phone?: string
    reviews?: number
  }
  
  export interface Shift {
    start: string
    end: string
    memberId: string
  }
  
  export interface WeeklySchedule {
    startDate: Date
    endDate: Date
    shifts: Record<string, Shift[]>
  }
  
  export interface TeamMember {
    id: string
    name: string
    email?: string
    phone?: string
    image: string
  }
  
  export interface Shift {
    start: string
    end: string
  }
  
  export interface TeamMemberShift extends TeamMember {
    shifts: Shift[]
  }
  
    