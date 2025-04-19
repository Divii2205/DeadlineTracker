import React, { useContext } from "react";
import EventContext from "../context/EventContext";

const EventCard = ({ event }) => {
  const { eventCategories } = useContext(EventContext);
  console.log(eventCategories);

  const category = eventCategories.find((cat) => cat.id === event.category);
  const categoryColor = category
    ? category.color
    : "bg-gray-200 border-gray-400";

  return (
    <div
      className={`${categoryColor} border-l-4 rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {event.title}
        </h3>
        <span
          className={`text-xs font-medium bg-white dark:bg-gray-800 px-2 py-1 rounded-full`}
        ></span>
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
          <span className="text-sm text-gray-600 dark:text-gray-300"></span>
        </div>
        <span className="text-xs bg-gray-200 dark:bg-gray-300 text-gray-800 dark:text-gray-800 px-2 py-1 rounded-full">
          {category?.name || "Other"}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
