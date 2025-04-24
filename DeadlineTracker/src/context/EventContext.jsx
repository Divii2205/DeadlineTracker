import { createContext, useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";

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

const sampleEvents = [];

const EventContext = createContext();
const ADMIN_PASSWORD = "SSTadmin123";

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Get events from local storage
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true });

        if (error) throw error;

        setEvents(data);
      } catch (err) {
        console.error("Supabase error:", err.message);
        const fallback = localStorage.getItem("events");
        setEvents(fallback ? JSON.parse(fallback) : sampleEvents);
        alert("⚠ Supabase connection failed. Using localStorage data.");
      } finally {
        setIsInitialized(true);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (isInitialized) localStorage.setItem("events", JSON.stringify(events));
  }, [events, isInitialized]);

  const deleteEvent = async (id) => {
    if (!isAdmin) return false;
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      setEvents((prev) => prev.filter((e) => e.id !== id));
      return true;
    } catch (err) {
      console.error("Delete Event Error:", err.message);
      return false;
    }
  };

  const addEvent = async (event) => {
    if (!isAdmin) return false;

    try {
      const { data, error } = await supabase
        .from("events")
        .insert([
          {
            title: event.title,
            description: event.description,
            category: event.category,
            date: event.date,
          },
        ])
        .select();

      if (error) throw error;
      if (!data || !Array.isArray(data))
        throw new Error("Invalid response from Supabase");

      setEvents((prev) => [...prev, ...data]);
      return true;
    } catch (err) {
      console.error("Add Event Error:", err.message);
      return false;
    }
  };

  const updateEvent = async (updatedEvent) => {
    if (!isAdmin) return false;
    try {
      const { data, error } = await supabase
        .from("events")
        .update({
          title: updatedEvent.title,
          description: updatedEvent.description,
          category: updatedEvent.category,
          date: updatedEvent.date,
        })
        .eq("id", updatedEvent.id);

      if (error) throw error;

      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
      );
      return true;
    } catch (err) {
      console.error("Update Event Error:", err.message);
      return false;
    }
  };

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

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
        addEvent,
        deleteEvent,
        updateEvent,
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
