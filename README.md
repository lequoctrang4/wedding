# Wedding Invitation React App

Beautiful, interactive wedding invitation built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ Elegant envelope animation
- 💫 Smooth page transitions
- 🎵 Background music player with autoplay
- 💕 Floating hearts animation
- 📱 Fully responsive design
- 🎨 Customizable via JSON configuration
- ⚡ Built with Vite for fast development

## Project Structure

```
invitation-template/
├── src/
│   ├── components/          # React components
│   │   ├── Envelope.tsx
│   │   ├── Header.tsx
│   │   ├── Greeting.tsx
│   │   ├── Parents.tsx
│   │   ├── Gallery.tsx
│   │   ├── CoupleIntro.tsx
│   │   ├── EventDetails.tsx
│   │   ├── Quote.tsx
│   │   ├── Footer.tsx
│   │   ├── MusicPlayer.tsx
│   │   └── FloatingHeart.tsx
│   ├── config/
│   │   └── invitation.json  # All configuration & text
│   ├── styles/
│   │   └── index.css        # Custom animations & styles
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Configuration

Edit `src/config/invitation.json` to customize:

- Couple names
- Event dates and locations
- Family information
- Greeting messages
- Music file

## Installation

```bash
cd invitation-template
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Customization

### Changing Couple Information

Edit `src/config/invitation.json`:

```json
{
  "couple": {
    "groomName": "Your Name",
    "brideName": "Partner Name",
    "groomFamilyName": "Family Name",
    ...
  }
}
```

### Adding Images

Place images in `public/wedding-image/` and reference them in components.

### Changing Colors

Edit Tailwind configuration in `tailwind.config.js`:

```js
:root {
  --gold: '#c9a227';
  --gold-light: '#e8d5a3';
  ...
}
```

## Animations

- **Fade In**: Smooth opacity transition
- **Slide Up**: Element slides from bottom
- **Scale In**: Grow from center
- **Float Up**: Floating hearts effect
- **Pulse Soft**: Gentle pulsing animation

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT
