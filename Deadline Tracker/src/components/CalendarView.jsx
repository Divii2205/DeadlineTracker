import { useState, useContext } from "react";
import EventContext from "../context/EventContext";
import { getCalendarDays, getEventsForDate } from "../utils/dateUtils";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarView = ({ filteredEvents }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const days = getCalendarDays(currentYear, currentMonth);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={goToToday}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
          >
            Today
          </button>
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className="p-2 bg-gray-100 dark:bg-gray-800 text-center text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(filteredEvents, day.date).sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          return (
            <div
              key={index}
              className={`min-h-[100px] p-1 ${
                day.isCurrentMonth
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-400"
              } ${
                day.isToday ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
              }`}
            >
              <div className="flex justify-between items-center p-1">
                <span
                  className={`text-sm w-7 h-7 flex items-center justify-center rounded-full ${
                    day.isToday
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {day.date.getDate()}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-xs px-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {dayEvents.length}
                  </span>
                )}
              </div>
              <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs px-2 py-1 truncate cursor-pointer rounded
                               ${
                                 event.category === "project"
                                   ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                   : event.category === "assignment"
                                   ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                   : event.category === "event"
                                   ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                                   : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                               }`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
