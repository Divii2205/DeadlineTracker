import { useState, useContext } from "react";
import EventContext from "../context/EventContext";
import EventForm from "./EventForm";

const AddEventButton = () => {
  const [showForm, setShowForm] = useState(false);
  const { isAdmin } = useContext(EventContext);

  if (!isAdmin) return null;

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
        aria-label="Add new event"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
            <EventForm
              onCancel={() => setShowForm(false)}
              onSave={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddEventButton;
