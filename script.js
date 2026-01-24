// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
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
});

// Cookie Consent Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    
    // Show cookie consent if not already accepted
    if (!localStorage.getItem('cookieAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }
    
    // Handle accept button click
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieAccepted', 'true');
        cookieConsent.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            cookieConsent.style.display = 'none';
        }, 300);
    });
});

// CTA Button Navigation
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', function() {
        window.location.href = 'projects.html';
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
});

// Scroll Animation for Elements
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .about-text, .contact-info, .contact-form');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Navbar Background on Scroll - Keep black consistently
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    // Keep the same black styling when scrolling
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.backdropFilter = 'blur(15px)';
    }
});

// Add loading class removal for initial page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add staggered animation to hero content
    setTimeout(() => {
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.classList.add('fade-in');
        }
    }, 200);
});

// Removed parallax effect to fix scrolling bugs

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced form validation
function validateContactForm(form) {
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();
    
    if (!name) {
        alert('Please enter your name.');
        return false;
    }
    
    if (!email) {
        alert('Please enter your email address.');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!message) {
        alert('Please enter your message.');
        return false;
    }
    
    if (message.length < 10) {
        alert('Please enter a more detailed message (at least 10 characters).');
        return false;
    }
    
    return true;
}

// Update form submission with enhanced validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateContactForm(contactForm)) {
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you within 24 hours.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 1500);
    });
});

// Gallery Modal System
const galleryData = {
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
    'family-renovation': {
        title: 'Single Family Renovation',
        images: [
            'images/projects/family-renovation/singlefam.jpg',
            'images/projects/family-renovation/singlefam2.jpg',
            'images/projects/family-renovation/singlefam4.jpg'
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
    'customized-adu': {
        title: 'Customized ADU',
        images: [
            'images/projects/single-family-adu/adu.jpg',
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

let currentGallery = null;
let currentImageIndex = 0;

// Gallery Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryModal = document.getElementById('galleryModal');
    const galleryOverlay = document.getElementById('galleryOverlay');
    const galleryClose = document.getElementById('galleryClose');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryImage = document.getElementById('galleryImage');
    const galleryCounter = document.getElementById('galleryCounter');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    
    // Open gallery when project is clicked (exclude homepage projects)
    const projectItems = document.querySelectorAll('.project-item:not(.homepage-project), .project-card');
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectKey = this.getAttribute('data-project');
            openGallery(projectKey);
        });
    });
    
    // Close gallery functions
    function closeGallery() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    galleryClose.addEventListener('click', closeGallery);
    galleryOverlay.addEventListener('click', closeGallery);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
            closeGallery();
        }
    });
    
    // Open gallery function
    function openGallery(projectKey) {
        if (!galleryData[projectKey]) return;
        
        currentGallery = galleryData[projectKey];
        currentImageIndex = 0;
        
        galleryTitle.textContent = currentGallery.title;
        updateGalleryImage();
        createThumbnails();
        
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Update gallery image
    function updateGalleryImage() {
        if (!currentGallery) return;
        
        galleryImage.src = currentGallery.images[currentImageIndex];
        galleryCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.images.length}`;
        
        // Update thumbnail active state
        const thumbnails = galleryThumbnails.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }
    
    // Create thumbnails
    function createThumbnails() {
        if (!currentGallery) return;
        
        galleryThumbnails.innerHTML = '';
        
        currentGallery.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail';
            thumbnail.style.backgroundImage = `url(${image})`;
            thumbnail.addEventListener('click', () => {
                currentImageIndex = index;
                updateGalleryImage();
            });
            
            galleryThumbnails.appendChild(thumbnail);
        });
    }
    
    // Navigation buttons
    galleryPrev.addEventListener('click', function() {
        if (!currentGallery) return;
        
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentGallery.images.length - 1;
        updateGalleryImage();
    });
    
    galleryNext.addEventListener('click', function() {
        if (!currentGallery) return;
        
        currentImageIndex = currentImageIndex < currentGallery.images.length - 1 ? currentImageIndex + 1 : 0;
        updateGalleryImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!galleryModal.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            galleryPrev.click();
        } else if (e.key === 'ArrowRight') {
            galleryNext.click();
        }
    });
});
