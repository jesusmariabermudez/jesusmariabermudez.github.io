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
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuBtn.classList.remove('active');
                }
            }
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Log data (in production, this would send to backend)
            console.log('Form submission started:', data);

            // Change button state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            try {
                // FormSubmit.co AJAX endpoint (Reemplazar con el correo real si es diferente)
                const apiUrl = 'https://formsubmit.co/ajax/info@ambassadorkingdom.com';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                console.log('Server response:', result);

                if (response.ok && result.success === "true") {
                    // Show success message
                    alert('¡Gracias por su interés! Hemos recibido su solicitud de registro para: ' + data.business_name + '. Un asesor ejecutivo revisará sus credenciales y se pondrá en contacto con usted en las próximas 24-48 horas.');

                    // Reset form
                    contactForm.reset();
                } else {
                    console.error('Submission error:', result);
                    alert('Hubo un error al procesar su solicitud: ' + (result.message || 'Por favor, verifique que todos los campos sean correctos.'));
                }
            } catch (error) {
                console.error('Connection error:', error);
                alert('No se pudo establecer conexión con el servicio de envío. Por favor, inténtelo de nuevo más tarde o use el enlace de correo directo.');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
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

    // Scroll Progress Bar Logic
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

});
