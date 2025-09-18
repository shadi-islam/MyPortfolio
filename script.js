document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero-image img', {
            duration: 1.2,
            opacity: 0,
            scale: 0.8,
            x: '-50%',
            ease: 'power3.out'
        })
        .from('.hero-text > *', {
            duration: 0.8,
            opacity: 0,
            y: 30,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.8')
        .to('.hero-image img', {
            boxShadow: '0 15px 100px rgba(52, 152, 219, 0.7)',
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: 'power1.inOut'
        }, '-=0.5');

    // Typed.js for Hero Subtitle
    if (document.querySelector('.typing')) {
        new Typed('.typing', {
            strings: [
                'A Frontend Developer.',
                'An Enthusiastic Learner.',
                'A Computer Science Student.',
                'A Passionate Debater.',
                'A Tech Enthusiast from IUBAT.'
            ],
            typeSpeed: 70,
            backSpeed: 85,
            loop: true
        });
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !expanded);
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // ScrollTrigger for Section Transitions
    gsap.utils.toArray('.section').forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => {
                if (!section.classList.contains('visible')) {
                    gsap.fromTo(section, {
                        opacity: 0,
                        y: 50
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        overwrite: true
                    });
                    section.classList.add('visible');
                }
            },
            onEnterBack: () => {
                if (!section.classList.contains('visible')) {
                    gsap.fromTo(section, {
                        opacity: 0,
                        y: 50
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        overwrite: true
                    });
                    section.classList.add('visible');
                }
            }
            // Removed onLeave and onLeaveBack to preserve content visibility
        });
    });

    // Ensure initial visibility
    gsap.set('.section', { opacity: 1, y: 0 });

    // Experience Timeline Scroll Animation
    let expScrollHandler = null;
    const setupExperienceScroll = () => {
        const timeline = document.querySelector('#experienceTimeline');
        if (!timeline) return;

        const scrollContainer = document.querySelector('#experience');
        const items = timeline.querySelectorAll('.timeline-item');
        timeline.style.setProperty('--timeline-height', '0%');

        expScrollHandler = () => {
            const rect = scrollContainer.getBoundingClientRect();
            const totalHeight = scrollContainer.scrollHeight - window.innerHeight;
            const scrollProgress = Math.max(0, Math.min(-rect.top / totalHeight * 100, 100));
            timeline.style.setProperty('--timeline-height', `${scrollProgress}%`);
        };

        expScrollHandler();
        ScrollTrigger.create({
            trigger: '#experience',
            start: 'top 80%',
            end: 'bottom 20%',
            onUpdate: expScrollHandler,
            onEnter: () => items.forEach(item => item.classList.add('visible')),
            onEnterBack: () => items.forEach(item => item.classList.add('visible'))
        });
    };

    // Initialize Experience Timeline when in view
    ScrollTrigger.create({
        trigger: '#experience',
        start: 'top 80%',
        onEnter: setupExperienceScroll,
        once: true
    });
});