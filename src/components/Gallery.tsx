import React, { useRef, useEffect, useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  layout?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  cols?: 1 | 2 | 3;
}

const Gallery: React.FC<GalleryProps> = ({ images, cols = 2 }) => {
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

  const gridClass = `gallery-grid-${cols}`;

  return (
    <div
      ref={ref}
      className={`gallery-section ${isVisible ? "animate-fade-in" : ""}`}
    >
      <div className={`gallery-grid ${gridClass}`}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt}
            className="gallery-image"
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
