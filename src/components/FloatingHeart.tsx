import React, { useEffect, useState } from "react";

const FloatingHeart: React.FC = () => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const randomLeft = Math.random() * 100;
    const randomDuration = 6 + Math.random() * 4; // 6-10s
    const randomDelay = Math.random() * 0.5;

    setStyle({
      left: `${randomLeft}%`,
      bottom: "0px",
      animation: `floatUp ${randomDuration}s linear forwards`,
      animationDelay: `${randomDelay}s`,
      fontSize: `${16 + Math.random() * 16}px`, // 16-32px random size
      opacity: 0.6 + Math.random() * 0.4, // 0.6-1.0 opacity
    });
  }, []);

  return (
    <div className="fixed text-gold pointer-events-none" style={style}>
      ♥
    </div>
  );
};

export default FloatingHeart;
