import { useContext, useState, useEffect } from "react";
import EventContext from "../context/EventContext";
import { formatDate, getRemainingDays, isPast } from "../utils/dateUtils";

const EventModal = () => {
  const { showEventModal, closeEventModal, selectedEvent, eventCategories } =
    useContext(EventContext);

  if (!showEventModal || !selectedEvent) return null;

  const category = eventCategories.find(
    (cat) => cat.id === selectedEvent.category
  );
  const categoryColor = category
    ? category.color
    : "bg-gray-200 border-gray-400";

  const remainingDays = getRemainingDays(selectedEvent.date);
  const isExpired = isPast(selectedEvent.date);

  let statusText = "";
  let statusClass = "";

  if (isExpired) {
    statusText = "Expired";
    statusClass = "text-red-600 dark:text-red-400";
  } else if (remainingDays === 0) {
    statusText = "Due Today";
    statusClass = "text-orange-600 dark:text-orange-400";
  } else if (remainingDays === 1) {
    statusText = "Due Tomorrow";
    statusClass = "text-yellow-600 dark:text-yellow-400";
  } else {
    statusText = `${remainingDays} days remaining`;
    statusClass = "text-red-600 dark:text-red-400";
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
        <>
          {/* Modal Header */}
          <div
            className={`rounded-lg p-4 border-t-7 ${categoryColor} bg-transparent!`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedEvent.title}
                </h2>
                <div className="flex items-center mt-2">
                  <span
                    className={`px-2 py-0.5 text-sm rounded-full flex items-center ${categoryColor}`}
                  >
                    {category?.name || "Other"}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className={`text-sm font-medium ${statusClass}`}>
                    {statusText}
                  </span>
                </div>
              </div>
              <button
                onClick={closeEventModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-4">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2"
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
                <span className="text-gray-700 dark:text-gray-300">
                  {formatDate(selectedEvent.date)}
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 mt-4">
                <p className="text-gray-800 dark:text-gray-200">
                  {selectedEvent.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default EventModal;
