import React from "react";
import { motion } from "framer-motion";

interface CalendarProps {
  year: number;
  month: number;
  highlightDate: number;
  title?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  highlightDate,
  title = "SAVE THE DATE",
}) => {
  // Get month name in Vietnamese
  const getMonthName = (month: number): string => {
    const months = [
      "THÁNG 1",
      "THÁNG 2",
      "THÁNG 3",
      "THÁNG 4",
      "THÁNG 5",
      "THÁNG 6",
      "THÁNG 7",
      "THÁNG 8",
      "THÁNG 9",
      "THÁNG 10",
      "THÁNG 11",
      "THÁNG 12",
    ];
    return months[month - 1];
  };

  // Get days in month
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  // Get first day of month (0 = Monday, 1 = Tuesday, etc. for Vietnamese format)
  const getFirstDayOfMonth = (year: number, month: number): number => {
    const jsDay = new Date(year, month - 1, 1).getDay();
    // Convert JS day (0=Sunday) to Vietnamese format (0=Monday)
    return jsDay === 0 ? 6 : jsDay - 1;
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Create array of days
  const days: (number | null)[] = [];

  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05,
      },
    },
  };

  const dayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="calendar-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Calendar Header */}
      <motion.div className="calendar-header" variants={dayVariants}>
        <h3 className="calendar-title">{title}</h3>
        <h4 className="calendar-month">
          {getMonthName(month)} - {year}
        </h4>
      </motion.div>

      {/* Days of week header */}
      <motion.div className="calendar-weekdays" variants={dayVariants}>
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </motion.div>

      {/* Calendar Grid */}
      <motion.div className="calendar-grid" variants={containerVariants}>
        {days.map((day, index) => (
          <motion.div
            key={index}
            className={`calendar-day ${
              day === highlightDate ? "highlighted" : ""
            } ${day === null ? "empty" : ""}`}
            variants={dayVariants}
            whileHover={day ? { scale: 1.1 } : {}}
            whileTap={day ? { scale: 0.95 } : {}}
          >
            {day && (
              <>
                <span className="day-number">{day}</span>
                {day === highlightDate && (
                  <motion.div
                    className="heart-decoration"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    ❤️
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Calendar;
