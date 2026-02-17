// White Glass + Neon Interactions Script

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mouse Tracking for Global Spotlight ---
    const globalGridBg = document.querySelector('.global-grid-bg');

    if (globalGridBg) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Set CSS variables for the global mask
            globalGridBg.style.setProperty('--mouse-x', `${x}px`);
            globalGridBg.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // --- 2. 3D Tilt Effect for Bento/CV Cards ---
    const cvContainer = document.querySelector('.cv-container');
    if (cvContainer) {
        cvContainer.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
        cvContainer.style.transformStyle = 'preserve-3d';

        cvContainer.addEventListener('mousemove', (e) => {
            const rect = cvContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / 50) * -1;
            const rotateY = (x - centerX) / 50;

            cvContainer.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        cvContainer.addEventListener('mouseleave', () => {
            cvContainer.style.transform = `perspective(2000px) rotateX(0deg) rotateY(0deg)`;
        });
    }

    // --- 3. Parallax Effect for Typography & Icons ---
    const capsules = document.querySelectorAll('.glass-capsule');
    const title = document.querySelector('.main-title');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

        if (title) {
            title.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        }

        capsules.forEach((capsule, index) => {
            const parallaxSpeed = (index + 1) * 30;
            const baseRotate = (index % 2 === 0) ? -5 : 3;
            capsule.style.transform = `
                translate(${x * parallaxSpeed}px, ${y * parallaxSpeed}px) 
                translateY(${index === 0 ? '-20%' : '-70%'}) 
                rotate(${baseRotate + (x * 5)}deg)
            `;
        });
    });

    // --- 4. Smooth Scrolling ---
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 5. Scroll Reveal ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.cv-container, .section-title, .work-card').forEach(el => {
        observer.observe(el);
    });

    // --- 6. Scroll Spy for Navigation ---
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id], main[id]');

    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Handle scroll to top for Home activation
    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            navItems.forEach(item => {
                if (item.getAttribute('href') === '#home') {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });

    // --- 7. Magnetic Effect for Contact Button ---
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('mousemove', (e) => {
            const rect = contactBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            contactBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateY(-5px) scale(1.05)`;
        });

        contactBtn.addEventListener('mouseleave', () => {
            contactBtn.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    // --- 8. Work Cards 3D Tilt Effect ---
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / 30) * -1;
            const rotateY = (x - centerX) / 30;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    console.log("🎨 Premium Portfolio: Enhanced with Stunning Visuals ✨");
});
