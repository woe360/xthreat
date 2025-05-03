"use client"

import React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for lessons - in a real app, this would come from your database
const mockLessonData = {
  "2025-03-01": { title: "Introduction to React", duration: 2, module: "Frontend Basics" },
  "2025-03-03": { title: "Component Lifecycle", duration: 3, module: "Frontend Basics" },
  "2025-03-05": { title: "State Management", duration: 4, module: "Frontend Basics" },
  "2025-03-10": { title: "Hooks in Depth", duration: 3, module: "Frontend Advanced" },
  "2025-03-15": { title: "API Integration", duration: 5, module: "Backend Integration" },
  "2025-03-20": { title: "Authentication", duration: 4, module: "Backend Integration" },
  "2025-03-25": { title: "Testing React Apps", duration: 3, module: "Quality Assurance" },
  "2025-04-02": { title: "Performance Optimization", duration: 4, module: "Frontend Advanced" },
  "2025-04-05": { title: "Server-Side Rendering", duration: 5, module: "Frontend Advanced" },
  "2025-04-10": { title: "GraphQL Basics", duration: 3, module: "Backend Integration" },
  "2025-04-15": { title: "Advanced State Management", duration: 4, module: "Frontend Advanced" },
  "2025-04-20": { title: "Microservices Architecture", duration: 6, module: "System Design" },
  "2025-04-25": { title: "Containerization", duration: 5, module: "DevOps" },
  "2025-05-01": { title: "CI/CD Pipelines", duration: 4, module: "DevOps" },
  "2025-05-05": { title: "Cloud Deployment", duration: 5, module: "DevOps" },
  "2025-05-10": { title: "Monitoring and Logging", duration: 3, module: "DevOps" },
  "2025-05-15": { title: "Security Best Practices", duration: 4, module: "Security" },
  "2025-05-20": { title: "Performance Testing", duration: 3, module: "Quality Assurance" },
  "2025-05-25": { title: "Accessibility", duration: 2, module: "Frontend Advanced" },
}

// Function to fetch lesson data - in a real app, this would be an API call
const fetchLessonData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockLessonData
}

// Helper function to get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

// Helper function to format date as YYYY-MM-DD
const formatDateString = (year: number, month: number, day: number) => {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

// Helper function to get day of week (0 = Monday, 4 = Friday, -1 = Weekend)
const getDayOfWeek = (year: number, month: number, day: number): number => {
  const date = new Date(year, month, day);
  const dayNum = date.getDay(); // 0 (Sun) to 6 (Sat)
  if (dayNum === 0 || dayNum === 6) {
    return -1; // Weekend
  }
  return dayNum - 1; // 0 (Mon) to 4 (Fri)
}

export default function TimeTrackingDashboard() {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date()
    // Start from 3 months ago
    date.setMonth(date.getMonth() - 2)
    // Set to first day of month
    date.setDate(1)
    return date
  })

  const [tooltipInfo, setTooltipInfo] = useState<{
    show: boolean
    date: string
    x: number
    y: number
    lesson?: {
      title: string
      duration: number
      module: string
    }
  }>({
    show: false,
    date: "",
    x: 0,
    y: 0,
  })

  const [lessonData, setLessonData] = useState<Record<string, any>>({})

  // Calculate total stats
  const totalHours = Object.values(lessonData).reduce((sum, lesson: any) => sum + lesson.duration, 0)
  const lessonsCompleted = Object.keys(lessonData).length
  const modulesCompleted = new Set(Object.values(lessonData).map((lesson: any) => lesson.module)).size

  useEffect(() => {
    const loadLessonData = async () => {
      const data = await fetchLessonData()
      setLessonData(data)
    }

    loadLessonData()
  }, [])

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const handlePrevMonth = () => {
    setStartDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const handleNextMonth = () => {
    setStartDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleString("default", { month: "short" })
  }

  const handleDotHover = (event: React.MouseEvent, date: string, hasLesson: boolean) => {
    if (!hasLesson) return

    const rect = event.currentTarget.getBoundingClientRect()
    const lesson = lessonData[date]

    // Format date for display (e.g., "Dec 14")
    const dateObj = new Date(date + 'T00:00:00'); // Ensure correct date parsing
    const formattedDate = `${dateObj.toLocaleString("default", { month: "short" })} ${dateObj.getDate()}`;

    setTooltipInfo({
      show: true,
      date: formattedDate,
      // Position slightly above the center of the dot
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 8, // Adjust offset as needed
      lesson,
    });
  }

  const handleDotLeave = () => {
    setTooltipInfo((prev) => ({ ...prev, show: false }))
  }

  // Generate 5 months of data starting from startDate
  const generateMonthsData = () => {
    const months = []

    for (let i = 0; i < 5; i++) {
      const currentDate = new Date(startDate)
      currentDate.setMonth(startDate.getMonth() + i)

      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()
      const daysInMonth = getDaysInMonth(year, month)

      months.push({
        name: formatMonth(currentDate),
        year,
        month,
        days: daysInMonth,
      })
    }

    return months
  }

  const monthsData = generateMonthsData()

  return (
    <div className="text-white mt-5 px-6">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            <div className="flex items-center gap-2   rounded-full px-3 py-1.5">
              <span className="text-gray-400 text-base">Lessons completed</span>
              <span className="text-base font-light text-white">{lessonsCompleted}</span>
            </div>
            <div className="flex items-center gap-2  rounded-full px-3 py-1.5">
              <span className="text-gray-400 text-base">Modules completed</span>
              <span className="text-base font-light text-white">{modulesCompleted}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handlePrevMonth} className="p-2 text-gray-400 rounded-full hover:bg-gray-800">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-gray-400 text-base">
              {monthsData[0].name} {monthsData[0].year} - {monthsData[4].name} {monthsData[4].year}
            </span>
            <button onClick={handleNextMonth} className="p-2 text-gray-400 rounded-full hover:bg-gray-800">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Use Flexbox for Labels + Grid separation */}
        <div className="flex gap-4">
          {/* Removed padding-top for potentially better alignment */}
          <div className="flex flex-col"> 
            {/* Spacer div to align with month labels row */}
            <div className="h-6 mb-1"></div> {/* Matches height and margin of month labels container */}
            {weekdays.map((day, rowIndex) => (
              /* Increased height */
              <div key={day} className="h-6 mb-7 pr-5 flex items-center text-gray-400 text-xs">
                {day}
              </div>
            ))}
          </div>

          <div className="relative overflow-x-auto flex-grow">
              {/* Increased height and margin */}
              <div className="flex h-6 items-center mb-1 relative"> 
                {monthsData.map((month, monthIndex) => {
                  let startCol = 0;
                  let colsForCurrentMonth = 0;
                  
                  // Function to count weekdays in a month
                  const countWeekdaysInMonth = (year: number, month: number): number => {
                      let count = 0;
                      const days = getDaysInMonth(year, month);
                      for (let d = 1; d <= days; d++) {
                          if (getDayOfWeek(year, month, d) !== -1) {
                              count++;
                          }
                      }
                      return count;
                  };
                  
                  // Calculate starting column based on previous months' actual weekdays
                   let weekDayIndex = 0; // Keep track of the column index across months
                  for (let i = 0; i < monthIndex; i++) {
                      const daysInPrevMonth = getDaysInMonth(monthsData[i].year, monthsData[i].month);
                      let firstWeekdayCol = -1;
                      for(let d = 1; d <= daysInPrevMonth; d++) {
                          const dow = getDayOfWeek(monthsData[i].year, monthsData[i].month, d);
                          if (dow !== -1) {
                              if(firstWeekdayCol === -1) firstWeekdayCol = Math.floor(weekDayIndex / 5);
                              weekDayIndex++;
                          }
                      }
                      const colsForMonth = Math.ceil(weekDayIndex / 5) - (firstWeekdayCol !==-1 ? firstWeekdayCol : 0) ;
                      startCol += colsForMonth + 1; // Add 1 for spacer
                  }
                  
                  // Calculate columns for the current month similarly
                  const daysInCurrentMonth = getDaysInMonth(month.year, month.month);
                   let currentMonthWeekDayCount = 0;
                   for(let d = 1; d <= daysInCurrentMonth; d++) {
                        if (getDayOfWeek(month.year, month.month, d) !== -1) {
                            currentMonthWeekDayCount++;
                        }
                   }
                  // This calculation is still complex. Let's approximate based on weekday count.
                  // colsForCurrentMonth = Math.ceil(currentMonthWeekDayCount / 5); // Approximate columns needed
                  // A more robust way involves tracking exact column placement in the loop below.
                  // Let's stick to previous column count logic for now, it might be visually okay.
                  const firstDayOfMonth = new Date(month.year, month.month, 1).getDay(); // 0=Sun, 6=Sat
                  const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); // 0=Mon, 6=Sun
                  colsForCurrentMonth = Math.ceil((getDaysInMonth(month.year, month.month) + (adjustedFirstDay > 4 ? 0 : adjustedFirstDay)) / 5); // Rough estimate based on start day

                  const columnWidth = 14; // Matches auto-cols
                  const gapWidth = 25;     // Matches gap-2
                  const leftPosition = startCol * (columnWidth + gapWidth);
                  const width = colsForCurrentMonth * (columnWidth + gapWidth) - gapWidth;
                  // --- End Recalculation --- 

                  return (
                    <div
                      key={`${month.name}-${monthIndex}`}
                      className="absolute text-gray-400 text-xs top-0"
                      style={{
                        left: `${leftPosition}px`,
                        width: `${Math.max(width, columnWidth)}px`, // Ensure min width
                        textAlign: 'center'
                      }}
                    >
                      {month.name}
                    </div>
                  );
                })}
              </div>

              {/* Grid: Changed gap-3 */}
              <div className="grid grid-rows-5 grid-flow-col auto-cols-[14px] gap-7">
                {(() => {
                    const gridElements: React.ReactNode[] = [];
                    let currentColumnIndex = 0;
                    let lastMonthColEnd = -1; // Track end column of previous month

                    monthsData.forEach((month) => {
                        const { year, month: monthNum, days: daysInMonth } = month;
                        let firstDayColOfMonth = -1; // Track the first column used by this month
                        
                        for (let day = 1; day <= daysInMonth; day++) {
                            const dayOfWeek = getDayOfWeek(year, monthNum, day); // Now returns 0-4 or -1

                            // Filter out weekends
                            if (dayOfWeek === -1) continue;

                            const dateStr = formatDateString(year, monthNum, day);
                            const hasLesson = lessonData[dateStr] !== undefined;
                            
                            // Calculate column index based on actual weekdays rendered
                            const dayIndexInMonth = day - 1;
                            let weekdaysPassed = 0;
                            for(let d=1; d<=dayIndexInMonth; d++) {
                                if(getDayOfWeek(year, monthNum, d) !== -1) {
                                    weekdaysPassed++;
                                }
                            }
                            const firstDayOfWeekOfMonth = getDayOfWeek(year, monthNum, 1);
                             const startDayOffset = firstDayOfWeekOfMonth === -1 ? 0 : firstDayOfWeekOfMonth; // Monday = 0
                             
                            const col = Math.floor((weekdaysPassed) / 5); // Column within the month based on weekdays
                            
                            // Need to adjust column based on previous month ending column
                            const effectiveColumnIndex = currentColumnIndex + col; 
                            if (firstDayColOfMonth === -1) {
                                firstDayColOfMonth = effectiveColumnIndex;
                            }

                            let dotClass = "w-3.5 h-3.5 rounded-full";
                            if (hasLesson) {
                                dotClass += " bg-white";
                            } else {
                                dotClass += (dayOfWeek + effectiveColumnIndex) % 2 === 0 ? " bg-gray-600" : " bg-gray-800";
                            }
                            
                            gridElements.push(
                                <div
                                    key={dateStr}
                                    className={`flex items-center justify-center h-6`}
                                    // Use dayOfWeek (0-4) + 1 for gridRow (1-5)
                                    style={{ gridRow: dayOfWeek + 1, gridColumn: effectiveColumnIndex + 1 }}
                                    onMouseEnter={(e) => handleDotHover(e, dateStr, hasLesson)}
                                    onMouseLeave={handleDotLeave}
                                >
                                    <div className={`${dotClass} cursor-pointer`}></div>
                                </div>
                            );
                        }
                        // Calculate columns used by this month based on rendered weekdays
                         let weekdaysInThisMonth = 0;
                         for(let d=1; d<=daysInMonth; d++) {
                            if(getDayOfWeek(year, monthNum, d) !== -1) weekdaysInThisMonth++;
                         }
                         const firstWeekdayOfMonth = getDayOfWeek(year, monthNum, 1);
                         const startOffset = firstWeekdayOfMonth === -1 ? 0 : firstWeekdayOfMonth; // 0 for Mon
                         const colsUsedByMonth = Math.ceil((weekdaysInThisMonth + startOffset) / 5);
                        currentColumnIndex += colsUsedByMonth + 1; // Advance for next month + spacer
                    });
                    return gridElements;
                })()}
              </div>
          </div>
        </div>

        {/* Tooltip/Popup */}
        {tooltipInfo.show && (
          <div
            className="absolute bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg z-10 w-auto min-w-[150px] pointer-events-none"
            style={{
              // Position centered above the dot, transform needed to center it horizontally
              top: `${tooltipInfo.y}px`,
              left: `${tooltipInfo.x}px`,
              transform: 'translate(-50%, -100%)', // Move up by its own height and left by half its width
            }}
          >
            <div className="text-xs text-gray-400 mb-1 text-center">{tooltipInfo.date}</div>

            {tooltipInfo.lesson ? (
              <>
                {/* <div className="text-sm font-medium mb-2">Lessons</div> */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {/* Optional: Icon or indicator */}
                      {/* <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-xs">L</div> */}
                      <div>
                        <div className="text-sm whitespace-nowrap">{tooltipInfo.lesson.title}</div>
                        <div className="text-xs text-gray-500 whitespace-nowrap">{tooltipInfo.lesson.module}</div>
                      </div>
                    </div>
                    <div className="text-sm whitespace-nowrap">{tooltipInfo.lesson.duration}h</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-sm text-center">No lessons</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

