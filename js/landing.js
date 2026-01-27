// ========================================
// LANDING PAGE JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Log data (in production, this would send to backend)
            console.log('Form submitted:', data);

            // Show success message
            alert('Thank you for your interest! We will review your application and contact you within 24-48 hours.');

            // Reset form
            contactForm.reset();
        });
    }

    // Hero Carousel Auto-Rotation
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentCarouselIndex = 0;

    if (carouselItems.length > 0) {
        // Initial active state set by HTML, but we ensure interaction
        setInterval(() => {
            // Remove active class from current
            carouselItems[currentCarouselIndex].classList.remove('active');

            // Calculate next index
            currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;

            // Add active class to next
            carouselItems[currentCarouselIndex].classList.add('active');
        }, 4000); // 4 seconds per slide
    }

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.hero-content, .hero-features, .about-card, .service-card, .step, .requirement-card, .contact-info, .contact-form, .hero-carousel');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

});
