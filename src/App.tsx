import React, { useState, useEffect } from "react";
import Envelope from "./components/Envelope";
import Header from "./components/Header";
import HeroImage from "./components/HeroImage";
import Greeting from "./components/Greeting";
import Parents from "./components/Parents";
import Gallery from "./components/Gallery";
import CoupleIntro from "./components/CoupleIntro";
import EventDetails from "./components/EventDetails";
import Quote from "./components/Quote";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import config from "./config/invitation.json";
import "./styles/index.css";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Generate floating hearts at intervals
      const heartInterval = setInterval(() => {
        setHearts((prev) => {
          const newHearts = [...prev, Date.now()];
          if (newHearts.length > 15) {
            newHearts.shift();
          }
          return newHearts;
        });
      }, 800); // Increased from 300ms to 800ms

      return () => clearInterval(heartInterval);
    }
  }, [isOpen]);

  const openInvitation = () => {
    setIsOpen(true);
    window.scrollTo(0, 0);
  };

  const closeInvitation = () => {
    setIsOpen(false);
    setHearts([]);
  };

  const togglePlayMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        // Pause
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Play
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <div>
      {/* Envelope View */}
      <div
        className={`envelope-view ${isOpen ? "hidden" : ""}`}
        onClick={openInvitation}
      >
        <Envelope onOpen={openInvitation} />
      </div>
      {/* Floating Hearts */}
      {/* {hearts.map((heart) => (
        <FloatingHeart key={heart} />
      ))} */}
      {/* Invitation View */}
      <div className={`invitation-view ${isOpen ? "visible" : ""}`}>
        <button
          onClick={closeInvitation}
          className="back-button visible"
          title="Back to envelope"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="invitation-container">
          <div className="section header-section">
            <Header onClose={closeInvitation} />
          </div>

          <HeroImage src="wedding-image/SDN08005.jpg" alt="Wedding Hero" />

          <div className="section greeting-section">
            <Greeting />
          </div>

          <div className="section parents-section">
            <Parents />
          </div>

          <div className="section couple-section">
            <CoupleIntro
              groomName={config.couple.groomName}
              brideName={config.couple.brideName}
              photo="wedding-image/SDN08135.jpg"
            />
          </div>

          <div className="section event-section">
            <EventDetails
              title={config.events[0].title}
              label={config.events[0].label}
              time={config.events[0].time}
              dayOfWeek={config.events[0].dayOfWeek}
              venue={config.events[0].venue}
              address={config.events[0].address}
              eventDateFormatted={config.event.eventDateFormatted}
            />
          </div>

          <Gallery
            images={[
              { src: "wedding-image/SDN08034.jpg", alt: "Gallery 1" },
              { src: "wedding-image/SDN08120.jpg", alt: "Gallery 2" },
            ]}
            cols={2}
          />

          <div className="section event-section">
            <EventDetails
              title={config.events[1].title}
              label={config.events[1].label}
              time={config.events[1].time}
              dayOfWeek={config.events[1].dayOfWeek}
              venue={config.events[1].venue}
              address={config.events[1].address}
              eventDateFormatted={config.event.eventDateFormatted}
            />
          </div>

          <Gallery
            images={[
              { src: "wedding-image/SDN08141.jpg", alt: "Gallery 3" },
              { src: "wedding-image/SDN08203.jpg", alt: "Gallery 4" },
              { src: "wedding-image/SDN08244.jpg", alt: "Gallery 5" },
            ]}
            cols={3}
          />

          <div className="section quote-section">
            <Quote
              text={config.greeting.quote}
              author={config.greeting.quoteAuthor}
            />
          </div>

          <div className="section footer-section">
            <Footer />
          </div>
        </div>
      </div>
      <MusicPlayer
        ref={audioRef}
        src={config.music.src}
        isOpen={isOpen}
        isPlaying={isPlaying}
        onTogglePlay={togglePlayMusic}
      />
    </div>
  );
};

export default App;
