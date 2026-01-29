// Projects Page Gallery Integration with Centralized Image Configuration
// This file handles project gallery functionality using data from image-config.js

let currentProjectGallery = null;
let currentProjectImageIndex = 0;

// Expose to window scope for carousel integration
window.currentProjectGallery = null;

// Projects Gallery Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the projects page
    if (!document.querySelector('.projects-page')) return;
    
    // Wait for ImageConfig to be available
    if (!window.ImageConfig) {
        console.error('ImageConfig not available. Make sure image-config.js is loaded first.');
        return;
    }
    
    // Override the main gallery data with projects data when on projects page
    window.galleryData = window.ImageConfig.IMAGE_CONFIG.projects;
    console.log('Gallery data overridden with centralized projects data:', window.galleryData);
    
    // Prevent script.js gallery from initializing by marking it as already initialized
    window.galleryInitialized = true;
    
    const galleryModal = document.getElementById('galleryModal');
    const galleryOverlay = document.getElementById('galleryOverlay');
    const galleryClose = document.getElementById('galleryClose');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryImage = document.getElementById('galleryImage');
    const galleryCounter = document.getElementById('galleryCounter');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    
    // Remove any existing gallery event listeners
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Clone node to remove all existing event listeners
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
    });
    
    // Open gallery when project card is clicked
    const newProjectCards = document.querySelectorAll('.project-card');
    newProjectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const projectKey = this.getAttribute('data-project');
            console.log('Clicked project:', projectKey);
            openProjectGallery(projectKey);
        });
    });
    
    // Close gallery functions
    function closeProjectGallery() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (galleryClose) galleryClose.addEventListener('click', closeProjectGallery);
    if (galleryOverlay) galleryOverlay.addEventListener('click', closeProjectGallery);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('active')) {
            closeProjectGallery();
        }
    });
    
    // Open gallery function
    function openProjectGallery(projectKey) {
        console.log('OpenProjectGallery called with key:', projectKey);
        
        if (!window.ImageConfig) {
            console.error('ImageConfig not available');
            return;
        }
        
        const projectData = window.ImageConfig.getProjectData(projectKey);
        if (!projectData) {
            console.log('Project not found:', projectKey);
            return;
        }
        
        // Build currentProjectGallery object with full image paths
        currentProjectGallery = {
            title: projectData.title,
            description: projectData.description,
            location: projectData.location,
            images: window.ImageConfig.getProjectGallery(projectKey)
        };
        
        window.currentProjectGallery = currentProjectGallery; // Expose for carousel
        currentProjectImageIndex = 0;
        
        console.log('Opening gallery for:', currentProjectGallery.title);
        console.log('Images:', currentProjectGallery.images);
        
        if (galleryTitle) galleryTitle.textContent = currentProjectGallery.title;
        
        // Update description
        const galleryDescription = document.getElementById('galleryDescription');
        if (galleryDescription) {
            if (currentProjectGallery.description) {
                galleryDescription.innerHTML = `<p>${currentProjectGallery.description}</p>`;
            } else {
                galleryDescription.innerHTML = '<p>This project showcases our commitment to innovative design and quality craftsmanship. Each detail has been carefully considered to create a space that exceeds expectations.</p>';
            }
        }
        
        updateProjectGalleryImage();
        createProjectThumbnails();
        
        if (galleryModal) {
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Update gallery image
    function updateProjectGalleryImage() {
        if (!currentProjectGallery || !galleryImage || !galleryCounter) return;
        
        galleryImage.src = currentProjectGallery.images[currentProjectImageIndex];
        galleryCounter.textContent = `${currentProjectImageIndex + 1} / ${currentProjectGallery.images.length}`;
        
        // Update thumbnail active state
        const thumbnails = galleryThumbnails ? galleryThumbnails.querySelectorAll('.gallery-thumbnail') : [];
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentProjectImageIndex);
        });
    }
    
    // Create thumbnails
    function createProjectThumbnails() {
        if (!currentProjectGallery || !galleryThumbnails) return;
        
        console.log('Creating thumbnails for:', currentProjectGallery.title);
        console.log('Thumbnail container:', galleryThumbnails);
        
        galleryThumbnails.innerHTML = '';
        
        currentProjectGallery.images.forEach((image, index) => {
            console.log('Creating thumbnail for image:', image);
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail';
            thumbnail.style.backgroundImage = `url("${image}")`;
            thumbnail.style.backgroundSize = 'cover';
            thumbnail.style.backgroundPosition = 'center';
            thumbnail.style.backgroundRepeat = 'no-repeat';
            thumbnail.addEventListener('click', () => {
                currentProjectImageIndex = index;
                updateProjectGalleryImage();
            });
            
            galleryThumbnails.appendChild(thumbnail);
            console.log('Thumbnail added:', thumbnail);
        });
        
        console.log('Total thumbnails created:', galleryThumbnails.children.length);
    }
    
    // Navigation buttons
    if (galleryPrev) {
        galleryPrev.addEventListener('click', function() {
            if (!currentProjectGallery) return;
            
            currentProjectImageIndex = currentProjectImageIndex > 0 
                ? currentProjectImageIndex - 1 
                : currentProjectGallery.images.length - 1;
            updateProjectGalleryImage();
        });
    }
    
    if (galleryNext) {
        galleryNext.addEventListener('click', function() {
            if (!currentProjectGallery) return;
            
            currentProjectImageIndex = currentProjectImageIndex < currentProjectGallery.images.length - 1 
                ? currentProjectImageIndex + 1 
                : 0;
            updateProjectGalleryImage();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!galleryModal || !galleryModal.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            if (galleryPrev) galleryPrev.click();
        } else if (e.key === 'ArrowRight') {
            if (galleryNext) galleryNext.click();
        }
    });
});

// Mobile Navigation for Projects Page
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
