// Projects Page Gallery Data
const projectsGalleryData = {
    'wellness-club': {
        title: 'Hume Luxury Wellness Club',
        images: [
            'images/projects/joshua-tree/joshua.jpg'
        ]
    },
    'joshua-tree': {
        title: 'Joshua Tree Vacation Home',
        images: [
            'images/projects/joshua-tree/joshua.jpg',
            'images/projects/joshua-tree/joshua2.jpg',
            'images/projects/joshua-tree/joshua3.jpg',
            'images/projects/joshua-tree/joshua4.jpg',
            'images/projects/joshua-tree/joshua5.jpg'
        ]
    },
    'single-family-adu': {
        title: 'Single Family + ADU',
        images: [
            'images/projects/single-family-adu/adu.jpg'
        ]
    },
    'luxury-expansion': {
        title: 'Luxury Single Family Expansion',
        images: [
            'images/projects/luxury-expansion/luxury single fam.jpg'
        ]
    },
    'multi-apartment': {
        title: 'Multi-Unit Apartment',
        images: [
            'images/projects/multi-apartment/multiapt.jpg'
        ]
    },
    'multi-condo': {
        title: 'Multi-Unit Condo',
        images: [
            'images/projects/multi-condo/multi-unit.jpg',
            'images/projects/multi-condo/multi2.jpg',
            'images/projects/multi-condo/multi3.jpg',
            'images/projects/multi-condo/multi4.jpg',
            'images/projects/multi-condo/multi5.jpg'
        ]
    },
    'family-renovation': {
        title: 'Single Family Renovation',
        images: [
            'images/projects/family-renovation/singlefam.jpg',
            'images/projects/family-renovation/singlefam2.jpg',
            'images/projects/family-renovation/singlefam4.jpg'
        ]
    },
    'customized-adu': {
        title: 'Customized ADU',
        images: [
            'images/projects/customized-adu/adu2.jpg',
            'images/projects/customized-adu/adu3.jpg',
            'images/projects/customized-adu/adu4.jpg'
        ]
    },
    'tenant-improvement': {
        title: 'Tenant Improvement',
        images: [
            'images/projects/tenant-improvement/dessert.jpg',
            'images/projects/tenant-improvement/dessert2.jpg'
        ]
    }
};

let currentProjectGallery = null;
let currentProjectImageIndex = 0;

// Projects Gallery Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the projects page
    if (!document.querySelector('.projects-page')) return;
    
    const galleryModal = document.getElementById('galleryModal');
    const galleryOverlay = document.getElementById('galleryOverlay');
    const galleryClose = document.getElementById('galleryClose');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryImage = document.getElementById('galleryImage');
    const galleryCounter = document.getElementById('galleryCounter');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    
    // Open gallery when project card is clicked
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectKey = this.getAttribute('data-project');
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
        if (!projectsGalleryData[projectKey]) return;
        
        currentProjectGallery = projectsGalleryData[projectKey];
        currentProjectImageIndex = 0;
        
        if (galleryTitle) galleryTitle.textContent = currentProjectGallery.title;
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
        
        galleryThumbnails.innerHTML = '';
        
        currentProjectGallery.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail';
            thumbnail.style.backgroundImage = `url(${image})`;
            thumbnail.addEventListener('click', () => {
                currentProjectImageIndex = index;
                updateProjectGalleryImage();
            });
            
            galleryThumbnails.appendChild(thumbnail);
        });
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
