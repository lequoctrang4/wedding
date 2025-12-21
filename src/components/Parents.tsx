import React from "react";
import config from "../config/invitation.json";

const Parents: React.FC = () => {
  return (
    <div className="parents-container animate-slide-up">
      <div className="parent-side">
        <div className="parent-label">Nhà Trai</div>
        <div className="parent-names">
          <strong>{config.couple.groomFather}</strong>
          <strong>{config.couple.groomMother}</strong>
        </div>
      </div>

      <div className="parent-side">
        <div className="parent-label">Nhà Gái</div>
        <div className="parent-names">
          <strong>{config.couple.brideFather}</strong>
          <strong>{config.couple.brideMother}</strong>
        </div>
      </div>
    </div>
  );
};

export default Parents;
