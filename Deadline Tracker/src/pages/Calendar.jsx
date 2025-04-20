import React from "react";
import CalendarView from "../components/CalendarView";

function Calendar() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Calendar View
      </h1>

      <CalendarView />
    </div>
  );
}

export default Calendar;
