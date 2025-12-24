import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import config from "../config/invitation.json";

const Envelope: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const [guestName, setGuestName] = useState<string>("");

  useEffect(() => {
    // Read the 'name' query parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    if (nameParam) {
      setGuestName(decodeURIComponent(nameParam));
    }
  }, []);

  return (
    <div className="envelope-view">
      <motion.div
        className="envelope-container"
        onClick={onOpen}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="envelope">
          <div className="envelope-back">
            <div className="envelope-flap" />
            <div className="envelope-inner">
              <motion.div
                className="wedding-label mt-16"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Wedding Invitation
              </motion.div>
              <motion.div
                className="guest-name-envelope"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Kính mời: {guestName || "Bạn"} ❤️
              </motion.div>
              <motion.div
                className="couple-names"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span>{config.couple.groomName}</span>
                <span className="ampersand">&</span>
                <span>{config.couple.brideName}</span>
              </motion.div>
              <motion.div
                className="wedding-date"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {config.event.eventDate}
              </motion.div>
              <motion.div
                className="open-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {config.footer.openHint}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Envelope;
