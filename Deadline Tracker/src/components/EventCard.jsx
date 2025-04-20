import React, { useContext } from "react";
import EventContext from "../context/EventContext";
import { formatShortDate, getRemainingDays, isPast } from "../utils/dateUtils";

const EventCard = ({ event }) => {
  const { openEventModal, eventCategories } = useContext(EventContext);
  console.log(eventCategories);

  const category = eventCategories.find((cat) => cat.id === event.category);
  const categoryColor = category
    ? category.color
    : "bg-gray-200 border-gray-400";

  const remainingDays = getRemainingDays(event.date);
  const isExpired = isPast(event.date);

  let statusText = "";
  let statusClass = "";

  if (isExpired) {
    statusText = "Expired";
    statusClass = "text-red-600 dark:text-red-400";
  } else if (remainingDays === 0) {
    statusText = "Today";
    statusClass = "text-orange-600 dark:text-orange-400";
  } else if (remainingDays === 1) {
    statusText = "Tomorrow";
    statusClass = "text-yellow-600 dark:text-yellow-400";
  } else {
    statusText = `${remainingDays} days left`;
    statusClass = "text-red-600 dark:text-red-400";
  }

  return (
    <div
      onClick={() => openEventModal(event)}
      className={`rounded-lg p-4 cursor-pointer transition-transform hover:scale-105 border border-l-7 ${categoryColor} bg-transparent!`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {event.title}
        </h3>

        <span
          className={`px-2 py-0.5 text-xs rounded-full flex items-center ${categoryColor}`}
        >
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </span>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {formatShortDate(event.date)}
          </span>
        </div>
        <span
          className={`text-xs font-medium ${statusClass} bg-white dark:bg-gray-800 px-2 py-1 rounded-full`}
        >
          {statusText}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
