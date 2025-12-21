import React, { useRef, useEffect, useState } from "react";

interface QuoteProps {
  text: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ text, author }) => {
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
    <div ref={ref} className={`${isVisible ? "animate-slide-up" : ""}`}>
      <div
        className="quote-text"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease" }}
      >
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <div className="quote-author">{author}</div>
    </div>
  );
};

export default Quote;
