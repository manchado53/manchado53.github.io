/* ===================================
   MODERN ANIMATIONS & INTERACTIONS
   Adrian Manchado Portfolio - 2025
   =================================== */

(function() {
    'use strict';

    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        
        // ===== SCROLL REVEAL ANIMATION =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('#experience, #education, #projects, #awards, #skills, #contact');
        sections.forEach(section => {
            section.classList.add('scroll-reveal');
            observer.observe(section);
        });

        // Observe individual cards with delay
        const cards = document.querySelectorAll('.vtimeline-content, .education-block, .project, .award-block');
        cards.forEach((card, index) => {
            card.classList.add('scroll-reveal');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '#to-top') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // ===== TYPING EFFECT FOR HERO TEXT =====
        const heroSubtitle = document.querySelector('#lead-content h2');
        if (heroSubtitle) {
            const text = heroSubtitle.textContent;
            heroSubtitle.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    heroSubtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            setTimeout(typeWriter, 1000);
        }

        // ===== PARALLAX EFFECT =====
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.project-image img');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
            
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // ===== SKILL TAGS ANIMATION =====
        const skillTags = document.querySelectorAll('#skills li');
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.05}s`;
            tag.classList.add('scroll-reveal');
            observer.observe(tag);
        });

        // ===== PARTICLE EFFECT ON HERO =====
        function createParticle() {
            const lead = document.querySelector('#lead');
            if (!lead) return;

            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 5 + 2;
            const x = Math.random() * window.innerWidth;
            const duration = Math.random() * 3 + 2;
            const opacity = Math.random() * 0.5 + 0.2;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                bottom: -10px;
                background: rgba(255, 255, 255, ${opacity});
                position: absolute;
                animation: floatUp ${duration}s linear;
            `;
            
            lead.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }

        // Create particles periodically
        setInterval(createParticle, 300);

        // ===== MOUSE MOVE EFFECT =====
        document.addEventListener('mousemove', function(e) {
            const cards = document.querySelectorAll('.project, .education-block');
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                } else {
                    card.style.transform = '';
                }
            });
        });

        // ===== COUNTER ANIMATION =====
        function animateCounter(element, target, duration) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.ceil(start);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            }
            
            updateCounter();
        }

        // Observe stat numbers if they exist
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            observer.observe(stat);
            stat.addEventListener('revealed', function() {
                const target = parseInt(this.dataset.target);
                animateCounter(this, target, 2000);
            });
        });

        // ===== PROJECT CARD GLOW EFFECT =====
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            project.addEventListener('mouseenter', function() {
                this.classList.add('glow');
            });
            
            project.addEventListener('mouseleave', function() {
                this.classList.remove('glow');
            });
        });

        // ===== HEADER HIDE ON SCROLL DOWN =====
        let lastScroll = 0;
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                // Scroll down
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                // Scroll up
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });

        // ===== DYNAMIC BACKGROUND =====
        const lead = document.querySelector('#lead');
        if (lead) {
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX / window.innerWidth;
                mouseY = e.clientY / window.innerHeight;
            });
            
            function updateBackground() {
                const overlay = lead.querySelector('#lead-overlay');
                if (overlay) {
                    const x = mouseX * 20;
                    const y = mouseY * 20;
                    overlay.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
                }
                requestAnimationFrame(updateBackground);
            }
            
            updateBackground();
        }

        // ===== LAZY LOADING IMAGES =====
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // ===== CONTACT FORM VALIDATION (if exists) =====
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Add your form validation and submission logic here
                console.log('Form submitted!');
                
                // Show success message
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
            });
        }

        // ===== INITIALIZE TOOLTIPS =====
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.dataset.tooltip;
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) tooltip.remove();
            });
        });

        // ===== CONSOLE EASTER EGG =====
        console.log('%c👋 Hey there, curious developer!', 'color: #667eea; font-size: 20px; font-weight: bold;');
        console.log('%cLike what you see? Let\'s connect!', 'color: #764ba2; font-size: 14px;');
        console.log('%c📧 adrimanca12@gmail.com', 'color: #4facfe; font-size: 14px;');
        console.log('%c🔗 https://linkedin.com/in/adrian-manchado', 'color: #00f2fe; font-size: 14px;');

        // ===== PERFORMANCE MONITORING =====
        if ('PerformanceObserver' in window) {
            const perfObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'navigation') {
                        console.log('Page load time:', entry.loadEventEnd - entry.fetchStart, 'ms');
                    }
                }
            });
            
            perfObserver.observe({ entryTypes: ['navigation'] });
        }

    });

    // ===== ADD FLOATING ANIMATION CSS =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            to {
                transform: translateY(-100vh);
                opacity: 0;
            }
        }
        
        .scroll-up {
            transform: translateY(0) !important;
        }
        
        .scroll-down {
            transform: translateY(-100%) !important;
        }
        
        .tooltip {
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 10000;
            pointer-events: none;
            animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

})();

