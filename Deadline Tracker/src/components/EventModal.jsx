import { useContext, useState, useEffect } from "react";
import EventContext from "../context/EventContext";
import { formatDate, getRemainingDays, isPast } from "../utils/dateUtils";

const EventModal = () => {
  const {
    showEventModal,
    closeEventModal,
    selectedEvent,
    eventCategories,
    isAdmin,
    deleteEvent,
  } = useContext(EventContext);

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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(selectedEvent.id);
      closeEventModal();
    }
  };

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
          {/* Modal Footer */}
          <div className="px-6 py-4 flex justify-between items-center">
            {isAdmin ? (
              <div className="space-x-3 flex">
                <button
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  title="Edit this item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                  title="Delete this item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default EventModal;
