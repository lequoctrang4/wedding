## Deploy to Cloudflare Pages

This project is a static React + Vite site. The production build outputs to `dist/`. You can deploy it to Cloudflare Pages via the dashboard (UI) or using the CLI.

### Option A — Cloudflare Pages (Dashboard)

- Push this project to a GitHub repository.
- In Cloudflare Dashboard: Pages → Create a project → Connect to GitHub → select your repo.
- Build settings:
  - Framework preset: Vite (or “None” if not available)
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Node version: 18 or 20 (Vite 5 requires Node ≥ 18). You can set this in Pages → Settings → Build → Node version. - **⚠️ Important:** Leave **Deploy command** and **Non-production branch deploy command** blank (or remove `npm run deploy` / `npx wrangler versions upload` if they're set). Cloudflare Pages doesn't need a separate deploy command for static sites.- Click Deploy. Cloudflare will build and host the site on a `*.pages.dev` domain. You can later add a custom domain.

### Option B — Cloudflare CLI (Wrangler)

If you prefer the CLI:

1. Install Wrangler and log in

```
npm install -D wrangler
npx wrangler login
```

2. Build locally (already configured)

```
npm run build
```

3. Create a Pages project and deploy the `dist/` folder

```
npx wrangler pages project create wedding-invitation
npx wrangler pages deploy dist --project-name wedding-invitation
```

Cloudflare will return a preview URL on each deploy. For production, you can deploy from the `main` branch or set up environments.

### Local preview

To verify the production build locally:

```
npm run build
npm run preview
```

Then open the URL printed in the terminal (default http://localhost:4173).

### Notes

- Ensure large assets (images, audio) are optimized to keep deploy size small. The `dist/` folder currently includes `wedding-image/` and an `music.mp3` file; consider compressing if needed.
- No server-side logic is required; Cloudflare Pages serves the static bundle from `dist/`.

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
