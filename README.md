# Portfolio Website Setup Guide

## Overview
This is a single-page scrolling portfolio website with dynamic bubble navigation and scroll-triggered video animations for each project.

## File Structure

```
portfolio/
├── index.html          # Main website file
├── style.css           # Styles
├── script.js           # JavaScript logic
├── README.md           # This file
├── CNAME               # Custom domain (sinodesigns.com)
└── videos/             # Create this folder for project videos (optional)
    ├── project1.mp4
    ├── project2.mp4
    └── ...
```

## How It Works

The portfolio uses scroll-triggered video scrubbing to animate through each project. As you scroll through a project section, the video plays frame-by-frame based on your scroll position.

### Video Configuration
Each project in `script.js` has a `videoSrc` property pointing to the video file:

```javascript
const projects = [
    {
        id: 'project-slug',           // URL-friendly identifier
        title: 'Project Name',        // Display title
        category: 'Furniture Design', // Category label
        year: '2025',                 // Year created
        materials: 'Oak, Steel',      // Materials used
        description: 'Your description here...',
        videoSrc: 'path/to/video.mp4', // Path to MP4 video
        galleryImages: [
            { src: 'path/to/image.jpg', placeholder: 'Description', class: '' },
            { src: '', placeholder: 'Placeholder Text', class: 'wide' },
            // class options: '', 'wide', 'tall'
        ]
    },
    // Add more projects...
];
```

### Video Hosting Options

1. **GitHub Releases** (current setup):
   - Upload videos to GitHub Releases
   - Use the download URL: `https://github.com/username/repo/releases/download/v1/video.mp4`

2. **Local Files**:
   - Place videos in the project folder
   - Use relative paths: `videos/project1.mp4`

3. **External CDN**:
   - Host on services like Cloudinary, Vimeo (with direct links), etc.

### Recommended Video Settings
- **Resolution**: 1920x1080 or 1280x720
- **Format**: MP4 (H.264 codec)
- **Duration**: 3-10 seconds works best for scroll scrubbing
- **File Size**: Under 5MB per video for optimal loading

## Adding/Removing Projects

The bubble navigation automatically recalculates positions based on the number of projects. Simply add or remove entries from the `projects` array in `script.js`.

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

In `index.html`, update the Contact section (around line 94):
- Email: `href="mailto:your.email@example.com"` → your actual email
- Phone: `href="tel:+1234567890"` → your actual phone number
- Social links: Update the `href` attributes to your profiles

## Customizing About Section

Update the About section in `index.html` (around line 62) with your:
- Photo (replace the placeholder div with an `<img>` tag)
- Bio text
- Education, experience, and focus details

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Option 1: GitHub Pages
1. Push to your GitHub repository
2. Go to Settings → Pages
3. Select your branch and save

### Option 2: Other Static Hosts
Upload the entire folder to:
- Netlify
- Vercel
- Cloudflare Pages

### Option 3: Local Testing
Open `index.html` directly in a browser, or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve
```

## Troubleshooting

### Videos Not Loading
- Check that video URLs are accessible (try opening in a new browser tab)
- For GitHub releases, ensure the release is public
- Check browser console for CORS errors
- Verify file paths are correct

### Bubbles Not Positioned Correctly
- Try refreshing the page
- Check that all projects have valid data
- Resize window to trigger recalculation

### Scroll Animation Stuttering
- Reduce video file sizes
- Use lower resolution videos
- Test in incognito mode (no extensions)

## Customization

### Colors
Edit CSS variables in `style.css`:
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

Change via Google Fonts link in `index.html` and update `--font-display` / `--font-body` variables in `style.css`.

---

Built for Sino | OCAD University Furniture Design
