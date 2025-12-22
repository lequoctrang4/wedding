import React from "react";
import { motion } from "framer-motion";
import { animationVariants } from "../utils/animations";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = animationVariants.slideInRight;

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="event-label" variants={itemVariants}>
          {label}
        </motion.div>

        <motion.div className="event-title" variants={itemVariants}>
          {title}
        </motion.div>

        <motion.div className="event-datetime" variants={itemVariants}>
          <strong>{time}</strong> {dayOfWeek}
        </motion.div>

        <motion.div className="event-datetime" variants={itemVariants}>
          {eventDateFormatted}
        </motion.div>
      </motion.div>

      <motion.div
        className="divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        style={{ originX: 0.5 }}
      />

      <motion.div
        className="event-location"
        initial="hidden"
        whileInView="visible"
        variants={itemVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <strong>{venue}</strong>
        <div>{address}</div>
      </motion.div>
    </>
  );
};

export default EventDetails;
