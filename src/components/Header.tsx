import React from "react";
import config from "../config/invitation.json";

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="header-section animate-fade-in">
      <div className="ornament">
        <svg viewBox="0 0 100 50">
          <path
            d="M50 25 C30 10, 10 25, 10 25 C10 25, 30 40, 50 25 C70 40, 90 25, 90 25 C90 25, 70 10, 50 25"
            fill="none"
            stroke="#c9a227"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="header-title">Wedding Invitation</div>

      <div className="main-names">
        <span>{config.couple.brideName}</span>
        <span className="amp">&</span>
        <span>{config.couple.groomName}</span>
      </div>

      <div className="main-date">{config.event.eventDate}</div>
    </div>
  );
};

export default Header;
