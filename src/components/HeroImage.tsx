import React from "react";

interface HeroImageProps {
  src: string;
  alt: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="hero-image animate-fade-in" />;
};

export default HeroImage;
