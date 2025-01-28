import { links } from "./data";

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
  
  