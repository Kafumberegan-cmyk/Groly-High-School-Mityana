/**
 * GLORY HIGH SCHOOL - PORTRAIT MODE & HAMBURGER MENU
 * Complete mobile navigation solution
 */

(function() {
    'use strict';
    
    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        
        // Create overlay if it doesn't exist
        if (!document.querySelector('.menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
        }
        
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const overlay = document.querySelector('.menu-overlay');
        const body = document.body;
        
        // Create close button inside nav if not exists
        if (mainNav && !mainNav.querySelector('.close-menu')) {
            // Close button is handled by CSS ::after
        }
        
        // Toggle menu function
        function toggleMenu(show) {
            if (!mainNav || !overlay) return;
            
            if (show === true) {
                mainNav.classList.add('active');
                overlay.classList.add('active');
                body.style.overflow = 'hidden';
                menuToggle.textContent = '✕';
            } else if (show === false) {
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = '';
                menuToggle.textContent = '☰';
            } else {
                // Toggle
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    overlay.classList.remove('active');
                    body.style.overflow = '';
                    menuToggle.textContent = '☰';
                } else {
                    mainNav.classList.add('active');
                    overlay.classList.add('active');
                    body.style.overflow = 'hidden';
                    menuToggle.textContent = '✕';
                }
            }
        }
        
        // Hamburger click
        if (menuToggle) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMenu();
            });
        }
        
        // Overlay click to close
        if (overlay) {
            overlay.addEventListener('click', function() {
                toggleMenu(false);
            });
        }
        
        // Close button click (using CSS pseudo-element)
        mainNav.addEventListener('click', function(e) {
            if (window.getComputedStyle(mainNav, '::after').content.includes('✕')) {
                // Check if click is near the close area (right side)
                const rect = mainNav.getBoundingClientRect();
                if (e.clientX > rect.right - 60 && e.clientY < 60) {
                    toggleMenu(false);
                }
            }
        });
        
        // Dropdown toggles for mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            link.addEventListener('click', function(e) {
                // Only in mobile view
                if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown && d.classList.contains('active')) {
                            d.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
            
            // Touch support
            link.addEventListener('touchstart', function(e) {
                if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
                    e.preventDefault();
                }
            });
        });
        
        // Close menu when clicking a link (except dropdown toggles)
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't close if it's a dropdown toggle (will be handled separately)
                if (!this.closest('.dropdown') || 
                    (this.closest('.dropdown') && !this.nextElementSibling)) {
                    // Check if in mobile portrait
                    if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
                        setTimeout(() => {
                            toggleMenu(false);
                        }, 200);
                    }
                }
            });
        });
        
        // Handle resize events
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const width = window.innerWidth;
                const height = window.innerHeight;
                
                // If landscape or desktop, close mobile menu
                if (width > 768 || width > height) {
                    toggleMenu(false);
                    
                    // Reset dropdowns
                    dropdowns.forEach(d => {
                        d.classList.remove('active');
                    });
                }
                
                // Update hamburger visibility
                if (menuToggle) {
                    if (width <= 768 && height > width) {
                        menuToggle.style.display = 'block';
                    } else {
                        menuToggle.style.display = 'none';
                    }
                }
            }, 250);
        });
        
        // Initial check
        (function init() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            if (menuToggle) {
                if (width <= 768 && height > width) {
                    menuToggle.style.display = 'block';
                } else {
                    menuToggle.style.display = 'none';
                }
            }
        })();
        
        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                toggleMenu(false);
                
                dropdowns.forEach(d => {
                    d.classList.remove('active');
                });
                
                const width = window.innerWidth;
                const height = window.innerHeight;
                
                if (menuToggle) {
                    if (width <= 768 && height > width) {
                        menuToggle.style.display = 'block';
                    } else {
                        menuToggle.style.display = 'none';
                    }
                }
            }, 200);
        });
        
        // Debug info (remove in production)
        console.log('Portrait mode hamburger menu initialized');
    });
})();