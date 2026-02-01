// ========================================
// MODERN PREMIUM LANDING PAGE
// Enhanced with GSAP, Lenis, Particles.js
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. LENIS SMOOTH SCROLL INITIALIZATION
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

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ========================================
    // 2. PARTICLES.JS INITIALIZATION
    // ========================================
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', particlesConfig);
    }

    // ========================================
    // 3. GSAP ANIMATIONS
    // ========================================
    gsap.registerPlugin(ScrollTrigger);

    // Hero Title Animation
    gsap.from('.hero-title', {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.3
    });

    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.6
    });

    gsap.from('.hero-cta', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.9
    });

    // About Cards Stagger Animation
    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 60,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Service Cards Animation
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 80,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Steps Animation
    gsap.from('.step', {
        scrollTrigger: {
            trigger: '.steps',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.7,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Requirements Cards
    gsap.from('.requirement-card', {
        scrollTrigger: {
            trigger: '.requirements-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        stagger: 0.15,
        ease: 'back.out(1.7)'
    });

    // Contact Section
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power3.out'
    });

    // ========================================
    // 4. CUSTOM CURSOR
    // ========================================
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        const speed = 0.2;
        const followerSpeed = 0.1;

        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        followerX += (mouseX - followerX) * followerSpeed;
        followerY += (mouseY - followerY) * followerSpeed;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .about-card, .requirement-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });

    // ========================================
    // 5. MAGNETIC BUTTONS
    // ========================================
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-large');
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // ========================================
    // 6. CARD TILT EFFECT
    // ========================================
    const tiltCards = document.querySelectorAll('.service-card, .about-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });

    // ========================================
    // 7. PARALLAX EFFECT
    // ========================================
    gsap.utils.toArray('.hero-content').forEach(element => {
        gsap.to(element, {
            y: 100,
            scrollTrigger: {
                trigger: element,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // ========================================
    // ORIGINAL FUNCTIONALITY (Enhanced)
    // ========================================

    // Smooth scroll for navigation links (now using Lenis)
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

    // Header scroll effect (Enhanced with GSAP)
    let lastScroll = 0;
    const header = document.querySelector('.header');

    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            className: 'header-scrolled',
            targets: '.header'
        }
    });

    // Scroll Progress Bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        gsap.to(progressBar, {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
        });
    }

});
