import React from "react";

interface VinylPlayerProps {
  isPlaying: boolean;
  songTitle?: string;
  onTogglePlay?: () => void;
}

const VinylPlayer: React.FC<VinylPlayerProps> = ({
  isPlaying,
  songTitle = "Wedding Music",
  onTogglePlay,
}) => {
  const handleVinylClick = () => {
    onTogglePlay?.();
  };

  return (
    <div className="vinyl-player-container">
      <div className="vinyl-player">
        {/* Turntable Base */}
        <div
          className="turntable-base"
          onClick={handleVinylClick}
          style={{ cursor: "pointer" }}
        >
          {/* Vinyl Record */}
          <div className={`vinyl-record ${isPlaying ? "spinning" : ""}`}>
            {/* Vinyl grooves effect */}
            <svg viewBox="0 0 300 300" className="vinyl-grooves">
              {/* Outer rings */}
              <circle
                cx="150"
                cy="150"
                r="140"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx="150"
                cy="150"
                r="130"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx="150"
                cy="150"
                r="110"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx="150"
                cy="150"
                r="100"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx="150"
                cy="150"
                r="90"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx="150"
                cy="150"
                r="80"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx="150"
                cy="150"
                r="70"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx="150"
                cy="150"
                r="60"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx="150"
                cy="150"
                r="50"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </svg>

            {/* Center Label */}
            <div className="vinyl-label">
              <div className="label-text">{songTitle}</div>
            </div>
          </div>

          {/* Tonearm - Stylus */}
          <div className={`tonearm ${isPlaying ? "playing" : "idle"}`}>
            <div className="tonearm-shaft"></div>
            <div className="stylus"></div>
          </div>
        </div>
      </div>

      <style>{`
        .vinyl-player-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 0;
          perspective: 1000px;
        }

        .vinyl-player {
          position: relative;
          width: 280px;
          height: 280px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .turntable-base {
          position: relative;
          width: 280px;
          height: 280px;
          background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
          border-radius: 50%;
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.8),
            inset 0 2px 5px rgba(255, 255, 255, 0.1),
            inset 0 -2px 5px rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .vinyl-record {
          position: absolute;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle at 30% 30%, #333, #000);
          border-radius: 50%;
          box-shadow: 
            0 5px 20px rgba(0, 0, 0, 0.9),
            inset 0 -2px 5px rgba(255, 255, 255, 0.05);
        }

        .vinyl-record.spinning {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .vinyl-grooves {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .vinyl-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, #d4af37 0%, #c9a961 100%);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.5),
            inset 0 1px 3px rgba(255, 255, 255, 0.2);
          z-index: 2;
        }

        .label-text {
          text-align: center;
          font-size: 10px;
          font-weight: bold;
          color: #333;
          text-transform: uppercase;
          padding: 10px;
          word-break: break-word;
          max-height: 100%;
          overflow: hidden;
        }

        /* Tonearm - Record player needle */
        .tonearm {
          position: absolute;
          top: 20px;
          right: 30px;
          width: 150px;
          height: 30px;
          transform-origin: right center;
          z-index: 10;
        }

        .tonearm.idle {
          animation: tonearmIdle 1s ease-in-out;
          animation-fill-mode: forwards;
          transform: rotate(-35deg);
        }

        .tonearm.playing {
          animation: tonearmPlaying 0.8s ease-in-out;
          animation-fill-mode: forwards;
          transform: rotate(-5deg);
        }

        @keyframes tonearmIdle {
          from {
            transform: rotate(-5deg);
          }
          to {
            transform: rotate(-35deg);
          }
        }

        @keyframes tonearmPlaying {
          from {
            transform: rotate(-35deg);
          }
          to {
            transform: rotate(-5deg);
          }
        }

        .tonearm-shaft {
          position: absolute;
          top: 10px;
          right: 0;
          width: 140px;
          height: 15px;
          background: linear-gradient(to right, #555, #333, #000);
          border-radius: 10px;
          box-shadow: 
            0 2px 5px rgba(0, 0, 0, 0.6),
            inset 0 1px 2px rgba(255, 255, 255, 0.1);
        }

        .stylus {
          position: absolute;
          bottom: -8px;
          right: 5px;
          width: 2px;
          height: 20px;
          background: #888;
          border-radius: 1px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
};

export default VinylPlayer;
