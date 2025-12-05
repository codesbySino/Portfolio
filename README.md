# Sinan's Portfolio

A single-page scrolling portfolio website featuring dynamic bubble navigation and scroll-triggered frame animations.

## Setup

### Install dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Adding Your Content

### Animation Frames
Place your 60-frame animation sequences in `/public/animations/`:
- Project 1: `a0001.png` through `a0060.png`
- Project 2: `b0001.png` through `b0060.png`
- Project 3: `c0001.png` through `c0060.png`
- Project 4: `d0001.png` through `d0060.png`
- Project 5: `e0001.png` through `e0060.png`

### Project Images
Place your project photographs in `/public/images/projects/`:
- Update the image paths in `/src/data/projects.js`

### Updating Project Content
Edit `/src/data/projects.js` to update:
- Project titles, subtitles, descriptions
- Materials and dimensions
- Image paths
- About page content
- Contact information

## Adding/Removing Projects

The website automatically adjusts for any number of projects. To add a new project:

1. Add a new entry to the `projects` array in `/src/data/projects.js`
2. Use the next letter in sequence for the animation frames (e.g., `f` for project 6)
3. Add the corresponding animation frames to `/public/animations/`

The bubble layout will automatically recalculate positions.

## Deployment to GitHub Pages

1. Update `vite.config.js` with your repository name:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

2. Build the project:
```bash
npm run build
```

3. Deploy the `dist` folder to GitHub Pages

## Tech Stack

- React 18
- Vite
- Framer Motion (animations)
- CSS Custom Properties
- Google Fonts (Cormorant Garamond, DM Sans)
