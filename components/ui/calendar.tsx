"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface CalendarProps {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | undefined
  onSelect?: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  disabled,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    selected instanceof Date ? selected : undefined
  )

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
  }

  const handleDateSelect = (day: number) => {
    if (disabled) return
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
    onSelect?.(newDate)
  }

  const renderCalendarDays = () => {
    const days = []
    let dayCount = 1

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-9" />)
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate?.getDate() === i &&
        selectedDate?.getMonth() === currentDate.getMonth() &&
        selectedDate?.getFullYear() === currentDate.getFullYear()

      days.push(
        <Button
          key={i}
          variant="ghost"
          className={cn(
            "h-9 w-9 p-0 font-normal",
            isSelected && "bg-primary text-primary-foreground",
            !isSelected && "hover:bg-accent hover:text-accent-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled}
          onClick={() => handleDateSelect(i)}
        >
          {i}
        </Button>
      )
      dayCount++
    }

    return days
  }

  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center justify-between space-x-2 pt-2">
        <h2 className="font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="space-x-1">
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={handlePreviousMonth}
            disabled={disabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={handleNextMonth}
            disabled={disabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  )
}
