// ========================================
// SIMPLIFIED LANDING PAGE - PERFORMANCE FOCUSED
// Lenis Smooth Scroll + Minimal Particles
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. LENIS SMOOTH SCROLL (LIGHTWEIGHT)
    // ========================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ========================================
    // 2. PARTICLES (HERO, NAVBAR, FOOTER ONLY)
    // ========================================
    if (typeof particlesJS !== 'undefined') {
        // Hero Particles
        if (document.getElementById('particles-js')) {
            particlesJS('particles-js', particlesConfig);
        }

        // Navbar Particles (subtle)
        if (document.getElementById('particles-navbar')) {
            particlesJS('particles-navbar', {
                ...particlesConfig,
                particles: {
                    ...particlesConfig.particles,
                    number: { value: 30, density: { enable: true, value_area: 800 } },
                    opacity: { value: 0.2, random: true }
                }
            });
        }

        // Footer Particles (subtle)
        if (document.getElementById('particles-footer')) {
            particlesJS('particles-footer', {
                ...particlesConfig,
                particles: {
                    ...particlesConfig.particles,
                    number: { value: 40, density: { enable: true, value_area: 800 } },
                    opacity: { value: 0.15, random: true }
                }
            });
        }
    }

    // ========================================
    // 3. SIMPLE FADE-IN ON SCROLL (NO GSAP)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for simple fade-in
    document.querySelectorAll('.about-card, .service-card, .step, .requirement-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========================================
    // ORIGINAL FUNCTIONALITY
    // ========================================

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, {
                    offset: -80,
                    duration: 1.5
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

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            console.log('Form submission started:', data);

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            try {
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
                    alert('¡Gracias por su interés! Hemos recibido su solicitud de registro para: ' + data.business_name + '. Un asesor ejecutivo revisará sus credenciales y se pondrá en contacto con usted en las próximas 24-48 horas.');
                    contactForm.reset();
                } else {
                    console.error('Submission error:', result);
                    alert('Hubo un error al procesar su solicitud: ' + (result.message || 'Por favor, verifique que todos los campos sean correctos.'));
                }
            } catch (error) {
                console.error('Connection error:', error);
                alert('No se pudo establecer conexión con el servicio de envío. Por favor, inténtelo de nuevo más tarde o use el enlace de correo directo.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // Hero Carousel Auto-Rotation
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentCarouselIndex = 0;

    if (carouselItems.length > 0) {
        setInterval(() => {
            carouselItems[currentCarouselIndex].classList.remove('active');
            currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
            carouselItems[currentCarouselIndex].classList.add('active');
        }, 4000);
    }

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        lastScroll = currentScroll;
    });

    // Scroll Progress Bar
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
