// Main JavaScript file for Catskill MM Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Catskill MM Website loaded successfully!');
    
    // Initialize functionality
    initializeSideNavigation();
    initializeScrollEffects();
    initializeCTAButton();
    initializeActiveSection();
    initializeAboutTabs();
    initializeTestimonials();
    initializeCustomOptions();
});

// Side Navigation functionality
function initializeSideNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sideNav = document.getElementById('sideNav');
    const navOverlay = document.getElementById('navOverlay');
    const closeBtn = document.querySelector('.close-btn');
    const navLinks = document.querySelectorAll('.nav-link');

    // Open side navigation
    menuToggle.addEventListener('click', function() {
        sideNav.classList.add('active');
        navOverlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close side navigation
    function closeSideNav() {
        sideNav.classList.remove('active');
        navOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    closeBtn.addEventListener('click', closeSideNav);
    navOverlay.addEventListener('click', closeSideNav);

    // Close navigation when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's a page link (ends with .html) or an anchor link (starts with #)
            if (href.endsWith('.html')) {
                // For page navigation, just close the nav and let the browser handle navigation
                closeSideNav();
                // Don't prevent default - let the browser navigate to the page
                return;
            } else if (href.startsWith('#')) {
                // For anchor links within the same page, handle smooth scrolling
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    closeSideNav();
                    
                    // Wait for navigation to close before scrolling
                    setTimeout(() => {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });

    // Close navigation with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sideNav.classList.contains('active')) {
            closeSideNav();
        }
    });

    // Initialize dropdown functionality
    initializeDropdowns();
}

// Dropdown functionality
function initializeDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a page link (not just #), allow navigation
            if (href && href.endsWith('.html')) {
                return; // Let the browser handle navigation
            }
            
            // Otherwise, handle dropdown toggle
            e.preventDefault();
            const dropdown = this.closest('.nav-dropdown');
            const isActive = dropdown.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.nav-dropdown.active').forEach(activeDropdown => {
                if (activeDropdown !== dropdown) {
                    activeDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            if (isActive) {
                dropdown.classList.remove('active');
            } else {
                dropdown.classList.add('active');
            }
        });
    });

    // Handle dropdown link clicks
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const tabId = this.getAttribute('data-tab');
            
            // Close the side navigation
            const sideNav = document.getElementById('sideNav');
            const navOverlay = document.getElementById('navOverlay');
            const menuToggle = document.querySelector('.menu-toggle');
            
            sideNav.classList.remove('active');
            navOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // If we're on the same page and have a tab ID, switch to that tab
            if (href === window.location.pathname.split('/').pop() && tabId) {
                e.preventDefault();
                
                // Wait for navigation to close, then switch tabs
                setTimeout(() => {
                    // Switch to the specified tab
                    const targetTab = document.getElementById(tabId);
                    const targetButton = document.querySelector(`[data-tab="${tabId}"]`);
                    
                    if (targetTab && targetButton) {
                        // Hide all tab content
                        document.querySelectorAll('.tab-content').forEach(tab => {
                            tab.classList.remove('active');
                        });
                        
                        // Remove active class from all buttons
                        document.querySelectorAll('.tab-button').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        
                        // Show target tab and activate button
                        targetTab.classList.add('active');
                        targetButton.classList.add('active');
                        
                        // Scroll to the tab section
                        const tabsSection = document.querySelector('.about-tabs-section');
                        if (tabsSection) {
                            const headerHeight = document.querySelector('header').offsetHeight;
                            const targetPosition = tabsSection.offsetTop - headerHeight;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                }, 300);
            }
            // Otherwise, let the browser handle the navigation normally
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;
        
        // Add shadow to header on scroll
        if (scrollPosition > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
}

// CTA Button functionality
function initializeCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to about section
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Add active section highlighting
function initializeActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// About Us Tab Functionality
function initializeAboutTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Only initialize if tabs exist (on about page)
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Testimonials Carousel Functionality
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.indicator');
    
    // Only initialize if testimonials exist
    if (testimonials.length === 0) return;
    
    let currentTestimonial = 0;
    let testimonialInterval;
    
    // Function to show specific testimonial
    function showTestimonial(index) {
        // Remove active class from all testimonials and indicators
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current testimonial and indicator
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentTestimonial = index;
    }
    
    // Function to show next testimonial
    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }
    
    // Function to start auto-rotation
    function startAutoRotation() {
        testimonialInterval = setInterval(nextTestimonial, 15000); // 15 seconds
    }
    
    // Function to stop auto-rotation
    function stopAutoRotation() {
        clearInterval(testimonialInterval);
    }
    
    // Add click listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopAutoRotation();
            showTestimonial(index);
            // Restart auto-rotation after user interaction
            setTimeout(startAutoRotation, 8000); // Wait 8 seconds before resuming
        });
    });
    
    // Add click listeners to testimonials themselves
    testimonials.forEach((testimonial, index) => {
        testimonial.addEventListener('click', function() {
            stopAutoRotation();
            nextTestimonial(); // Advance to next testimonial when clicked
            // Restart auto-rotation after user interaction
            setTimeout(startAutoRotation, 8000); // Wait 8 seconds before resuming
        });
        
        // Add cursor pointer style to indicate clickability
        testimonial.style.cursor = 'pointer';
    });
    
    // Pause auto-rotation when hovering over testimonials section
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', stopAutoRotation);
        testimonialsSection.addEventListener('mouseleave', startAutoRotation);
    }
    
    // Start the auto-rotation
    startAutoRotation();
    
    // Handle visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoRotation();
        } else {
            startAutoRotation();
        }
    });
}

// Video functionality for care guide page
function playVideo() {
    const placeholder = document.querySelector('.video-placeholder');
    const video = document.getElementById('lacingVideo');
    
    if (placeholder && video) {
        placeholder.style.display = 'none';
        video.style.display = 'block';
        video.play();
    }
}

// ...existing code...

// Custom Options Navigation (for custom-design.html)
function initializeCustomOptions() {
    console.log('Initializing custom options...');
    
    const sections = document.querySelectorAll('.custom-option-section');
    const navButtons = document.querySelectorAll('[data-section]');
    
    console.log(`Found ${sections.length} sections and ${navButtons.length} buttons`);
    
    // Don't force any section to be active - let HTML determine initial state
    
    if (navButtons.length === 0) {
        console.log('No navigation buttons found');
        return;
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log(`Button clicked: ${button.getAttribute('data-section')}`);
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding section
            const targetSection = button.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
                console.log(`Showing section: ${targetSection}`);
            } else {
                console.log(`Section not found: ${targetSection}`);
            }
        });
    });
}

// ...existing code...
function showCustomOptions() {
    const coverPage = document.getElementById('designCover');
    const optionsMain = document.getElementById('customOptionsMain');
    
    if (coverPage && optionsMain) {
        coverPage.style.display = 'none';
        optionsMain.style.display = 'block';
        
        // Scroll to top of options
        optionsMain.scrollIntoView({ behavior: 'smooth' });
        
        // Initialize the custom options navigation
        initializeCustomOptions();
    }
}

// Image Modal Functions for Leather Colors
function enlargeImage(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const enlargedImage = document.getElementById('enlargedImage');
    const imageCaption = document.getElementById('imageCaption');
    
    enlargedImage.src = imageSrc;
    imageCaption.textContent = caption;
    modal.style.display = 'block';
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Restore body scrolling
    document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// Modal popup functionality for gallery images
const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
let currentIndex = 0;

function openModal(imgElem) {
  var modal = document.getElementById('imageModal');
  var modalImg = document.getElementById('modalImg');
  modal.style.display = 'flex';
  modalImg.src = imgElem.src;
  modalImg.alt = imgElem.alt;
  currentIndex = galleryImages.findIndex(img => img.src === imgElem.src);
}

function closeModal(event) {
  var modal = document.getElementById('imageModal');
  if (event.target.classList.contains('modal') || event.target.classList.contains('modal-close')) {
    modal.style.display = 'none';
  }
}

function showImage(index) {
  var modalImg = document.getElementById('modalImg');
  if (index >= 0 && index < galleryImages.length) {
    modalImg.src = galleryImages[index].src;
    modalImg.alt = galleryImages[index].alt;
    currentIndex = index;
  }
}

function prevImage(event) {
  event.stopPropagation();
  if (currentIndex > 0) {
    showImage(currentIndex - 1);
  }
}

function nextImage(event) {
  event.stopPropagation();
  if (currentIndex < galleryImages.length - 1) {
    showImage(currentIndex + 1);
  }
}
