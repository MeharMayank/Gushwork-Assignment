// Complete JavaScript for HDPE Pipes Website
// Automatic carousel with proper layout matching Figma design

// Array of carousel images
const carouselImages = [
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=600&h=450&fit=crop'
];

// Variables for carousel
let currentImageIndex = 0;
let carouselInterval;

// Track scroll position for sticky header
let lastScrollPosition = 0;

// Get DOM elements
const stickyHeader = document.getElementById('sticky-header');
const carouselImage = document.getElementById('carousel-image');
const zoomPreview = document.getElementById('zoom-preview');
const indicators = document.querySelectorAll('.indicator');

// STICKY HEADER FUNCTIONALITY
// Shows header when scrolling down, hides when scrolling up
window.addEventListener('scroll', function() {
    const currentScrollPosition = window.pageYOffset;
    
    // Show sticky header when scrolling down past 150px
    if (currentScrollPosition > 150 && currentScrollPosition > lastScrollPosition) {
        stickyHeader.classList.add('visible');
    }
    // Hide when scrolling up or near top
    else if (currentScrollPosition < lastScrollPosition || currentScrollPosition < 100) {
        stickyHeader.classList.remove('visible');
    }
    
    // Update last position for next comparison
    lastScrollPosition = currentScrollPosition;
});

// AUTOMATIC CAROUSEL FUNCTIONALITY
// Function to update carousel image and active indicator
function updateCarousel() {
    // Change the main image with smooth transition
    carouselImage.style.opacity = '0';
    
    setTimeout(() => {
        carouselImage.src = carouselImages[currentImageIndex];
        carouselImage.style.opacity = '1';
    }, 200);
    
    // Update active indicator
    indicators.forEach((indicator, index) => {
        if (index === currentImageIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Function to go to next image
function nextImage() {
    currentImageIndex++;
    // Loop back to first image if we reach the end
    if (currentImageIndex >= carouselImages.length) {
        currentImageIndex = 0;
    }
    updateCarousel();
}

// Start automatic carousel
function startCarousel() {
    carouselInterval = setInterval(nextImage, 4000); // Change image every 4 seconds
}

// Stop automatic carousel
function stopCarousel() {
    clearInterval(carouselInterval);
}

// Indicator click handlers
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
        currentImageIndex = index;
        updateCarousel();
        
        // Restart the automatic carousel from this point
        stopCarousel();
        startCarousel();
    });
});

// Pause carousel on hover, resume on leave
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopCarousel);
carouselContainer.addEventListener('mouseleave', startCarousel);

// IMAGE ZOOM FUNCTIONALITY
// Show zoom preview when mouse moves over image
carouselImage.addEventListener('mousemove', function(event) {
    // Get the image's position and size
    const imageRect = carouselImage.getBoundingClientRect();
    
    // Calculate mouse position as percentage of image size
    const mouseX = ((event.clientX - imageRect.left) / imageRect.width) * 100;
    const mouseY = ((event.clientY - imageRect.top) / imageRect.height) * 100;
    
    // Show the zoom preview box
    zoomPreview.style.display = 'block';
    
    // Set the background image and position for zoom effect
    zoomPreview.style.backgroundImage = `url('${carouselImage.src}')`;
    zoomPreview.style.backgroundPosition = `${mouseX}% ${mouseY}%`;
});

// Hide zoom preview when mouse leaves the image
carouselImage.addEventListener('mouseleave', function() {
    zoomPreview.style.display = 'none';
});

// MODAL FUNCTIONALITY
// Simple functions to open and close modals
function openQuoteModal() {
    document.getElementById('quote-modal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function openCatalogueModal() {
    document.getElementById('catalogue-modal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const quoteModal = document.getElementById('quote-modal');
    const catalogueModal = document.getElementById('catalogue-modal');
    
    if (event.target === quoteModal) {
        closeModal('quote-modal');
    }
    if (event.target === catalogueModal) {
        closeModal('catalogue-modal');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal('quote-modal');
        closeModal('catalogue-modal');
    }
});

// FAQ FUNCTIONALITY
// Simple function to toggle FAQ answers
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqItem = faqItems[index];
    const question = faqItem.querySelector('.faq-question');
    const answer = faqItem.querySelector('.faq-answer');
    
    // Close all other FAQs
    faqItems.forEach((item, i) => {
        if (i !== index) {
            item.querySelector('.faq-question').classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    question.classList.toggle('active');
    answer.classList.toggle('active');
}

// FORM HANDLING
// Handle form submissions
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.modal-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = new FormData(form);
            const formType = form.closest('#quote-modal') ? 'quote' : 'catalogue';
            
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                if (formType === 'quote') {
                    alert('Thank you! Your quote request has been submitted. We will contact you within 24 hours.');
                } else {
                    alert('Thank you! The technical catalogue will be emailed to you shortly.');
                }
                
                // Reset form and close modal
                form.reset();
                closeModal(formType + '-modal');
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    });
});

// SMOOTH SCROLLING
// Smooth scroll to sections when navigation links are clicked
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// INTERSECTION OBSERVER FOR ANIMATIONS
// Animate elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .application-card, .testimonial-card, .step');
    animateElements.forEach(el => observer.observe(el));
});

// INITIALIZE EVERYTHING
// Initialize carousel and start automatic slideshow
function initializeCarousel() {
    updateCarousel(); // Show first image
    startCarousel(); // Start automatic slideshow
}

// Wait for page to load, then initialize
window.addEventListener('load', function() {
    initializeCarousel();
    console.log('Mangalam HDPE Pipes - Website loaded successfully! 🚀');
});

// Initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCarousel);
} else {
    initializeCarousel();
}
