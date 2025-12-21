export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#c9a227",
        "gold-light": "#e8d5a3",
        cream: "#faf8f5",
        dark: "#2d2d2d",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        script: ['"Great Vibes"', "cursive"],
        sans: ['"Montserrat"', "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in",
        "fade-out": "fadeOut 0.8s ease-out",
        "scale-in": "scaleIn 0.6s ease",
        "slide-up": "slideUp 0.8s ease",
        "float-up": "floatUp 8s ease-in forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "music-pulse": "musicPulse 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        floatUp: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "1" },
          "100%": {
            transform: "translateY(-100vh) translateX(100px)",
            opacity: "0",
          },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-5px)" },
        },
        musicPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      boxShadow: {
        envelope:
          "0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
