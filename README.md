# Portfolio Website Setup Guide

## Overview
This is a single-page scrolling portfolio website with dynamic bubble navigation and scroll-triggered 60-frame animations for each project.

## File Structure

```
portfolio/
├── index.html          # Main website file
├── README.md           # This file
└── frames/             # Create this folder for animation frames
    ├── nightstand/     # Project 1 frames
    │   ├── frame_001.jpg
    │   ├── frame_002.jpg
    │   └── ... (up to frame_060.jpg)
    ├── sidetable/      # Project 2 frames
    ├── pictureframe/   # Project 3 frames
    ├── project4/       # Project 4 frames
    └── project5/       # Project 5 frames
```

## Adding Your Animation Frames

### Frame Naming Convention
Each project needs 60 frames named sequentially:
- `frame_001.jpg`
- `frame_002.jpg`
- ...
- `frame_060.jpg`

### Recommended Frame Export Settings (Blender)
- **Resolution**: 1920x1080 or higher
- **Format**: JPEG (for file size) or PNG (for quality)
- **Quality**: 85-95%
- **Background**: Transparent or dark (#1A1816) to match the site

### Adding Frames
1. Create the `frames` folder in the same directory as `index.html`
2. Create a subfolder for each project (matching the `framePath` in the config)
3. Export your 60-frame sequences from Blender into each folder

## Configuring Projects

Edit the `projects` array in `index.html` (around line 520) to customize:

```javascript
const projects = [
    {
        id: 'project-slug',           // URL-friendly identifier
        title: 'Project Name',        // Display title
        category: 'Furniture Design', // Category label
        year: '2025',                 // Year created
        materials: 'Oak, Steel',      // Materials used
        description: 'Your description here...',
        frameCount: 60,               // Number of animation frames
        framePath: 'frames/folder/',  // Path to frame images
        galleryImages: [
            { src: 'path/to/image.jpg', placeholder: 'Description', class: '' },
            { src: '', placeholder: 'Placeholder Text', class: 'wide' },
            // class options: '', 'wide', 'tall'
        ]
    },
    // Add more projects...
];
```

### Adding/Removing Projects
The bubble navigation automatically recalculates positions based on the number of projects. Simply add or remove entries from the `projects` array.

## Adding Gallery Images

Replace the empty `src` values in `galleryImages` with paths to your project photos:

```javascript
galleryImages: [
    { src: 'images/nightstand-front.jpg', placeholder: 'Front View', class: '' },
    { src: 'images/nightstand-detail.jpg', placeholder: 'Detail', class: 'tall' },
    { src: 'images/nightstand-context.jpg', placeholder: 'In Room', class: 'wide' },
]
```

### Image Classes
- `''` (empty): Standard aspect ratio (4:3)
- `'wide'`: Spans 2 columns
- `'tall'`: Spans 2 rows

## Customizing Contact Information

In the Contact section (around line 290), update:
- Email: `href="mailto:your.email@example.com"`
- Phone: `href="tel:+1234567890"`
- Social links: Update the `href` attributes

## Customizing About Section

Update the About section (around line 265) with your:
- Photo (replace the placeholder div with an `<img>` tag)
- Bio text
- Education, experience, and focus details

## Performance Tips

### Optimizing Frame Images
1. **Compress images**: Use TinyPNG or similar
2. **Consider WebP**: Better compression, wide browser support
3. **Lazy loading**: Already implemented for gallery images

### For Better Performance
- Keep frame images under 200KB each
- Total animation sequence should ideally be under 12MB per project
- Use JPEG for renders, PNG only if transparency needed

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Option 1: Static Hosting
Upload the entire folder to any static host:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

### Option 2: Local Testing
Open `index.html` directly in a browser, or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve
```

## Troubleshooting

### Frames Not Loading
- Check file paths match the `framePath` in config
- Ensure frame names follow `frame_XXX.jpg` format
- Check browser console for 404 errors

### Bubbles Not Positioned Correctly
- Try refreshing the page
- Check that all projects have valid data
- Resize window to trigger recalculation

### Scroll Animation Stuttering
- Reduce frame image file sizes
- Consider reducing to 30 frames for slower connections
- Test in incognito mode (no extensions)

## Customization

### Colors
Edit CSS variables at the top of the `<style>` block:
```css
:root {
    --color-bg: #F5F3EF;        /* Main background */
    --color-accent: #8B7355;     /* Accent color */
    --color-text: #2C2824;       /* Primary text */
    /* ... */
}
```

### Fonts
The site uses:
- **Cormorant Garamond**: Display/headings
- **DM Sans**: Body text

Change via Google Fonts link and `--font-display` / `--font-body` variables.

---

Built for Sino | OCAD University Furniture Design
