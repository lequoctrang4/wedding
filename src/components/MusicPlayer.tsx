import React, { useState, useEffect, forwardRef } from "react";
import { VolumeX, Volume2 } from "lucide-react";

interface MusicPlayerProps {
  src: string;
  isOpen: boolean;
  isPlaying: boolean;
  onTogglePlay?: () => void;
}

const MusicPlayer = forwardRef<HTMLAudioElement, MusicPlayerProps>(
  ({ src, isOpen, isPlaying }, ref) => {
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = (ref as React.RefObject<HTMLAudioElement>) || React.useRef<HTMLAudioElement>(null);

    const toggleMute = () => {
      if (audioRef.current) {
        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(!isMuted);
      }
    };

    useEffect(() => {
      if (audioRef.current) {
        const handlePlay = () => {};
        const handlePause = () => {};

        audioRef.current.addEventListener("play", handlePlay);
        audioRef.current.addEventListener("pause", handlePause);

        return () => {
          audioRef.current?.removeEventListener("play", handlePlay);
          audioRef.current?.removeEventListener("pause", handlePause);
        };
      }
    }, []);

    // Auto-play music when invitation is opened
    useEffect(() => {
      if (isOpen && audioRef.current && !isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log("Autoplay prevented:", e);
        });
      } else if (!isOpen && audioRef.current && isPlaying) {
        audioRef.current.pause();
      }
    }, [isOpen, isPlaying]);

    return (
      <>
        <audio ref={audioRef} loop>
          <source src={src} type="audio/mpeg" />
        </audio>

        {/* Mute Button - Absolute Position */}
        <button
          onClick={toggleMute}
          className={`fixed bottom-5 right-5 w-12 h-12 rounded-full flex items-center justify-center z-40 hover:scale-110 transition-transform duration-300 ${
            isMuted ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
          }`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>
      </>
    );
  }
);

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;
