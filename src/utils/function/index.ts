

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatTime = (time: string): string => {
  const [hour, minute] = time.split(":")
  const hourNum = Number.parseInt(hour)
  const ampm = hourNum >= 12 ? "PM" : "AM"
  const formattedHour = hourNum % 12 || 12
  return `${formattedHour}:${minute} ${ampm}`
}

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay()
}
