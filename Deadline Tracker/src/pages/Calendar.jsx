import React from "react";
import { useState, useContext, useEffect } from "react";
import EventContext from "../context/EventContext";
import CalendarView from "../components/CalendarView";
import EventModal from "../components/EventModal";
import SearchBar from "../components/SearchBar";
import AddEventButton from "../components/AddEventButton";

function Calendar() {
  const { events, eventCategories } = useContext(EventContext);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let filtered = [...events];

    // Search Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          (event.description && event.description.toLowerCase().includes(term))
      );
    }

    // Category Filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Calendar View
      </h1>

      <SearchBar
        onSearch={(term) => setSearchTerm(term)}
        onFilterChange={(category) => setSelectedCategory(category)}
        categories={eventCategories}
      />
      <CalendarView filteredEvents={filteredEvents} />
      <EventModal />
      <AddEventButton />
    </div>
  );
}

export default Calendar;
