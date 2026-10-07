# Animated Heart PWA

A standalone romantic animated website inspired by the idea of an animated-heart landing page.

## Files

- `index.html` — page structure
- `style.css` — responsive design and animations
- `app.js` — personalization, particles, music toggle and install prompt
- `manifest.json` — PWA metadata
- `sw.js` — offline cache/service worker
- `assets/icon.svg` — app icon

## Personalize

Open `app.js` and edit the `CONFIG` object:

```js
const CONFIG = {
  nameOne: "Your Name",
  nameTwo: "Their Name",
  message: "Your short message.",
  letter: "Your longer message.",
  signature: "Always"
};
```

## Run locally

Because service workers require a secure context, use a local server instead of opening `index.html` directly.

Examples:

```bash
python -m http.server 8080
```

Then open:

`http://localhost:8080`

For the PWA install prompt and offline service worker to work on a deployed site, use HTTPS.

## Deploy

This project works with GitHub Pages, Netlify, Vercel and similar static hosting.

No backend is required.
