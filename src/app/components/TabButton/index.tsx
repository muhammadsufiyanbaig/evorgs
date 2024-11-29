import { ButtonHTMLAttributes } from 'react'
import { cn } from "@/lib/utils"

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export function TabButton({ active, className, ...props }: TabButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
        active
          ? "bg-orange-500 text-white"
          : "bg-white text-gray-700 hover:bg-orange-100",
        "dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-orange-900/30",
        active && "dark:bg-orange-500 dark:text-white",
        "first:rounded-l-lg last:rounded-r-lg",
        className
      )}
      {...props}
    />
  )
}

