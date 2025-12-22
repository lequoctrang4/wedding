import React, { useState, useEffect } from "react";

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Wedding date: 29.01.2026
      const weddingDate = new Date("2026-01-29T00:00:00").getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-label">Thời gian đếm ngược</div>
      <div className="countdown-timer">
        <div className="countdown-box">
          <span className="countdown-number">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="countdown-text">Ngày</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-number">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="countdown-text">Giờ</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-number">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="countdown-text">Phút</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-number">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="countdown-text">Giây</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
