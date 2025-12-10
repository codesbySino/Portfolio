// Project Data Configuration
// Add your projects here - the system will automatically calculate bubble positions
const projects = [
    {
        id: 'laid-back-nightstand',
        title: 'Laid Back Nightstand',
        category: 'Furniture Design',
        year: '2025',
        materials: 'Maple, Glass',
        description: 'A minimalist nightstand inspired by Danish mid-century modern design. The piece features clean lines, thoughtful proportions, and a harmonious blend of solid maple and tempered glass. Each detail was carefully considered to create a functional yet aesthetically refined piece.',
        videoSrc: 'videos/laid-back-nightstand/video.mp4', // Path to video file
        galleryImages: [
            { src: '', placeholder: 'Front View', class: '' },
            { src: '', placeholder: 'Detail Shot', class: '' },
            { src: '', placeholder: 'In Context', class: 'wide' },
            { src: '', placeholder: 'Construction', class: '' },
            { src: '', placeholder: 'Materials', class: '' }
        ]
    },
    {
        id: 'minimalist-side-table',
        title: 'Minimalist Side Table',
        category: 'Furniture Design',
        year: '2025',
        materials: 'Walnut',
        description: 'A study in simplicity and proportion. This side table explores the essence of form, stripping away the unnecessary to reveal the beauty of honest construction and quality materials.',
        videoSrc: ['videos/minimalist-side-table/video.mov', 'videos/minimalist-side-table/video.mp4'],
        galleryImages: [
            { src: '', placeholder: 'Overview', class: '' },
            { src: '', placeholder: 'Joinery Detail', class: 'tall' },
            { src: '', placeholder: 'Top View', class: '' },
            { src: '', placeholder: 'Process', class: 'wide' }
        ]
    },
    {
        id: 'dual-compartment-frame',
        title: 'Dual Compartment Frame',
        category: 'Product Design',
        year: '2024',
        materials: 'Reclaimed Urban Wood',
        description: 'Created during my internship at Just Be Woodsy, this dual-compartment picture frame transforms reclaimed urban trees into meaningful objects.',
        videoSrc: ['videos/dual-compartment-frame/video.mov', 'videos/dual-compartment-frame/video.mp4'],
        galleryImages: [
            { src: '', placeholder: 'Final Product', class: 'wide' },
            { src: '', placeholder: 'Wood Selection', class: '' },
            { src: '', placeholder: 'Manufacturing', class: '' },
            { src: '', placeholder: 'Detail', class: '' }
        ]
    },
    {
        id: 'project-four',
        title: 'Project Four',
        category: 'Furniture Design',
        year: '2025',
        materials: 'Oak, Steel',
        description: 'Add your project description here. Describe the design intent, materials used, and the story behind the piece.',
        videoSrc: ['videos/project4/video.mov', 'videos/project4/video.mp4'],
        galleryImages: [
            { src: '', placeholder: 'Image 1', class: '' },
            { src: '', placeholder: 'Image 2', class: '' },
            { src: '', placeholder: 'Image 3', class: '' }
        ]
    },
    {
        id: 'project-five',
        title: 'Project Five',
        category: 'Furniture Design',
        year: '2025',
        materials: 'Ash, Brass',
        description: 'Add your project description here. Describe the design intent, materials used, and the story behind the piece.',
        videoSrc: ['videos/project5/video.mov', 'videos/project5/video.mp4'],
        galleryImages: [
            { src: '', placeholder: 'Image 1', class: '' },
            { src: '', placeholder: 'Image 2', class: '' },
            { src: '', placeholder: 'Image 3', class: 'wide' }
        ]
    }
];

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

// Initialize
function init() {
    createBubbles();
    createProjectSections();
    setupScrollAnimations();
    setupMobileMenu();
    setupNavigation();
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
                    ${project.galleryImages.map(img => `
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
    video.preload = 'auto';
    video.controls = false;  // No controls - scroll driven
    video.style.zIndex = '10';
    
    // Handle single or multiple video sources
    const videoSources = Array.isArray(project.videoSrc) ? project.videoSrc : [project.videoSrc];
    
    videoSources.forEach(src => {
        const source = document.createElement('source');
        source.src = src;
        source.type = src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4';
        video.appendChild(source);
    });
    
    frameDisplay.appendChild(video);

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
    
    // Fallback: hide loading after 3 seconds anyway
    setTimeout(() => {
        hideLoading();
    }, 3000);

    // Error handling
    video.addEventListener('error', (e) => {
        console.error(`Video ${index} error:`, e);
        hideLoading();
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
