/* ===================================
   TABBED NAVIGATION SYSTEM
   Adrian Manchado Portfolio - 2025
   =================================== */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        
        // === TAB SWITCHING FUNCTIONALITY ===
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        let currentTab = 'home';
        let previousTab = null;

        // Add click handlers to all tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });

        // Main tab switching function
        function switchTab(targetTab) {
            if (targetTab === currentTab) return;

            const currentIndex = getTabIndex(currentTab);
            const targetIndex = getTabIndex(targetTab);
            const direction = targetIndex > currentIndex ? 'right' : 'left';

            // Update previous tab
            previousTab = currentTab;

            // Remove active class from current tab button
            document.querySelector(`.tab-btn[data-tab="${currentTab}"]`).classList.remove('active');
            
            // Add active class to target tab button
            document.querySelector(`.tab-btn[data-tab="${targetTab}"]`).classList.add('active');

            // Get content elements
            const currentContent = document.getElementById(`${currentTab}-tab`);
            const targetContent = document.getElementById(`${targetTab}-tab`);

            // Animate out current tab
            if (direction === 'right') {
                currentContent.classList.add('slide-out-left');
            } else {
                currentContent.classList.add('slide-out-right');
            }

            // Wait a bit then switch
            setTimeout(() => {
                currentContent.classList.remove('active', 'slide-out-left', 'slide-out-right');
                targetContent.classList.add('active');
                
                // Scroll to top of new tab
                targetContent.scrollTop = 0;
                
                // Update current tab
                currentTab = targetTab;

                // Trigger any tab-specific animations
                triggerTabAnimations(targetTab);

                // Update URL hash without scrolling
                history.pushState(null, null, `#${targetTab}`);
            }, 100);
        }

        // Get tab index for animation direction
        function getTabIndex(tabName) {
            const tabOrder = ['home', 'about', 'experience', 'education', 'projects', 'awards', 'skills', 'contact'];
            return tabOrder.indexOf(tabName);
        }

        // Trigger tab-specific animations
        function triggerTabAnimations(tabName) {
            const tabContent = document.getElementById(`${tabName}-tab`);
            
            // Re-trigger scroll reveal animations
            const elements = tabContent.querySelectorAll('.scroll-reveal');
            elements.forEach((el, index) => {
                el.classList.remove('revealed');
                setTimeout(() => {
                    el.classList.add('revealed');
                }, index * 100);
            });
        }

        // === KEYBOARD NAVIGATION ===
        document.addEventListener('keydown', function(e) {
            const tabs = ['home', 'about', 'experience', 'education', 'projects', 'awards', 'skills', 'contact'];
            const currentIndex = tabs.indexOf(currentTab);

            // Arrow key navigation
            if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
                e.preventDefault();
                switchTab(tabs[currentIndex + 1]);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                switchTab(tabs[currentIndex - 1]);
            }

            // Number key navigation (1-8)
            if (e.key >= '1' && e.key <= '8') {
                const tabIndex = parseInt(e.key) - 1;
                if (tabs[tabIndex]) {
                    e.preventDefault();
                    switchTab(tabs[tabIndex]);
                }
            }

            // Escape to go to home
            if (e.key === 'Escape') {
                e.preventDefault();
                switchTab('home');
            }
        });

        // === HANDLE HASH NAVIGATION ===
        function handleHashChange() {
            let hash = window.location.hash.substring(1);
            
            // Map old hash names to new tab names
            const hashMap = {
                'lead': 'home',
                'about': 'about',
                'experience': 'experience',
                'education': 'education',
                'projects': 'projects',
                'awards': 'awards',
                'skills': 'skills',
                'contact': 'contact'
            };

            hash = hashMap[hash] || hash;

            if (hash && document.getElementById(`${hash}-tab`)) {
                switchTab(hash);
            }
        }

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
        
        // Check initial hash on load
        if (window.location.hash) {
            setTimeout(handleHashChange, 100);
        }

        // === SWIPE GESTURES FOR MOBILE ===
        let touchStartX = 0;
        let touchEndX = 0;
        let isSwiping = false;

        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = true;
        });

        document.addEventListener('touchmove', function(e) {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', function() {
            if (!isSwiping) return;
            isSwiping = false;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) < swipeThreshold) return;

            const tabs = ['home', 'about', 'experience', 'education', 'projects', 'awards', 'skills', 'contact'];
            const currentIndex = tabs.indexOf(currentTab);

            if (diff > 0 && currentIndex < tabs.length - 1) {
                // Swipe left - next tab
                switchTab(tabs[currentIndex + 1]);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous tab
                switchTab(tabs[currentIndex - 1]);
            }
        }

        // === TAB PRELOADING ===
        function preloadAdjacentTabs() {
            const tabs = ['home', 'about', 'experience', 'education', 'projects', 'awards', 'skills', 'contact'];
            const currentIndex = tabs.indexOf(currentTab);

            // Preload previous and next tabs
            if (currentIndex > 0) {
                const prevTab = document.getElementById(`${tabs[currentIndex - 1]}-tab`);
                if (prevTab) prevTab.classList.add('preloaded');
            }
            if (currentIndex < tabs.length - 1) {
                const nextTab = document.getElementById(`${tabs[currentIndex + 1]}-tab`);
                if (nextTab) nextTab.classList.add('preloaded');
            }
        }

        // Preload adjacent tabs after page load
        setTimeout(preloadAdjacentTabs, 1000);

        // === MOBILE MENU INTEGRATION ===
        const mobileMenuOpen = document.getElementById('mobile-menu-open');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const header = document.querySelector('header');

        if (mobileMenuOpen) {
            mobileMenuOpen.addEventListener('click', function() {
                header.classList.add('active');
            });
        }

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                header.classList.remove('active');
            });
        }

        // Close mobile menu when tab is clicked
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    header.classList.remove('active');
                }
            });
        });

        // === TAB PROGRESS TRACKING ===
        const tabProgress = {};
        tabs.forEach(tab => {
            tabProgress[tab] = false;
        });

        function markTabAsViewed(tabName) {
            tabProgress[tabName] = true;
            localStorage.setItem('tabProgress', JSON.stringify(tabProgress));
        }

        // Mark current tab as viewed when switched
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                markTabAsViewed(this.getAttribute('data-tab'));
            });
        });

        // === PERFORMANCE OPTIMIZATION ===
        // Lazy load images in inactive tabs
        const lazyLoadImages = function() {
            const images = document.querySelectorAll('.tab-content:not(.active) img[data-src]');
            images.forEach(img => {
                img.loading = 'lazy';
            });
        };

        // Run lazy load after initial load
        setTimeout(lazyLoadImages, 2000);

        // === ANALYTICS TRACKING (if needed) ===
        function trackTabView(tabName) {
            console.log(`Tab viewed: ${tabName}`);
            // Add your analytics code here
            // Example: ga('send', 'event', 'Tab', 'View', tabName);
        }

        // Track tab views
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                trackTabView(this.getAttribute('data-tab'));
            });
        });

        // === CONSOLE SHORTCUTS ===
        window.goToTab = function(tabName) {
            switchTab(tabName);
        };

        console.log('%c🎯 Tab Navigation Ready!', 'color: #667eea; font-size: 16px; font-weight: bold;');
        console.log('%c💡 Keyboard shortcuts:', 'color: #764ba2; font-size: 12px;');
        console.log('%c   • Arrow keys: Navigate between tabs', 'color: #4facfe; font-size: 11px;');
        console.log('%c   • 1-8: Jump to specific tab', 'color: #4facfe; font-size: 11px;');
        console.log('%c   • ESC: Return to home', 'color: #4facfe; font-size: 11px;');
        console.log('%c   • Swipe left/right on mobile', 'color: #4facfe; font-size: 11px;');
        console.log('%c📱 Try: goToTab("projects")', 'color: #11998e; font-size: 11px;');

    });

})();

