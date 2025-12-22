import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Envelope from "./components/Envelope";
import Header from "./components/Header";
import HeroImage from "./components/HeroImage";
import Greeting from "./components/Greeting";
import Parents from "./components/Parents";
import Countdown from "./components/Countdown";
import Gallery from "./components/Gallery";
import CoupleIntro from "./components/CoupleIntro";
import EventDetails from "./components/EventDetails";
import Quote from "./components/Quote";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import Loading from "./components/Loading";
import config from "./config/invitation.json";
import { host } from "./config/constant";
import "./styles/index.css";
import FloatingHeart from "./components/FloatingHeart";
import { preloadImages } from "./utils/preloader";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Image & Audio URLs to preload
  const imagesToPreload = [
    `${host}wedding-image/SDN09286.png`,
    `${host}wedding-image/SDN0003.png`,
    `${host}wedding-image/SDN08433.png`,
    `${host}wedding-image/SDN08466.png`,
    `${host}wedding-image/SDN09299.png`,
    `${host}wedding-image/SDN08882.png`,
    `${host}wedding-image/SDN09072.png`,
    `${host}music.mp3`, // Add music file to preload
  ];

  // Preload images on mount
  useEffect(() => {
    preloadImages(imagesToPreload, (progress) => {
      setLoadProgress(progress);
    })
      .then(() => {
        // Add a small delay for better UX (optional)
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch(() => {
        // Even if preloading fails, continue after timeout
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  const openInvitation = () => {
    setIsOpen(true);
    window.scrollTo(0, 0);
  };

  const closeInvitation = () => {
    setIsOpen(false);
    setHearts([]);
  };

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
      }, 800);

      return () => clearInterval(heartInterval);
    }
  }, [isOpen]);

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
      {/* Loading Screen */}
      <Loading isLoading={isLoading} progress={loadProgress} />

      {/* Envelope View */}
      <div
        className={`envelope-view ${isOpen ? "hidden" : ""}`}
        onClick={openInvitation}
      >
        <Envelope onOpen={openInvitation} />
      </div>
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <FloatingHeart key={heart} />
      ))}
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
          <motion.div
            className="section header-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Header onClose={closeInvitation} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <HeroImage
              src={`${host}wedding-image/SDN09286.png`}
              alt="Wedding Hero"
            />
          </motion.div>

          <motion.div
            className="section greeting-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Greeting />
          </motion.div>

          <motion.div
            className="section countdown-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Countdown />
          </motion.div>

          <motion.div
            className="section parents-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Parents />
          </motion.div>

          <motion.div
            className="section couple-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CoupleIntro
              groomName={config.couple.groomName}
              brideName={config.couple.brideName}
              photo={`${host}wedding-image/SDN0003.png`}
            />
          </motion.div>

          <motion.div
            className="section event-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <EventDetails
              title={config.events[0].title}
              label={config.events[0].label}
              time={config.events[0].time}
              dayOfWeek={config.events[0].dayOfWeek}
              venue={config.events[0].venue}
              address={config.events[0].address}
              eventDateFormatted={config.event.eventDateFormatted}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Gallery
              images={[
                { src: `${host}wedding-image/SDN08433.png`, alt: "Gallery 1" },
                { src: `${host}wedding-image/SDN08466.png`, alt: "Gallery 2" },
              ]}
              cols={2}
            />
          </motion.div>

          <motion.div
            className="section event-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <EventDetails
              title={config.events[1].title}
              label={config.events[1].label}
              time={config.events[1].time}
              dayOfWeek={config.events[1].dayOfWeek}
              venue={config.events[1].venue}
              address={config.events[1].address}
              eventDateFormatted={config.event.eventDateFormatted}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Gallery
              images={[
                { src: `${host}wedding-image/SDN09299.png`, alt: "Gallery 3" },
                { src: `${host}wedding-image/SDN08882.png`, alt: "Gallery 4" },
                { src: `${host}wedding-image/SDN09072.png`, alt: "Gallery 5" },
              ]}
              cols={3}
            />
          </motion.div>

          <motion.div
            className="dark-image-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.img
              src={`${host}wedding-image/SDN08372.png`}
              alt="Couple"
              className="dark-image-full"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.div
            className="section quote-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Quote
              text={config.greeting.quote}
              author={config.greeting.quoteAuthor}
            />
          </motion.div>

          <motion.div
            className="section footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Footer />
          </motion.div>
        </div>
      </div>
      <MusicPlayer
        ref={audioRef}
        src={host + config.music.src}
        isOpen={isOpen}
        isPlaying={isPlaying}
        onTogglePlay={togglePlayMusic}
      />
    </div>
  );
};

export default App;
