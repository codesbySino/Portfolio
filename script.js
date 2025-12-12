// Project Data Configuration
// Add your projects here - the system will automatically calculate bubble positions
const projects = [
    {
        id: 'chai-table-set',
        title: 'Chai Table Set',
        category: 'Furniture Design',
        year: '2025',
        materials: 'Maple, Glass',
        description: 'A minimalist nightstand inspired by Danish mid-century modern design. The piece features clean lines, thoughtful proportions, and a harmonious blend of solid maple and tempered glass. Each detail was carefully considered to create a functional yet aesthetically refined piece.',
        videoSrc: 'https://github.com/codesbySino/Portfolio/releases/download/v1/project1.mp4', // Path to video file
        imagePrefix: 'project1', // Prefix for image files (project1-1.jpg, project1-2.jpg, etc.)
        imageCount: 5, // Number of images (just update this number when you add more!)
        galleryLayout: [
            { placeholder: 'Front View', class: '' },
            { placeholder: 'Detail Shot', class: '' },
            { placeholder: 'In Context', class: 'wide', extension: 'JPG' }, // Uppercase for this image
            { placeholder: 'Construction', class: '', extension: 'JPG' }, // Uppercase for this image
            { placeholder: 'Materials', class: '' }
        ]
    },
    {
        id: 'laid-back-nightstand',
        title: 'Laid Back Nightstand',
        category: 'Furniture Design',
        year: '2025',
        materials: 'Walnut',
        description: 'A study in simplicity and proportion. This side table explores the essence of form, stripping away the unnecessary to reveal the beauty of honest construction and quality materials.',
        videoSrc: 'https://github.com/codesbySino/Portfolio/releases/download/v1/project2.mp4',
        imagePrefix: 'project2',
        imageCount: 4, // Updated: ready for project2-1.jpg through project2-4.jpg
        galleryLayout: [
            { placeholder: 'Overview', class: '' },
            { placeholder: 'Joinery Detail', class: 'tall' },
            { placeholder: 'Top View', class: '' },
            { placeholder: 'Process', class: 'wide' }
        ]
    },
    {
        id: 'christophers-mugs',
        title: 'Christopher\'s Mugs',
        category: 'Product Design',
        year: '2024',
        materials: 'Reclaimed Urban Wood',
        description: 'Created during my internship at Just Be Woodsy, this dual-compartment picture frame transforms reclaimed urban trees into meaningful objects.',
        videoSrc: 'https://github.com/codesbySino/Portfolio/releases/download/v1/project3.mp4',
        imagePrefix: 'project3',
        imageCount: 4, // Updated: ready for project3-1.jpg through project3-4.jpg
        galleryLayout: [
            { placeholder: 'Final Product', class: 'wide' },
            { placeholder: 'Wood Selection', class: '' },
            { placeholder: 'Manufacturing', class: '' },
            { placeholder: 'Detail', class: '' }
        ]
    },
    {
        id: 'a-bookshelf',
        title: 'A Bookshelf',
        category: 'Furniture Design',
        year: '2025',
        materials: 'Oak, Steel',
        description: 'Add your project description here. Describe the design intent, materials used, and the story behind the piece.',
        videoSrc: 'https://github.com/codesbySino/Portfolio/releases/download/v1/project4.mp4',
        imagePrefix: 'project4',
        imageCount: 3, // Updated: ready for project4-1.jpg through project4-3.jpg
        galleryLayout: [
            { placeholder: 'Image 1', class: '' },
            { placeholder: 'Image 2', class: '' },
            { placeholder: 'Image 3', class: '' }
        ]
    },
    {
        id: 'mushroom-glass-lamp',
        title: 'Mushroom Glass Lamp',
        category: 'Furniture Design',
        year: '2025',
        materials: 'Ash, Brass',
        description: 'Add your project description here. Describe the design intent, materials used, and the story behind the piece.',
        videoSrc: 'https://github.com/codesbySino/Portfolio/releases/download/v1/project5.mp4',
        imagePrefix: 'project5',
        imageCount: 3, // Updated: ready for project5-1.jpg through project5-3.jpg
        galleryLayout: [
            { placeholder: 'Image 1', class: '' },
            { placeholder: 'Image 2', class: '' },
            { placeholder: 'Image 3', class: 'wide' }
        ]
    },
    {
        id: 'orbit-chair',
        title: 'Orbit Chair',
        category: 'Furniture Design',
        year: '2025',
        materials: 'Walnut, Leather',
        description: 'Add your project description here. Describe the design intent, materials used, and the story behind the piece.',
        videoSrc: 'https://github.com/codesbySino/Portfolio/releases/download/v1/project6.mp4',
        imagePrefix: 'project6',
        imageCount: 3, // Updated: ready for project6-1.jpg through project6-3.jpg
        galleryLayout: [
            { placeholder: 'Image 1', class: '' },
            { placeholder: 'Image 2', class: '' },
            { placeholder: 'Image 3', class: '' }
        ]
    }
];

// Helper function to generate gallery images dynamically
function getGalleryImages(project) {
    if (!project.imagePrefix || !project.galleryLayout) {
        return [];
    }

    // Default extension, can be overridden per project
    const defaultExtension = project.imageExtension || 'jpg';

    // Custom extensions per image (if specified in galleryLayout)
    return project.galleryLayout.map((layout, index) => {
        const imageNumber = index + 1;

        // Use custom extension if specified, otherwise use default
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

// DOM Elements
const bubbleContainer = document.getElementById('bubbleContainer');
const projectSectionsContainer = document.getElementById('projectSections');
const heroText = document.querySelector('.hero-text');
const scrollIndicator = document.querySelector('.scroll-indicator');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

// State
let bubbles = [];
let hasScrolled = false;
let videoAnimations = [];
let videosUnlocked = false;

// Initialize
function init() {
    createBubbles();
    createProjectSections();
    setupScrollAnimations();
    setupMobileMenu();
    setupNavigation();
    setupMobileVideoUnlock();
}

// Mobile: Unlock videos on first user interaction (required for iOS)
function setupMobileVideoUnlock() {
    const unlockVideos = () => {
        if (videosUnlocked) return;
        videosUnlocked = true;

        videoAnimations.forEach((anim) => {
            // Try to play and immediately pause to "unlock" the video
            const playPromise = anim.video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    anim.video.pause();
                    anim.video.currentTime = 0;
                }).catch(() => {
                    // Autoplay was prevented, but that's okay
                });
            }
        });

        // Remove listeners after unlock
        document.removeEventListener('touchstart', unlockVideos);
        document.removeEventListener('click', unlockVideos);
    };

    document.addEventListener('touchstart', unlockVideos, { once: true });
    document.addEventListener('click', unlockVideos, { once: true });
}

// Create project bubbles with dynamic circular positioning
function createBubbles() {
    const centerX = bubbleContainer.offsetWidth / 2;
    const centerY = bubbleContainer.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) * 0.7;
    const angleStep = (2 * Math.PI) / projects.length;
    const startAngle = -Math.PI / 2;

    projects.forEach((project, index) => {
        const angle = startAngle + (index * angleStep);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const bubble = document.createElement('div');
        bubble.className = 'project-bubble';
        bubble.dataset.index = index;
        bubble.dataset.originalX = x;
        bubble.dataset.originalY = y;
        bubble.innerHTML = `
            <div class="bubble-content">
                <span class="bubble-number">${String(index + 1).padStart(2, '0')}</span>
                <span class="bubble-title">${project.title.split(' ').slice(0, 2).join(' ')}</span>
            </div>
        `;

        // Position bubble using transform for better performance
        const bubbleSize = window.innerWidth <= 768 ? 80 : 120;
        bubble.style.position = 'absolute';
        bubble.style.transform = `translate(${x - bubbleSize / 2}px, ${y - bubbleSize / 2}px)`;
        bubble.addEventListener('click', () => handleBubbleClick(index));
        
        bubbleContainer.appendChild(bubble);
        bubbles.push(bubble);
    });
}

// Create project sections with frame animations
function createProjectSections() {
    projects.forEach((project, index) => {
        const section = document.createElement('section');
        section.className = 'project-section';
        section.id = project.id;
        section.innerHTML = `
            <!-- Video Container -->
            <div class="frame-animation-container" data-project-index="${index}">
                <div class="frame-sticky">
                    <div class="frame-display" id="frameDisplay${index}">
                        <div class="frame-loading">
                            <div class="frame-loading-spinner"></div>
                            <span>Loading video...</span>
                        </div>
                        <!-- Video will be loaded here -->
                    </div>
                    <div class="project-title-overlay">
                        <span>${project.category}</span>
                        <h2>${project.title}</h2>
                    </div>
                </div>
            </div>

            <!-- Project Content -->
            <div class="project-content">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <div class="project-meta">
                        <div class="meta-item">
                            <span class="meta-label">Year</span>
                            <span class="meta-value">${project.year}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Category</span>
                            <span class="meta-value">${project.category}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Materials</span>
                            <span class="meta-value">${project.materials}</span>
                        </div>
                    </div>
                    <p class="project-description">${project.description}</p>
                </div>
                <div class="project-gallery">
                    ${getGalleryImages(project).map(img => `
                        <div class="gallery-item ${img.class}">
                            ${img.src ? `<img src="${img.src}" alt="${img.placeholder}" loading="lazy">` : `<div class="gallery-placeholder">${img.placeholder}</div>`}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        projectSectionsContainer.appendChild(section);

        // Initialize video animation for this project
        initVideoAnimation(index, project);
    });
}

// Initialize video animation for a project
function initVideoAnimation(index, project) {
    const frameDisplay = document.getElementById(`frameDisplay${index}`);
    const container = document.querySelector(`.frame-animation-container[data-project-index="${index}"]`);

    // Create video element
    const video = document.createElement('video');
    video.id = `video${index}`;
    video.className = 'project-video';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata'; // Use metadata for mobile (less data)
    video.controls = false;
    // Note: crossOrigin removed - GitHub releases don't support CORS
    video.style.zIndex = '10';

    // iOS Safari compatibility
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    // Add video source
    const source = document.createElement('source');
    source.src = project.videoSrc;
    source.type = 'video/mp4';
    video.appendChild(source);

    frameDisplay.appendChild(video);

    // Explicitly load video (important for mobile)
    video.load();

    // Remove loading indicator
    let loaded = false;
    
    const hideLoading = () => {
        if (!loaded) {
            loaded = true;
            const loading = frameDisplay.querySelector('.frame-loading');
            if (loading) loading.style.display = 'none';
        }
    };

    // Try different events to detect when video is ready
    video.addEventListener('loadedmetadata', hideLoading);
    video.addEventListener('canplay', hideLoading);
    video.addEventListener('durationchange', hideLoading);
    
    // Fallback: hide loading after 3 seconds anyway
    setTimeout(() => {
        hideLoading();
    }, 3000);

    // Error handling with user-visible feedback
    video.addEventListener('error', () => {
        // Show user-friendly error message
        const loading = frameDisplay.querySelector('.frame-loading');
        if (loading) {
            loading.innerHTML = `
                <div class="frame-error">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>Video unavailable</span>
                </div>
            `;
            loading.style.display = 'flex';
        }
    });

    videoAnimations.push({
        container,
        video,
        isLoaded: false
    });
}

// Setup scroll animations
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

// Handle scroll events
function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Homepage bubble animation
    if (scrollY < windowHeight) {
        const progress = Math.min(scrollY / (windowHeight * 0.3), 1);
        animateBubbles(progress);
        
        // Fade hero text and scroll indicator
        if (progress > 0 && !hasScrolled) {
            hasScrolled = true;
            heroText.classList.add('hidden');
            scrollIndicator.classList.add('hidden');
        } else if (progress === 0 && hasScrolled) {
            hasScrolled = false;
            heroText.classList.remove('hidden');
            scrollIndicator.classList.remove('hidden');
        }
    }

    // Video animations - scrub through video on scroll
    videoAnimations.forEach((anim) => {
        const rect = anim.container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const containerHeight = anim.container.offsetHeight;
        const scrollableHeight = containerHeight - windowHeight;
        
        // Try to get duration, set isLoaded when duration is available
        if (anim.video.duration > 0 && !anim.isLoaded) {
            anim.isLoaded = true;
        }
        
        // Always try to scrub if we're in view, even if still loading
        if (rect.top <= 0 && rect.bottom >= 0) {
            // Calculate scroll progress through this section
            const scrollProgress = scrollableHeight > 0 ? Math.abs(rect.top) / scrollableHeight : 0;
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
            
            // Set video time based on scroll position if duration is available
            if (anim.video.duration > 0) {
                try {
                    anim.video.currentTime = clampedProgress * anim.video.duration;
                } catch (e) {
                    // Video might not be ready yet
                }
            }
        }
    });
}

// Animate bubbles from circular to vertical arrangement
function animateBubbles(progress) {
    const centerX = bubbleContainer.offsetWidth / 2;
    const centerY = bubbleContainer.offsetHeight / 2;
    const bubbleSize = window.innerWidth <= 768 ? 80 : 120;
    const verticalSpacing = bubbleSize + 20;
    const scale = 1 - progress * 0.3;
    const opacity = 1 - (progress * 0.8);

    bubbles.forEach((bubble, index) => {
        const originalX = parseFloat(bubble.dataset.originalX);
        const originalY = parseFloat(bubble.dataset.originalY);
        
        // Calculate target position (vertical arrangement 1,2,3,4,5 from top to bottom)
        const targetX = centerX;
        const targetY = (index * verticalSpacing) + bubbleSize;

        // Interpolate position
        const currentX = originalX + (targetX - originalX) * progress;
        const currentY = originalY + (targetY - originalY) * progress;

        bubble.style.transform = `translate(${currentX - bubbleSize / 2}px, ${currentY - bubbleSize / 2}px) scale(${scale})`;
        bubble.style.opacity = opacity;
    });
}

// Handle bubble click - jump to project
function handleBubbleClick(index) {
    const project = projects[index];
    const projectSection = document.getElementById(project.id);
    
    if (projectSection) {
        projectSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Setup mobile menu
function setupMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', closeMobileMenu);

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

// Setup smooth navigation
function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);

// Handle resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate bubble positions
        bubbleContainer.innerHTML = '';
        bubbles = [];
        createBubbles();
    }, 250);
});
