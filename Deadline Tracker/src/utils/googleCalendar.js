export function buildGoogleCalendarUrl(event) {
  if (!event?.date) return "#";
  const start = new Date(event.date);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  function gCalDateFormat(dt) {
    return dt
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d+Z$/, "Z");
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title || "Event",
    details: event.description || "",
    dates: `${gCalDateFormat(start)}/${gCalDateFormat(end)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
