import React from "react";
import config from "../config/invitation.json";

const Greeting: React.FC = () => {
  return (
    <>
      <p className="greeting-text animate-slide-up">
        <span dangerouslySetInnerHTML={{ __html: config.greeting.text }} />
      </p>
      <div className="divider" />
    </>
  );
};

export default Greeting;
