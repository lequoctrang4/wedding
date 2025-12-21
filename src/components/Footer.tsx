import React, { useRef, useEffect, useState } from "react";
import config from "../config/invitation.json";

const Footer: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`footer-section ${isVisible ? "animate-fade-in" : ""}`}
    >
      <div className="footer-names">
        {config.couple.brideName} & {config.couple.groomName}
      </div>

      <div className="footer-date">{config.event.eventDate}</div>

      <div className="footer-thanks">{config.footer.thanks}</div>
    </div>
  );
};

export default Footer;
