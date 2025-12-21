import React from "react";

interface EventDetailsProps {
  title: string;
  label: string;
  time: string;
  dayOfWeek: string;
  venue: string;
  address: string;
  eventDateFormatted: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  title,
  label,
  time,
  dayOfWeek,
  venue,
  address,
  eventDateFormatted,
}) => {
  return (
    <>
      <div className="event-label animate-slide-up">{label}</div>

      <div className="event-title animate-slide-up">{title}</div>

      <div className="event-datetime animate-slide-up">
        <strong>{time}</strong> {dayOfWeek}
      </div>

      <div className="event-datetime animate-slide-up">
        {eventDateFormatted}
      </div>

      <div className="divider" />

      <div className="event-location animate-slide-up">
        <strong>{venue}</strong>
        <div>{address}</div>
      </div>
    </>
  );
};

export default EventDetails;
