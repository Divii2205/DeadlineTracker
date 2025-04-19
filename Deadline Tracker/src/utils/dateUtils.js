// Format a date to display as "Day, Month Date, Year"
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format a date to display as "Month Date Year"
export const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Check if a date is today
export const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Check if a date is in the past
export const isPast = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  // Set time to beginning of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
};

// Check if a date is in the future
export const isFuture = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  // Set time to beginning of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date > today;
};

// Check if a date is in the current week
export const isThisWeek = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  // Get the first day of the current week (Sunday)
  const firstDayOfWeek = new Date(today);
  const dayOfWeek = today.getDay(); // 0 for Sunday, 6 for Saturday
  firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  // Get the last day of the current week (Saturday)
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  lastDayOfWeek.setHours(23, 59, 59, 999);

  // Check if the date is within the current week
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
};

// Generate calendar days for a month
export const getCalendarDays = (year, month) => {
  // Month in JavaScript is 0-indexed (0 = January, 11 = December)
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDay.getDay();

  // Calculate the number of days from the previous month to include
  const daysFromPrevMonth = firstDayOfWeek;

  // Calculate the date of the first day to display (may be from previous month)
  const startDate = new Date(firstDay);
  startDate.setDate(1 - daysFromPrevMonth);

  // Generate 42 days (6 weeks) for the calendar display
  const days = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push({
      date: new Date(currentDate),
      isCurrentMonth: currentDate.getMonth() === month,
      isToday: isToday(currentDate),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

// Get events for a specific date
export const getEventsForDate = (events, date) => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === targetDate.getTime();
  });
};

// Get remaining days from today to deadline
export const getRemainingDays = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  // Set time to beginning of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  // Calculate the difference in days
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
