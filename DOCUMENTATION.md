# Portfolio Website - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Website Structure](#website-structure)
3. [Technical Architecture](#technical-architecture)
4. [HTML Structure Explained](#html-structure-explained)
5. [CSS Design System](#css-design-system)
6. [JavaScript Functionality](#javascript-functionality)
7. [Features Deep Dive](#features-deep-dive)
8. [Mobile Responsiveness](#mobile-responsiveness)
9. [Performance Optimizations](#performance-optimizations)
10. [Customization Guide](#customization-guide)

---

## Overview

This is a single-page portfolio website for Sino, a Toronto-based furniture designer. The website showcases design projects through an innovative interface featuring:

- **Interactive bubble navigation** - Circular project buttons that animate on scroll
- **Scroll-triggered video animations** - Videos scrub frame-by-frame based on scroll position
- **Responsive design** - Fully optimized for desktop, tablet, and mobile devices
- **Smooth animations** - CSS transitions and JavaScript-powered interactions

### Key Technologies
- **HTML5** - Semantic markup with modern elements
- **CSS3** - Custom properties, Grid, Flexbox, and advanced animations
- **Vanilla JavaScript** - No frameworks, pure ES6+ code
- **GitHub Releases** - Video hosting via release assets

---

## Website Structure

### Main Sections

```
┌─────────────────────────────────────┐
│ 1. Navigation (Fixed Header)        │
├─────────────────────────────────────┤
│ 2. Homepage (Hero + Bubbles)        │
├─────────────────────────────────────┤
│ 3. Project Sections (×6)            │
│    - Video Animation Container      │
│    - Project Details & Gallery      │
├─────────────────────────────────────┤
│ 4. About Section                    │
├─────────────────────────────────────┤
│ 5. Contact Section                  │
├─────────────────────────────────────┤
│ 6. Footer                           │
└─────────────────────────────────────┘
```

### File Organization

```
Portfolio/
├── index.html              # Main HTML document
├── style.css               # All styling and animations
├── script.js               # Interactive functionality
├── README.md               # Setup and usage guide
├── DOCUMENTATION.md        # This file
├── CNAME                   # Custom domain configuration
├── about-photo.jpg         # Designer profile photo
└── project[N]-[M].jpg      # Project images (N=project number, M=image number)
```

---

## Technical Architecture

### Design Patterns Used

1. **Module Pattern** - Code organized into logical functions
2. **Data-Driven UI** - Projects array drives content generation
3. **Progressive Enhancement** - Core content works without JavaScript
4. **Mobile-First Responsive** - Media queries build up from mobile
5. **Performance-First** - Lazy loading, RAF optimization, efficient selectors

### Data Flow

```
Project Data (script.js)
    ↓
DOM Generation (createProjectSections)
    ↓
Event Listeners (scroll, click, resize)
    ↓
Animation Updates (RAF-throttled)
    ↓
Visual Updates (CSS transforms)
```

---

## HTML Structure Explained

### index.html:1-11 - Document Head

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sino | Furniture Design Portfolio</title>
```

**Purpose**: Sets up the document with proper character encoding, viewport settings for mobile responsiveness, and page title.

**Key Attributes**:
- `lang="en"` - Declares English language for accessibility
- `viewport` meta tag - Enables responsive design on mobile devices

### index.html:7-9 - Google Fonts Integration

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond...">
```

**Purpose**: Loads custom fonts from Google Fonts API.

**Fonts Used**:
- **Cormorant Garamond** - Elegant serif for headings and display text
- **DM Sans** - Clean sans-serif for body text and UI elements

**Optimization**: `preconnect` hints speed up font loading by establishing early connections.

### index.html:14-54 - Navigation Bar

```html
<nav class="nav">
    <a href="#home" class="nav-logo">
        <svg class="nav-logo-img" id="Layer_1" xmlns="http://www.w3.org/2000/svg"...>
```

**Purpose**: Fixed navigation bar with logo and menu links.

**Key Features**:
- **Fixed positioning** - Stays visible during scroll
- **Mix-blend-mode** - Inverts colors over different backgrounds
- **SVG logo** - Scalable vector graphic for crisp rendering
- **Responsive menu** - Switches to hamburger menu on mobile

**SVG Logo Details**:
- Uses `currentColor` for fill/stroke - inherits text color
- Scalable without quality loss
- Custom "Sino designs" wordmark

### index.html:56-64 - Mobile Menu

```html
<div class="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu"></button>
    <ul class="mobile-menu-links">
```

**Purpose**: Full-screen mobile navigation overlay.

**Behavior**:
- Hidden by default (`opacity: 0; visibility: hidden`)
- Activated by hamburger button click
- Animated fade-in/out transitions
- Locks body scroll when open

### index.html:66-67 - Transition Overlay

```html
<div class="transition-overlay"></div>
```

**Purpose**: Smooth page transitions between sections (currently for future use).

### index.html:70-84 - Homepage Hero Section

```html
<section id="home" class="homepage">
    <div class="hero-text">
        <h1 class="hero-title">Furniture Design</h1>
        <p class="hero-subtitle">Crafted with intention</p>
    </div>

    <div class="bubble-container" id="bubbleContainer">
        <!-- Bubbles generated by JavaScript -->
    </div>
```

**Purpose**: Landing section with centered hero text and bubble navigation.

**Key Elements**:
1. **Hero Text** - Main heading and tagline
2. **Bubble Container** - JavaScript fills with project bubbles
3. **Scroll Indicator** - Animated prompt to scroll down

**Design Notes**:
- Full viewport height (`100vh`)
- Gradient background with subtle radial overlays
- Hero text fades out on scroll
- Bubbles animate from circular to vertical layout

### index.html:86-87 - Project Sections Container

```html
<div id="projectSections"></div>
```

**Purpose**: Container where JavaScript dynamically generates all project sections.

**Generated Structure** (per project):
```html
<section class="project-section" id="project-id">
    <!-- Video animation container (300vh tall) -->
    <div class="frame-animation-container">
        <div class="frame-sticky">
            <div class="frame-display">
                <video class="project-video" muted playsinline>
            <!-- Project content (text + gallery) -->
    <div class="project-content">
```

### index.html:90-121 - About Section

```html
<section id="about" class="about-section">
    <div class="about-container">
        <div class="about-image">
            <img src="./about-photo.jpg" alt="Sino - Furniture Designer">
        </div>
        <div class="about-content">
```

**Purpose**: Designer biography with photo and professional details.

**Layout**:
- Two-column grid on desktop (image | text)
- Single column on mobile
- Four detail blocks: Education, Experience, Focus, Location

**Content Sections**:
1. Main biography (4 paragraphs)
2. Detail blocks grid
3. Professional background

### index.html:124-157 - Contact Section

```html
<section id="contact" class="contact-section">
    <div class="contact-container">
        <h2>Let's Connect</h2>
        <div class="contact-links">
            <a href="mailto:sinan.almis@gmail.com" class="contact-link">
```

**Purpose**: Contact information and social media links.

**Features**:
- Email link with icon
- Instagram and LinkedIn social buttons
- Dark background for visual separation
- Centered layout

### index.html:160-162 - Footer

```html
<footer class="footer">
    <p>© 2025 Sino designs. All rights reserved.</p>
</footer>
```

**Purpose**: Simple copyright footer.

---

## CSS Design System

### style.css:1-18 - CSS Custom Properties (Variables)

```css
:root {
    --color-bg: #F5F3EF;
    --color-bg-warm: #EDE8E0;
    --color-text: #2C2824;
    --color-text-light: #6B6560;
    --color-accent: #8B7355;
    --color-accent-dark: #5C4D3D;
    --color-cream: #FAF8F5;
    --color-charcoal: #1A1816;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body: 'DM Sans', -apple-system, sans-serif;
    --transition-smooth: cubic-bezier(0.4, 0, 0.2, 1);
    --transition-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
    --bubble-orbit-multiplier: 0.42;
    --bubble-min-orbit-radius: 160px;
}
```

**Purpose**: Centralized design tokens for consistent theming.

**Color Palette**:
- **Warm neutrals** - Beige/cream backgrounds (#F5F3EF, #EDE8E0)
- **Dark text** - High contrast charcoal (#2C2824)
- **Brown accents** - Furniture-inspired tones (#8B7355)
- **Cream highlights** - Light UI elements (#FAF8F5)

**Typography**:
- Serif for elegance and sophistication
- Sans-serif for readability

**Transitions**:
- **Smooth** - Standard easing for most animations
- **Bounce** - Playful spring effect (currently unused)

**Bubble Configuration**:
- **Orbit multiplier** - Controls how far bubbles are from center
- **Min radius** - Prevents bubbles from overlapping hero text

### style.css:20-37 - Global Reset

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

**Purpose**: Removes browser default styles for consistency.

**box-sizing: border-box**: Makes width/height calculations include padding and border, simplifying layout math.

### style.css:40-83 - Navigation Styles

```css
.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    mix-blend-mode: difference;
}
```

**Key CSS Properties**:

1. **Fixed positioning** - Stays at top during scroll
2. **High z-index** - Renders above all content
3. **mix-blend-mode: difference** - Inverts colors for visibility over any background
4. **Flexbox layout** - Space-between for logo and links

**Navigation Links**:
- Uppercase with letter-spacing for sophistication
- Smooth opacity transition on hover
- Cream color (light) that inverts to dark via blend mode

### style.css:86-242 - Homepage & Bubble Styles

#### Homepage Container

```css
.homepage {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-warm) 100%);
}
```

**Purpose**: Full-screen landing section with centered content.

**Background**: Subtle diagonal gradient for visual interest without distraction.

**Pseudo-element overlay**:
```css
.homepage::before {
    background-image:
        radial-gradient(circle at 20% 30%, rgba(139, 115, 85, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(139, 115, 85, 0.05) 0%, transparent 50%);
}
```
Creates soft light spots for depth.

#### Hero Text

```css
.hero-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 300;
    letter-spacing: 0.02em;
}
```

**clamp()**: Responsive font sizing that scales smoothly between min (2rem), preferred (5vw), and max (4rem).

**Light font-weight (300)**: Elegant, refined aesthetic.

#### Bubble Container

```css
.bubble-container {
    position: relative;
    width: min(75vh, 75vw, 550px);
    height: min(75vh, 75vw, 550px);
}
```

**min() function**: Takes smallest value to ensure bubbles fit in viewport while maintaining square aspect ratio.

**Calculation logic**:
- 75% of viewport height
- 75% of viewport width
- Maximum 550px
- Whichever is smallest ensures proper fit

#### Project Bubbles

```css
.project-bubble {
    position: absolute;
    width: clamp(70px, 12vw, 100px);
    height: clamp(70px, 12vw, 100px);
    border-radius: 50%;
    background: var(--color-cream);
    cursor: pointer;
    transition: all 0.5s var(--transition-smooth);
    box-shadow:
        0 4px 20px rgba(44, 40, 36, 0.08),
        0 1px 3px rgba(44, 40, 36, 0.05);
}
```

**Positioning**: Calculated by JavaScript using trigonometry for circular arrangement.

**Hover Effect**:
```css
.project-bubble:hover {
    transform: scale(1.1);
    box-shadow:
        0 8px 40px rgba(44, 40, 36, 0.12),
        0 2px 6px rgba(44, 40, 36, 0.08);
}
```
Subtle lift with enhanced shadow for depth.

**Pseudo-element gradient overlay**:
Adds subtle dimension on hover.

#### Scroll Indicator

```css
.scroll-line {
    animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
    0%, 100% { transform: scaleY(1); opacity: 1; }
    50% { transform: scaleY(0.5); opacity: 0.5; }
}
```

**Purpose**: Animated line that pulses to encourage scrolling.

### style.css:244-313 - Video Frame Animation Styles

```css
.frame-animation-container {
    height: 300vh;
    position: relative;
}

.frame-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
}
```

**How It Works**:

1. **Container** - 300vh (3× viewport height) creates scrollable area
2. **Sticky element** - "Sticks" to top while scrolling through container
3. **Video scrubbing** - JavaScript updates video.currentTime based on scroll position

**Result**: Video appears to play as you scroll, creating a scrub effect.

**Video Styling**:
```css
.project-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #000000;
}
```

**object-fit: contain** - Maintains video aspect ratio without cropping.

### style.css:315-451 - Project Content & Gallery

#### Project Header

```css
.project-header h3 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 300;
}
```

Responsive heading that scales with viewport.

#### Meta Information

```css
.project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    border-bottom: 1px solid rgba(139, 115, 85, 0.2);
}
```

**Flexbox with wrap**: Items flow horizontally and wrap on small screens.

**Border-bottom**: Visual separator between meta and description.

#### Gallery Grid

```css
.project-gallery {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}
```

**Layout Structure**:
- First image: Full-width hero
- Remaining images: 2-column grid (2×2)

**Hover Effects**:
```css
.gallery-item:hover {
    transform: translateY(-4px);
}

.gallery-item:hover img {
    transform: scale(1.02);
}
```
Container lifts, image zooms slightly for depth.

### style.css:453-531 - About Section

```css
.about-container {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: clamp(3rem, 8vw, 6rem);
}
```

**Grid Layout**:
- Left column: Image (1 fraction)
- Right column: Content (1.2 fractions, slightly larger)

**Image Border Effect**:
```css
.about-image::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(139, 115, 85, 0.1);
    border-radius: 4px;
}
```
Pseudo-element creates subtle frame over image.

**Details Grid**:
```css
.about-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}
```
2×2 grid for Education, Experience, Focus, Location.

### style.css:533-643 - Contact & Footer

#### Contact Section

```css
.contact-section {
    min-height: 100vh;
    background: var(--color-charcoal);
    color: var(--color-cream);
}
```

**Dark theme** for visual contrast with previous sections.

**Contact Links**:
```css
.contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s var(--transition-smooth);
}

.contact-link:hover {
    background: rgba(250, 248, 245, 0.05);
    transform: translateX(4px);
}
```
Subtle slide-right animation on hover.

**Social Link Circles**:
```css
.social-link {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(250, 248, 245, 0.2);
}

.social-link:hover {
    transform: translateY(-3px);
}
```
Circular buttons that lift on hover.

### style.css:645-862 - Mobile Responsive Design

#### Responsive Breakpoints

```css
@media (max-width: 1200px) { /* Tablet landscape */ }
@media (max-width: 900px) { /* Tablet portrait */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 480px) { /* Small mobile */ }
```

**Progressive adjustments**:
- Bubble orbit radius decreases
- Font sizes scale down
- Grids convert to single column
- Navigation switches to hamburger menu

#### Mobile Menu

```css
.mobile-menu {
    position: fixed;
    inset: 0;
    background: var(--color-charcoal);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s var(--transition-smooth);
}

.mobile-menu.open {
    opacity: 1;
    visibility: visible;
}
```

**Full-screen overlay** that fades in when activated.

**Close Button**:
```css
.mobile-menu-close::before,
.mobile-menu-close::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: var(--color-cream);
}

.mobile-menu-close::before { transform: rotate(45deg); }
.mobile-menu-close::after { transform: rotate(-45deg); }
```
X icon created with pseudo-elements (rotated lines).

---

## JavaScript Functionality

### script.js:1-113 - Project Data Structure

```javascript
const projects = [
    {
        id: 'chai-table-set',
        title: 'Chai Table Set',
        category: 'Furniture Design',
        year: '2024',
        materials: 'Plywood and Cast Acrylic',
        description: 'A sturdy, elegant table...',
        videoSrc: 'https://github.com/.../project1.mp4',
        imagePrefix: 'project1',
        imageCount: 5,
        galleryLayout: [ /* ... */ ]
    },
    // ... 5 more projects
];
```

**Purpose**: Single source of truth for all project data.

**Key Properties**:
- **id**: URL-friendly identifier for section anchors
- **videoSrc**: Path to MP4 video file
- **imagePrefix**: Base name for images (e.g., "project1" → project1-1.jpg, project1-2.jpg)
- **imageCount**: Number of gallery images
- **galleryLayout**: Custom configurations per image (placeholders, extensions)

**Benefits**:
- Add/remove projects by editing this array
- Automatic UI generation
- Centralized content management

### script.js:115-141 - getGalleryImages Helper

```javascript
function getGalleryImages(project) {
    const defaultExtension = project.imageExtension || 'jpg';

    return project.galleryLayout.map((layout, index) => {
        const imageNumber = index + 1;
        const extension = layout.extension || defaultExtension;
        const src = imageNumber <= project.imageCount
            ? `./${project.imagePrefix}-${imageNumber}.${extension}`
            : '';

        return {
            src: src,
            placeholder: layout.placeholder,
            class: layout.class
        };
    });
}
```

**Purpose**: Generates image objects with proper file paths.

**Logic**:
1. Iterates through galleryLayout
2. Constructs filename: `project1-1.jpg`, `project1-2.jpg`, etc.
3. Supports custom extensions per image (e.g., PNG for some images)
4. Returns empty `src` if imageNumber exceeds imageCount (shows placeholder)

### script.js:143-157 - Initialization

```javascript
const bubbleContainer = document.getElementById('bubbleContainer');
const projectSectionsContainer = document.getElementById('projectSections');
let bubbles = [];
let videoAnimations = [];
let videosUnlocked = false;

function init() {
    createBubbles();
    createProjectSections();
    setupScrollAnimations();
    setupMobileMenu();
    setupNavigation();
    setupMobileVideoUnlock();
}

document.addEventListener('DOMContentLoaded', init);
```

**Flow**:
1. Cache DOM elements
2. Initialize state variables
3. Run setup functions when DOM is ready

**State Management**:
- `bubbles` - Array of bubble DOM elements
- `videoAnimations` - Array of {container, video, isLoaded} objects
- `videosUnlocked` - iOS video playback flag

### script.js:169-195 - iOS Video Unlock

```javascript
function setupMobileVideoUnlock() {
    const unlockVideos = () => {
        if (videosUnlocked) return;
        videosUnlocked = true;

        videoAnimations.forEach((anim) => {
            const playPromise = anim.video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    anim.video.pause();
                    anim.video.currentTime = 0;
                }).catch(() => {});
            }
        });

        document.removeEventListener('touchstart', unlockVideos);
        document.removeEventListener('click', unlockVideos);
    };

    document.addEventListener('touchstart', unlockVideos, { once: true });
    document.addEventListener('click', unlockVideos, { once: true });
}
```

**Purpose**: Workaround for iOS autoplay restrictions.

**iOS Limitation**: Videos can't play until user interacts with page.

**Solution**:
1. Listen for first touch/click
2. Programmatically play() then pause() all videos
3. This "unlocks" them for future playback
4. Remove listeners after first interaction

### script.js:197-238 - Bubble Positioning Math

```javascript
function calculateOrbitRadius() {
    const containerSize = Math.min(bubbleContainer.offsetWidth, bubbleContainer.offsetHeight);
    const centerHalf = containerSize / 2;
    const bubbleSize = getBubbleSize();

    const maxRadiusForFit = centerHalf - (bubbleSize / 2) - 10;
    const minRadiusForTextClearance = horizontalClearance / 0.866;
    const containerBasedRadius = centerHalf * orbitMultiplier;

    const desiredRadius = Math.max(containerBasedRadius, minOrbitRadius, minRadiusForTextClearance);
    return Math.min(desiredRadius, maxRadiusForFit);
}
```

**Purpose**: Calculates optimal radius for circular bubble arrangement.

**Constraints**:
1. **maxRadiusForFit** - Keeps bubbles within container bounds
2. **minRadiusForTextClearance** - Prevents overlap with hero text
3. **containerBasedRadius** - Scales with container size

**Math**:
- Uses trigonometry: `cos(30°) ≈ 0.866` for text clearance
- Takes maximum of minimums (ensure all constraints met)
- Takes minimum of result and max fit (prioritize fitting all bubbles)

### script.js:240-274 - createBubbles()

```javascript
function createBubbles() {
    const centerX = bubbleContainer.offsetWidth / 2;
    const centerY = bubbleContainer.offsetHeight / 2;
    const radius = calculateOrbitRadius();
    const angleStep = (2 * Math.PI) / projects.length;
    const startAngle = -Math.PI / 2; // Start at top (12 o'clock)

    projects.forEach((project, index) => {
        const angle = startAngle + (index * angleStep);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const bubble = document.createElement('div');
        bubble.className = 'project-bubble';
        bubble.dataset.originalX = x;
        bubble.dataset.originalY = y;
        bubble.style.transform = `translate(${x - bubbleSize / 2}px, ${y - bubbleSize / 2}px)`;
        bubble.addEventListener('click', () => handleBubbleClick(index));

        bubbleContainer.appendChild(bubble);
        bubbles.push(bubble);
    });
}
```

**Purpose**: Dynamically creates and positions project bubbles in a circle.

**Trigonometry**:
- **angleStep**: Divides 360° (2π radians) evenly by project count
- **startAngle**: -π/2 radians = -90° = top of circle (12 o'clock)
- **x = centerX + radius × cos(angle)** - Horizontal position
- **y = centerY + radius × sin(angle)** - Vertical position

**Data Attributes**:
- `data-original-x/y` - Stores initial position for animation interpolation

**Why -bubbleSize/2?**
- Bubble position is its top-left corner
- Subtract half size to center the bubble on calculated point

### script.js:276-346 - createProjectSections()

```javascript
function createProjectSections() {
    projects.forEach((project, index) => {
        const section = document.createElement('section');
        section.className = 'project-section';
        section.id = project.id;
        section.innerHTML = `
            <div class="frame-animation-container" data-project-index="${index}">
                <div class="frame-sticky">
                    <div class="frame-display" id="frameDisplay${index}">
                        <div class="frame-loading">...</div>
                    </div>
                    <div class="project-title-overlay">
                        <span>${project.category}</span>
                        <h2>${project.title}</h2>
                    </div>
                </div>
            </div>

            <div class="project-content">
                <div class="project-header">...</div>
                <div class="project-gallery">
                    ${(() => {
                        const images = getGalleryImages(project);
                        const heroImage = images[0];
                        const gridImages = images.slice(1);
                        return `
                            <div class="gallery-item hero">
                                ${heroImage.src ? `<img src="${heroImage.src}">` : `<div class="gallery-placeholder">...</div>`}
                            </div>
                            <div class="gallery-grid">
                                ${gridImages.map((img) => `...`).join('')}
                            </div>
                        `;
                    })()}
                </div>
            </div>
        `;

        projectSectionsContainer.appendChild(section);
        initVideoAnimation(index, project);
    });
}
```

**Purpose**: Generates all project sections from data array.

**Template Literals**: Uses ES6 backticks for multiline HTML strings.

**IIFE for Gallery**:
```javascript
${(() => { /* ... */ })()}
```
Immediately Invoked Function Expression runs inline to generate gallery HTML.

**Gallery Layout**:
1. First image spans full width (hero)
2. Remaining images in 2×2 grid

### script.js:349-426 - initVideoAnimation()

```javascript
function initVideoAnimation(index, project) {
    const frameDisplay = document.getElementById(`frameDisplay${index}`);

    const video = document.createElement('video');
    video.className = 'project-video';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const source = document.createElement('source');
    source.src = project.videoSrc;
    source.type = 'video/mp4';
    video.appendChild(source);

    frameDisplay.appendChild(video);
    video.load();

    video.addEventListener('loadedmetadata', hideLoading);
    video.addEventListener('error', showError);

    videoAnimations.push({ container, video, isLoaded: false });
}
```

**Purpose**: Creates video element and sets up loading/error handling.

**Critical Attributes**:
- `muted` - Required for autoplay on iOS
- `playsInline` - Prevents fullscreen on mobile
- `preload="metadata"` - Loads video info without full download (mobile-friendly)

**iOS Safari Compatibility**:
- Both `playsinline` and `webkit-playsinline` attributes
- Explicit `muted` attribute

**Loading States**:
1. Show loading spinner initially
2. Hide on `loadedmetadata` or `canplay` events
3. Fallback: Hide after 3 seconds anyway
4. Show error message if video fails to load

### script.js:428-493 - Scroll Animation System

```javascript
function setupScrollAnimations() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}
```

**Purpose**: Optimizes scroll event handling using RAF (requestAnimationFrame).

**Optimization Pattern**:
1. Scroll fires many times per second
2. `ticking` flag prevents queueing multiple RAF callbacks
3. RAF syncs updates with browser repaint (60fps)
4. Prevents layout thrashing and jank

**Why RAF?**
- Browser schedules callback before next repaint
- Batches DOM reads/writes efficiently
- Automatically pauses in hidden tabs (saves battery)

### script.js:444-493 - handleScroll()

```javascript
function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Homepage bubble animation
    if (scrollY < windowHeight) {
        const progress = Math.min(scrollY / (windowHeight * 0.3), 1);
        animateBubbles(progress);

        if (progress > 0 && !hasScrolled) {
            heroText.classList.add('hidden');
            scrollIndicator.classList.add('hidden');
        }
    }

    // Video scrubbing
    videoAnimations.forEach((anim) => {
        const rect = anim.container.getBoundingClientRect();
        const containerHeight = anim.container.offsetHeight;
        const scrollableHeight = containerHeight - windowHeight;

        if (rect.top <= 0 && rect.bottom >= 0) {
            const scrollProgress = Math.abs(rect.top) / scrollableHeight;
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

            if (anim.video.duration > 0) {
                anim.video.currentTime = clampedProgress * anim.video.duration;
            }
        }
    });
}
```

**Purpose**: Updates animations based on scroll position.

**Bubble Animation**:
- **Progress**: 0 to 1 over first 30% of viewport height
- Triggers hero text fade at any scroll
- Calls `animateBubbles()` with progress value

**Video Scrubbing**:
- **getBoundingClientRect()**: Gets element position relative to viewport
- **In view check**: `rect.top <= 0 && rect.bottom >= 0`
- **Scroll progress**: How far through the 300vh container
- **currentTime**: Sets video frame to match scroll position

**Math**:
```javascript
scrollProgress = |rect.top| / scrollableHeight
currentTime = scrollProgress × duration
```

### script.js:495-519 - animateBubbles()

```javascript
function animateBubbles(progress) {
    const centerX = bubbleContainer.offsetWidth / 2;
    const centerY = bubbleContainer.offsetHeight / 2;
    const bubbleSize = getBubbleSize();
    const verticalSpacing = bubbleSize + 20;
    const scale = 1 - progress * 0.3;
    const opacity = 1 - (progress * 0.8);

    bubbles.forEach((bubble, index) => {
        const originalX = parseFloat(bubble.dataset.originalX);
        const originalY = parseFloat(bubble.dataset.originalY);

        const targetX = centerX;
        const targetY = (index * verticalSpacing) + bubbleSize;

        const currentX = originalX + (targetX - originalX) * progress;
        const currentY = originalY + (targetY - originalY) * progress;

        bubble.style.transform = `translate(${currentX - bubbleSize / 2}px, ${currentY - bubbleSize / 2}px) scale(${scale})`;
        bubble.style.opacity = opacity;
    });
}
```

**Purpose**: Animates bubbles from circular to vertical stacked layout.

**Interpolation**:
```javascript
current = original + (target - original) × progress
```
**Linear interpolation (lerp)** between original and target positions.

**Progress 0 (top of page)**:
- Bubbles in circle
- Full size (scale = 1)
- Full opacity

**Progress 1 (30% scroll)**:
- Bubbles in vertical line
- 70% size (scale = 0.7)
- 20% opacity

**Effect**: Smooth morphing animation as you scroll down.

### script.js:521-561 - Navigation & Menu

```javascript
function handleBubbleClick(index) {
    const project = projects[index];
    const projectSection = document.getElementById(project.id);
    if (projectSection) {
        projectSection.scrollIntoView({ behavior: 'smooth' });
    }
}
```

**Purpose**: Smooth scroll to project section when bubble clicked.

**Mobile Menu**:
```javascript
function setupMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
}
```

**Body Overflow Lock**: Prevents scrolling background content when menu is open.

### script.js:566-576 - Resize Handler

```javascript
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        bubbleContainer.innerHTML = '';
        bubbles = [];
        createBubbles();
    }, 250);
});
```

**Purpose**: Recalculates bubble positions on window resize.

**Debouncing**:
- Clears previous timeout on each resize event
- Only executes after 250ms of no resize events
- Prevents excessive recalculations during dragging

---

## Features Deep Dive

### 1. Bubble Navigation System

**How It Works**:

1. **Circular Layout**:
   - Projects arranged in perfect circle
   - Even spacing using trigonometry
   - Responsive radius calculation

2. **Scroll Animation**:
   - Morphs from circle to vertical stack
   - Simultaneous scale and opacity changes
   - Smooth lerp interpolation

3. **Click Navigation**:
   - Each bubble is clickable
   - Smooth scroll to corresponding project
   - Visual feedback on hover

**Technical Details**:

**Circle Positioning**:
```javascript
angle = startAngle + (index × angleStep)
x = centerX + radius × cos(angle)
y = centerY + radius × sin(angle)
```

**Responsive Behavior**:
- Container size adapts to viewport
- Bubble size scales with screen width
- Orbit radius adjusts automatically

### 2. Video Scrubbing Animation

**How It Works**:

1. **Scroll Container**: 300vh tall section creates scrollable area
2. **Sticky Video**: Video stays in viewport while scrolling through section
3. **Progress Calculation**: Measures scroll position through container
4. **Frame Seeking**: Sets `video.currentTime` based on progress

**Technical Implementation**:

```javascript
// Container: 300vh tall
// As user scrolls through 3× viewport heights:
scrollProgress = |rect.top| / (300vh - 100vh)
// 0.0 = top of section
// 0.5 = middle
// 1.0 = bottom

// Map to video duration
currentTime = scrollProgress × video.duration
```

**Advantages**:
- More engaging than autoplay
- User controls playback speed
- Works on mobile (no autoplay restrictions)
- Smooth, precise control

**Mobile Optimization**:
- Reduced to 200vh on mobile (shorter scroll)
- `object-fit: contain` shows full video
- `preload="metadata"` saves bandwidth

### 3. Responsive Design Strategy

**Breakpoint System**:

```
┌─────────────────┬──────────────┬─────────────┐
│   Desktop       │   Tablet     │   Mobile    │
│   > 900px       │ 768-900px    │  < 768px    │
├─────────────────┼──────────────┼─────────────┤
│ Full nav        │ Full nav     │ Hamburger   │
│ Large bubbles   │ Medium       │ Small       │
│ Grid layouts    │ Grid         │ Stacked     │
│ Wide margins    │ Medium       │ Narrow      │
└─────────────────┴──────────────┴─────────────┘
```

**Fluid Typography**:
```css
font-size: clamp(min, preferred, max)
```
Smoothly scales between breakpoints without jumps.

**Layout Adaptation**:
- **Desktop**: 2-column grids, side-by-side layouts
- **Tablet**: Same as desktop with tighter spacing
- **Mobile**: Single column, vertical stacking

### 4. Performance Optimizations

**1. RequestAnimationFrame Throttling**:
```javascript
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
});
```
Limits scroll handler to 60fps max.

**2. Lazy Loading**:
```html
<img loading="lazy">
```
Images load only when near viewport.

**3. CSS Transforms**:
```css
transform: translate(x, y) scale(s);
```
Uses GPU acceleration instead of `top/left` positioning.

**4. Efficient Selectors**:
- IDs for unique elements
- Classes for reusable styles
- Minimal specificity

**5. Video Preload**:
```html
<video preload="metadata">
```
Loads video info without full download on mobile.

---

## Mobile Responsiveness

### Touch Interactions

**1. Bubble Taps**:
- Touch target size: minimum 44×44px (iOS guidelines)
- Visual feedback on tap
- Prevents accidental activation

**2. Menu Toggle**:
- Large hamburger icon (24×24px + padding)
- Full-screen overlay for easy navigation
- Swipe-friendly spacing

**3. Scroll Performance**:
- Passive event listeners where possible
- Touch-action CSS for scroll optimization
- No scroll hijacking

### Mobile-Specific Features

**1. Video Unlock**:
```javascript
document.addEventListener('touchstart', unlockVideos, { once: true });
```
iOS requires user interaction before video playback.

**2. Viewport Height**:
```css
height: 100vh; /* May include address bar on mobile */
```
Accounts for dynamic browser chrome.

**3. Font Scaling**:
```css
font-size: clamp(1rem, 2vw, 1.5rem);
```
Responsive to screen width, not just breakpoints.

### Testing Checklist

- [ ] Touch targets ≥ 44px
- [ ] Horizontal scroll disabled
- [ ] Videos play on iOS Safari
- [ ] Menu accessible with one hand
- [ ] Text readable without zoom
- [ ] Images optimized for mobile bandwidth

---

## Performance Optimizations

### Critical Rendering Path

**1. Above-the-Fold Content**:
- Hero text renders immediately
- Navigation visible on load
- No layout shift

**2. Font Loading**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
```
Establishes early connection to font CDN.

**3. CSS First**:
- Styles in `<head>` block rendering
- JavaScript deferred until DOM ready
- Progressive enhancement

### Runtime Performance

**1. Scroll Optimization**:
- RAF throttling (60fps limit)
- Debounced resize handler
- Efficient selector queries

**2. Animation Performance**:
- CSS transforms (GPU accelerated)
- Opacity changes (GPU accelerated)
- No layout-triggering properties in loops

**3. Memory Management**:
- Event listener cleanup
- Temporary element removal
- Efficient data structures

### Network Optimization

**1. Image Optimization**:
- Appropriate formats (JPG for photos)
- Reasonable dimensions
- Lazy loading for below-fold

**2. Video Delivery**:
- GitHub Releases for CDN
- MP4/H.264 (universal support)
- Metadata preload on mobile

**3. Asset Caching**:
- Leverage browser cache
- Immutable filenames for versioning

---

## Customization Guide

### Adding a New Project

**Step 1**: Add to projects array in `script.js`:

```javascript
{
    id: 'new-project',
    title: 'New Project Name',
    category: 'Furniture Design',
    year: '2025',
    materials: 'Walnut, Brass',
    description: 'Your project description here...',
    videoSrc: 'path/to/video.mp4',
    imagePrefix: 'project7',
    imageCount: 5,
    galleryLayout: [
        { placeholder: 'Hero Image', class: '' },
        { placeholder: 'Detail 1', class: '' },
        { placeholder: 'Detail 2', class: '' },
        { placeholder: 'Detail 3', class: '' },
        { placeholder: 'Detail 4', class: '' }
    ]
}
```

**Step 2**: Add images to root folder:
- `project7-1.jpg`
- `project7-2.jpg`
- `project7-3.jpg`
- `project7-4.jpg`
- `project7-5.jpg`

**Step 3**: Upload video to GitHub Releases and update `videoSrc`.

**Step 4**: Reload page - bubble navigation updates automatically!

### Changing Colors

Edit CSS variables in `style.css`:

```css
:root {
    --color-bg: #YOUR_COLOR;        /* Background */
    --color-accent: #YOUR_COLOR;     /* Buttons, links */
    --color-text: #YOUR_COLOR;       /* Text */
}
```

**Color Palette Tools**:
- [Coolors.co](https://coolors.co)
- [Adobe Color](https://color.adobe.com)

### Changing Fonts

**Step 1**: Choose fonts at [Google Fonts](https://fonts.google.com)

**Step 2**: Update `<link>` in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap">
```

**Step 3**: Update CSS variables:
```css
:root {
    --font-display: 'Your Display Font', serif;
    --font-body: 'Your Body Font', sans-serif;
}
```

### Adjusting Bubble Layout

**Change orbit size**:
```css
:root {
    --bubble-orbit-multiplier: 0.45; /* Larger = bigger orbit */
    --bubble-min-orbit-radius: 180px; /* Minimum distance from center */
}
```

**Change bubble size**:
```css
.project-bubble {
    width: clamp(80px, 12vw, 120px); /* min, preferred, max */
    height: clamp(80px, 12vw, 120px);
}
```

### Modifying Scroll Animations

**Video scroll distance**:
```css
.frame-animation-container {
    height: 400vh; /* Longer scroll = slower video */
}
```

**Bubble animation speed**:
```javascript
const progress = Math.min(scrollY / (windowHeight * 0.5), 1);
// 0.5 = 50% of viewport height (slower)
// 0.3 = 30% of viewport height (faster)
```

---

## Browser Compatibility

### Supported Browsers

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Requires video unlock |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Requires playsinline |
| Android Chrome | 90+ | Full support |

### Known Issues

**Safari**:
- Video autoplay requires muted attribute
- May need user interaction to unlock videos

**iOS**:
- Videos must have `playsinline` attribute
- `webkit-playsinline` for older versions
- First touch unlocks video playback

**Internet Explorer**:
- Not supported (uses modern CSS features)

### Polyfills Not Required

Modern features used without fallbacks:
- CSS Grid
- CSS Custom Properties
- ES6 syntax (const, arrow functions, template literals)
- IntersectionObserver (optional enhancement)

---

## Troubleshooting

### Videos Not Playing

**Symptom**: Videos don't load or show black screen

**Solutions**:
1. Check video URL is accessible (open in new tab)
2. Verify MP4 format with H.264 codec
3. Ensure CORS headers if using external host
4. Check browser console for errors
5. Try incognito mode (disable extensions)

### Bubbles Overlap or Misaligned

**Symptom**: Bubbles positioned incorrectly

**Solutions**:
1. Refresh page to recalculate
2. Check all projects have valid data
3. Adjust `--bubble-orbit-multiplier` in CSS
4. Verify container has width/height
5. Clear browser cache

### Mobile Menu Not Opening

**Symptom**: Hamburger icon doesn't open menu

**Solutions**:
1. Check JavaScript loaded (browser console)
2. Verify `.mobile-menu` element exists
3. Check CSS for `.mobile-menu.open` styles
4. Test touch events in mobile view

### Scroll Animation Stuttering

**Symptom**: Choppy or laggy scrolling

**Solutions**:
1. Reduce video file sizes (under 5MB)
2. Lower video resolution (720p instead of 1080p)
3. Disable other browser extensions
4. Check CPU usage in DevTools Performance tab
5. Test on different device/browser

---

## Development Workflow

### Local Development

**Option 1: Python Server**
```bash
cd Portfolio
python -m http.server 8000
# Open http://localhost:8000
```

**Option 2: Live Server (VS Code)**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

**Option 3: Node.js**
```bash
npx serve
```

### Testing

**Manual Testing Checklist**:
- [ ] All bubbles clickable
- [ ] Videos scrub on scroll
- [ ] Mobile menu works
- [ ] Responsive breakpoints
- [ ] Contact links work
- [ ] Images load properly

**Browser Testing**:
- Chrome DevTools device emulation
- Firefox Responsive Design Mode
- Safari Technology Preview
- Real mobile devices

### Deployment

**GitHub Pages**:
1. Push to repository
2. Settings → Pages
3. Source: main branch
4. Custom domain: Add CNAME file

**Netlify**:
1. Connect GitHub repository
2. Build command: (none)
3. Publish directory: `/`

**Vercel**:
```bash
npm install -g vercel
vercel
```

---

## Code Quality

### Best Practices Implemented

**1. Semantic HTML**:
- Proper use of `<section>`, `<nav>`, `<footer>`
- ARIA labels for accessibility
- Descriptive alt text

**2. CSS Organization**:
- CSS variables for theming
- Logical grouping of styles
- Mobile-first approach
- BEM-like naming convention

**3. JavaScript Patterns**:
- Const/let over var
- Arrow functions
- Template literals
- Array methods (map, forEach)
- Event delegation
- RAF optimization

**4. Accessibility**:
- Keyboard navigation support
- ARIA labels on buttons
- Sufficient color contrast
- Focus visible styles
- Screen reader friendly

**5. Performance**:
- Lazy loading images
- Efficient selectors
- Debounced resize
- RAF throttled scroll
- Minimal reflows

### Code Comments

**When to Comment**:
- Complex algorithms (orbit calculation)
- Browser-specific workarounds (iOS video unlock)
- Non-obvious optimizations (RAF throttling)

**When Not to Comment**:
- Self-explanatory code
- Redundant descriptions
- Outdated information

---

## Future Enhancements

### Potential Features

**1. Project Filtering**:
```javascript
// Filter by category
const filteredProjects = projects.filter(p => p.category === 'Furniture Design');
```

**2. Lightbox Gallery**:
- Click image to view full-screen
- Swipe between images
- Close with ESC or click outside

**3. Smooth Page Transitions**:
- Fade between sections
- Use `transition-overlay` element

**4. Preload Videos**:
```javascript
// Preload next video on scroll
const nextVideo = videoAnimations[currentIndex + 1];
if (nextVideo && !nextVideo.isLoaded) {
    nextVideo.video.load();
}
```

**5. Analytics Integration**:
```javascript
// Track bubble clicks
bubble.addEventListener('click', () => {
    gtag('event', 'bubble_click', { project: project.title });
});
```

**6. Dark Mode Toggle**:
```css
[data-theme="dark"] {
    --color-bg: var(--color-charcoal);
    --color-text: var(--color-cream);
}
```

---

## Glossary

**Terms Used**:

- **RAF**: RequestAnimationFrame - Browser API for smooth animations
- **Lerp**: Linear interpolation - Smooth transition between two values
- **Clamp**: CSS function limiting value between min and max
- **vh/vw**: Viewport height/width units (1vh = 1% of viewport)
- **GPU**: Graphics Processing Unit - Hardware acceleration for transforms
- **CORS**: Cross-Origin Resource Sharing - Security for external resources
- **Debounce**: Delay function execution until after events stop firing
- **Throttle**: Limit function execution to fixed rate
- **Sticky**: CSS positioning that switches between relative and fixed

---

## Credits & License

**Design & Development**: Sino
**Education**: OCAD University
**Location**: Toronto, Ontario

**Technologies**:
- Google Fonts (Cormorant Garamond, DM Sans)
- GitHub Pages for hosting
- GitHub Releases for video CDN

**License**: All rights reserved © 2025 Sino designs

---

## Support & Contact

**Questions?** Email: sinan.almis@gmail.com

**Found a bug?** Check the troubleshooting section or contact directly.

**Want to collaborate?** Reach out via the contact form on the website.

---

*Last updated: 2025-12-23*
*Version: 1.0.0*
