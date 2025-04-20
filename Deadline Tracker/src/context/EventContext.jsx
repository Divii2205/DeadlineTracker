import { createContext, useState, useEffect } from "react";

const eventCategories = [
  {
    id: "project",
    name: "Project",
    color: "bg-blue-200 dark:bg-blue-900 border-blue-500",
  },
  {
    id: "assignment",
    name: "Assignment",
    color: "bg-green-200 dark:bg-green-900 border-green-500",
  },
  {
    id: "event",
    name: "Event",
    color: "bg-purple-200 dark:bg-purple-900 border-purple-500",
  },
  {
    id: "task",
    name: "Task",
    color: "bg-yellow-200 dark:bg-yellow-900 border-yellow-500",
  },
];

const sampleEvents = [
  {
    id: "1",
    title: "Submit React Project",
    description: "Final submission for React course project",
    category: "project",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "DSA Interview",
    description: "Third & Final Attempt of the Mock Interview",
    category: "assignment",
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Speaker Session",
    description: "Super Mentor Session",
    category: "event",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Lunch Fees",
    description: "Lunch Fees for the month of May 2025",
    category: "task",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Speaker Session2",
    description: "Super Mentor Session",
    category: "event",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

const EventContext = createContext();
const ADMIN_PASSWORD = "SSTadmin123";

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(sampleEvents);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Get events from local storage
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      setEvents(sampleEvents);
    }

    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const deleteEvent = (id) => {
    if (!isAdmin) return false;
    setEvents(events.filter((event) => event.id !== id));
    return true;
  };

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        eventCategories,
        selectedEvent,
        showEventModal,
        deleteEvent,
        isAdmin,
        login,
        logout,
        openEventModal,
        closeEventModal,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
