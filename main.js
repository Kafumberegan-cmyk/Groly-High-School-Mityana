/* ============================================
   DIRECTOR'S MESSAGE SCROLL ANIMATIONS
   Very Slow Slide and Zoom Effects
   ============================================ */

// Initialize director's message animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initDirectorMessageAnimation();
});

function initDirectorMessageAnimation() {
    const textContent = document.querySelector('.director-text-content');
    const imageContent = document.querySelector('.director-image-content');
    
    if (!textContent || !imageContent) return;
    
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animated class to trigger CSS transitions
                if (entry.target.classList.contains('director-text-content')) {
                    entry.target.classList.add('animated');
                }
                if (entry.target.classList.contains('director-image-content')) {
                    entry.target.classList.add('animated');
                }
                
                // Optional: Keep observing for slow zoom continuous effect
                // Uncomment if you want the zoom to continue while scrolling
                // observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2,      // Trigger when 20% of element is visible
        rootMargin: '0px 0px -50px 0px'  // Slight offset for smoother animation
    });
    
    // Observe both elements
    observer.observe(textContent);
    observer.observe(imageContent);
    
    // Optional: Add continuous slow zoom effect while element is in view
    if (imageContent) {
        const img = imageContent.querySelector('.director-image');
        let zoomAmount = 0;
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const rect = imageContent.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    // Calculate how much of the element is visible
                    const visiblePercent = Math.min(1, Math.max(0, 
                        (Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)) / rect.height
                    ));
                    
                    // Zoom based on visibility - very slow and subtle
                    if (visiblePercent > 0 && rect.top < windowHeight && rect.bottom > 0) {
                        // Very slow zoom effect (max 3% zoom)
                        zoomAmount = 1 + (visiblePercent * 0.03);
                        if (img) {
                            img.style.transform = `scale(${zoomAmount})`;
                        }
                    } else {
                        if (img && img.style.transform !== 'scale(1)') {
                            img.style.transform = 'scale(1)';
                        }
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// Optional: Re-run animation on resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Re-check animations on resize
        const textContent = document.querySelector('.director-text-content');
        const imageContent = document.querySelector('.director-image-content');
        
        if (textContent && !textContent.classList.contains('animated')) {
            const rect = textContent.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                textContent.classList.add('animated');
            }
        }
        
        if (imageContent && !imageContent.classList.contains('animated')) {
            const rect = imageContent.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                imageContent.classList.add('animated');
            }
        }
    }, 250);
});

    
    document.getElementById("message").textContent = "JavaScript is successfully linked!";
console.log("JS file is connected!");


// History Page Scroll Animations
class HistoryScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.scroll-animate');
        this.init();
    }
    
    init() {
        this.checkElements();
        window.addEventListener('scroll', () => this.checkElements());
        window.addEventListener('resize', () => this.checkElements());
    }
    
    checkElements() {
        this.animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HistoryScrollAnimations();
    
    // Add scroll-animate class to elements
    document.querySelectorAll('.slide-left, .slide-right, .zoom-out').forEach(el => {
        if (!el.classList.contains('history-hero-text') && 
            !el.classList.contains('history-hero-image')) {
            el.classList.add('scroll-animate');
        }
    });
});



// Scroll Animations for Mission & Vision page
class PageScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.scroll-animate');
        this.init();
    }
    
    init() {
        this.checkElements();
        window.addEventListener('scroll', () => this.checkElements());
    }
    
    checkElements() {
        this.animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
}

// Initialize when on mission-vision page
if (window.location.pathname.includes('mission-vision.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        // Add scroll-animate class to elements
        document.querySelectorAll('.text-col, .image-col').forEach(el => {
            el.classList.add('scroll-animate');
        });
        
        new PageScrollAnimations();
    });
}



// Leadership page scroll animations
if (window.location.pathname.includes('leadership.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const leaderCards = document.querySelectorAll('.leader-card');
        
        leaderCards.forEach(card => {
            card.classList.add('scroll-animate');
        });
        
        function checkScroll() {
            leaderCards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (cardTop < windowHeight - 100) {
                    card.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check on load
    });
}


// Staff Page JavaScript - Image Modal and Scroll Animations

// Image Modal Functionality
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    const img = element.querySelector('img');
    const placeholder = element.querySelector('.image-placeholder');
    
    if (img && img.src && img.style.display !== 'none') {
        modalImg.src = img.src;
        caption.innerHTML = img.alt;
    } else if (placeholder) {
        // If image failed to load, use placeholder background
        modalImg.src = '';
        modalImg.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
        modalImg.style.padding = '50px';
        modalImg.style.display = 'flex';
        modalImg.style.alignItems = 'center';
        modalImg.style.justifyContent = 'center';
        modalImg.style.color = 'white';
        modalImg.style.fontSize = '2rem';
        modalImg.alt = placeholder.innerText;
        caption.innerHTML = placeholder.innerText;
    }
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    const staffCards = document.querySelectorAll('.staff-card');
    
    // Add scroll-animate class to all cards
    staffCards.forEach(card => {
        card.classList.add('scroll-animate');
    });
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        
        staffCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            
            // Check if card is visible in viewport
            if (cardTop < windowHeight - 100 && cardBottom > 0) {
                card.classList.add('visible');
            }
        });
    }
    
    // Check on load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});

// Back to Top Button (if not already in main.js)
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Statistics Counter Animation for Accreditation Page
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetValue = parseInt(statNumber.getAttribute('data-target'));
            animateCounter(statNumber, 0, targetValue, 2000);
            counterObserver.unobserve(statNumber);
        }
    });
}, observerOptions);

// Observe all stat numbers
statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// Hero parallax effect
const heroSection = document.querySelector('.accreditation-hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroSection.style.backgroundPosition = `center ${rate}px`;
    });
}

// Download buttons - prevent default for demo
const downloadBtns = document.querySelectorAll('.download-btn');
downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Document download will be available soon. Please contact the school office for official documents.');
    });
});

// Add animation classes on scroll
const animatedElements = document.querySelectorAll('.accreditation-card, .timeline-item, .badge-item, .stat-item, .document-card');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add specific animation classes based on element type
            if (entry.target.classList.contains('timeline-item')) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                if (index % 2 === 0) {
                    entry.target.classList.add('slide-left');
                } else {
                    entry.target.classList.add('slide-right');
                }
            }
        }
    });
}, { threshold: 0.2 });

animatedElements.forEach(el => scrollObserver.observe(el));


// ===== ACADEMIC CALENDAR PAGE FUNCTIONS =====

// Month tabs functionality
function initCalendarTabs() {
    const monthTabs = document.querySelectorAll('.month-tab');
    const monthViews = document.querySelectorAll('.month-view');
    
    if (!monthTabs.length || !monthViews.length) return;
    
    monthTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and views
            monthTabs.forEach(t => t.classList.remove('active'));
            monthViews.forEach(v => v.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding month view
            const monthId = tab.getAttribute('data-month');
            document.getElementById(monthId).classList.add('active');
        });
    });
}

// Progress bar animation on scroll
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    if (!progressBars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('style')?.split(':')[1] || '0%';
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Download buttons functionality
function initDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const fileType = btn.textContent.trim();
            
            if (fileType.includes('PDF')) {
                alert('PDF Calendar download will be available soon. Please check back later or contact the school office.');
            } else if (fileType.includes('Excel')) {
                alert('Excel Calendar download will be available soon. Please check back later or contact the school office.');
            } else if (fileType.includes('Print')) {
                window.print();
            }
        });
    });
}

// Highlight current date in calendar
function highlightCurrentDate() {
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'short' }).toLowerCase();
    const currentDate = today.getDate();
    
    // Check if we're on the calendar page and the current month tab exists
    const currentMonthTab = document.querySelector(`.month-tab[data-month="${currentMonth}"]`);
    
    if (currentMonthTab) {
        // Automatically activate current month
        currentMonthTab.click();
        
        // Highlight current date
        setTimeout(() => {
            const dates = document.querySelectorAll(`#${currentMonth} .date:not(.empty)`);
            dates.forEach(date => {
                if (parseInt(date.textContent) === currentDate) {
                    date.classList.add('today');
                    // Add custom style for today
                    date.style.background = '#3498db';
                    date.style.color = 'white';
                    date.style.fontWeight = 'bold';
                }
            });
        }, 100);
    }
}

// Countdown timer for next event
function updateCountdown() {
    const countdownElement = document.querySelector('.countdown-timer');
    if (!countdownElement) return;
    
    // Example: Countdown to next event (March 1, 2024)
    const eventDate = new Date('March 1, 2024 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance < 0) {
        countdownElement.innerHTML = 'Event started!';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
    // Update every second
    setTimeout(updateCountdown, 1000);
}

// Add hover effects to date cards
function initDateCardHover() {
    const dateCards = document.querySelectorAll('.date-card');
    
    dateCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.date-icon i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.date-icon i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Initialize all calendar functions
document.addEventListener('DOMContentLoaded', function() {
    initCalendarTabs();
    initProgressBars();
    initDownloadButtons();
    highlightCurrentDate();
    initDateCardHover();
    
    // Optional: Update countdown if element exists
    if (document.querySelector('.countdown-timer')) {
        updateCountdown();
    }
});

// Print calendar function
function printCalendar() {
    const printContent = document.querySelector('.monthly-calendar').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
        <html>
            <head>
                <title>Print Academic Calendar</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .calendar-grid { margin-bottom: 30px; }
                    .calendar-header { background: #3498db; color: white; padding: 10px; }
                    .date { padding: 10px; border: 1px solid #ddd; }
                </style>
            </head>
            <body>
                <h1>Glory High School - Academic Calendar 2024</h1>
                ${printContent}
            </body>
        </html>
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
    location.reload(); // Reload to restore original content
}

// Export functions if needed
window.initCalendarTabs = initCalendarTabs;
window.printCalendar = printCalendar;


// ===== RESULTS PAGE FUNCTIONS =====

// Counter animation for result numbers
function initResultCounters() {
    const resultNumbers = document.querySelectorAll('.result-number, .uace-number');
    
    if (!resultNumbers.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.textContent);
                
                if (finalValue > 0) {
                    let currentValue = 0;
                    const increment = finalValue > 100 ? Math.ceil(finalValue / 50) : 1;
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            element.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            element.textContent = currentValue;
                        }
                    }, 20);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    resultNumbers.forEach(number => observer.observe(number));
}

// Download buttons functionality
function initResultDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const btnText = btn.textContent.trim();
            
            if (btnText.includes('UCE')) {
                alert('UCE Results PDF will be available soon. Please check the school notice board or contact the office.');
            } else if (btnText.includes('UACE')) {
                alert('UACE Results PDF will be available soon. Please check the school notice board or contact the office.');
            }
        });
    });
}

// Highlight best performers
function initHighlightBest() {
    const bestStudent = document.querySelector('.achiever-card:first-child');
    if (bestStudent) {
        bestStudent.classList.add('highlight');
        
        // Add floating animation to best student
        setInterval(() => {
            bestStudent.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                bestStudent.style.transform = 'translateY(0)';
            }, 500);
        }, 3000);
    }
}

// Add hover effects to result cards
function initResultCardHover() {
    const resultCards = document.querySelectorAll('.result-card, .uace-result-card');
    
    resultCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const number = card.querySelector('.result-number, .uace-number');
            if (number) {
                number.style.transition = 'all 0.3s ease';
            }
        });
    });
}

// Initialize all results functions
document.addEventListener('DOMContentLoaded', function() {
    initResultCounters();
    initResultDownloadButtons();
    initHighlightBest();
    initResultCardHover();
});

// Print results function
function printResults() {
    const uceSection = document.querySelector('.uce-section').innerHTML;
    const uaceSection = document.querySelector('.uace-section').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
        <html>
            <head>
                <title>Print Examination Results 2025</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .section-header { text-align: center; margin: 30px 0; }
                    .results-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin: 20px 0; }
                    .result-card { border: 1px solid #ddd; padding: 15px; text-align: center; }
                    .result-number { font-size: 24px; font-weight: bold; color: #3498db; }
                    .uace-results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; }
                </style>
            </head>
            <body>
                <h1>Glory High School - Examination Results 2025</h1>
                ${uceSection}
                ${uaceSection}
                <p style="text-align: center; margin-top: 30px;">© 2024 Glory High School. All rights reserved.</p>
            </body>
        </html>
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
    location.reload();
}

// Export functions
window.printResults = printResults;


// ===== APPLICATION FORM FUNCTIONS =====

// Aggregate Calculator
function initAggregateCalculator() {
    const grades = document.querySelectorAll('.grade');
    const aggregateValue = document.getElementById('aggregateValue');
    const aggregateInterpretation = document.getElementById('aggregateInterpretation');
    
    if (!grades.length || !aggregateValue) return;
    
    function calculateAggregate() {
        let total = 0;
        let count = 0;
        let validGrades = [];
        
        grades.forEach(grade => {
            const value = parseInt(grade.value);
            if (!isNaN(value) && value >= 1 && value <= 9) {
                validGrades.push(value);
            }
        });
        
        // Sort grades (best 8)
        validGrades.sort((a, b) => a - b);
        
        // Take best 8
        const bestEight = validGrades.slice(0, 8);
        
        // Calculate total
        bestEight.forEach(grade => {
            total += grade;
            count++;
        });
        
        // Display aggregate
        if (count > 0) {
            aggregateValue.textContent = total;
            
            // Interpretation
            if (total <= 8) {
                aggregateInterpretation.textContent = "Excellent - Highly Recommended";
                aggregateInterpretation.style.color = "#27ae60";
            } else if (total <= 16) {
                aggregateInterpretation.textContent = "Very Good - Recommended";
                aggregateInterpretation.style.color = "#2980b9";
            } else if (total <= 24) {
                aggregateInterpretation.textContent = "Good - Eligible";
                aggregateInterpretation.style.color = "#f39c12";
            } else if (total <= 32) {
                aggregateInterpretation.textContent = "Average - May be considered";
                aggregateInterpretation.style.color = "#e67e22";
            } else {
                aggregateInterpretation.textContent = "Needs Improvement - Contact admissions office";
                aggregateInterpretation.style.color = "#e74c3c";
            }
        } else {
            aggregateValue.textContent = "0";
            aggregateInterpretation.textContent = "Enter your grades above";
        }
    }
    
    // Add event listeners to all grade selects
    grades.forEach(grade => {
        grade.addEventListener('change', calculateAggregate);
    });
    
    // Initial calculation
    calculateAggregate();
}

// Collect Form Data
function collectFormData() {
    const formData = {
        personal: {
            fullName: document.getElementById('fullName')?.value || '',
            dob: document.getElementById('dob')?.value || '',
            gender: document.getElementById('gender')?.value || '',
            nationality: document.getElementById('nationality')?.value || '',
            religion: document.getElementById('religion')?.value || '',
            previousSchool: document.getElementById('previousSchool')?.value || ''
        },
        contact: {
            address: document.getElementById('address')?.value || '',
            district: document.getElementById('district')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            email: document.getElementById('email')?.value || ''
        },
        parent: {
            name: document.getElementById('parentName')?.value || '',
            phone: document.getElementById('parentPhone')?.value || '',
            email: document.getElementById('parentEmail')?.value || '',
            occupation: document.getElementById('occupation')?.value || ''
        },
        application: {
            program: document.getElementById('program')?.value || '',
            combination: document.getElementById('combination')?.value || ''
        },
        academics: {
            english: document.getElementById('engGrade')?.value || '',
            math: document.getElementById('mathGrade')?.value || '',
            subject3: document.getElementById('subj3')?.value || '',
            subject4: document.getElementById('subj4')?.value || '',
            subject5: document.getElementById('subj5')?.value || '',
            subject6: document.getElementById('subj6')?.value || '',
            subject7: document.getElementById('subj7')?.value || '',
            subject8: document.getElementById('subj8')?.value || '',
            aggregate: document.getElementById('aggregateValue')?.textContent || '0'
        },
        additional: {
            whyJoin: document.getElementById('whyJoin')?.value || '',
            specialNeeds: document.getElementById('specialNeeds')?.value || ''
        }
    };
    
    return formData;
}

// Validate Form
function validateForm() {
    const required = {
        fullName: document.getElementById('fullName')?.value,
        dob: document.getElementById('dob')?.value,
        gender: document.getElementById('gender')?.value,
        nationality: document.getElementById('nationality')?.value,
        address: document.getElementById('address')?.value,
        district: document.getElementById('district')?.value,
        phone: document.getElementById('phone')?.value,
        email: document.getElementById('email')?.value,
        parentName: document.getElementById('parentName')?.value,
        parentPhone: document.getElementById('parentPhone')?.value,
        program: document.getElementById('program')?.value,
        engGrade: document.getElementById('engGrade')?.value,
        mathGrade: document.getElementById('mathGrade')?.value,
        terms: document.getElementById('terms')?.checked
    };
    
    let missing = [];
    
    for (let [field, value] of Object.entries(required)) {
        if (!value || value === '') {
            missing.push(field);
        }
    }
    
    if (missing.length > 0) {
        alert(`Please fill in all required fields. Missing: ${missing.join(', ')}`);
        return false;
    }
    
    // Validate email format
    const email = document.getElementById('email')?.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone')?.value;
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        alert('Please enter a valid phone number (10 digits)');
        return false;
    }
    
    return true;
}

// Generate Application Text
function generateApplicationText() {
    const data = collectFormData();
    
    return `
GLORY HIGH SCHOOL - APPLICATION FORM
=====================================
Date: ${new Date().toLocaleDateString()}

PERSONAL INFORMATION
-------------------
Full Name: ${data.personal.fullName}
Date of Birth: ${data.personal.dob}
Gender: ${data.personal.gender}
Nationality: ${data.personal.nationality}
Religion: ${data.personal.religion}
Previous School: ${data.personal.previousSchool}

CONTACT INFORMATION
------------------
Home Address: ${data.contact.address}
District: ${data.contact.district}
Phone: ${data.contact.phone}
Email: ${data.contact.email}

PARENT/GUARDIAN INFORMATION
--------------------------
Name: ${data.parent.name}
Phone: ${data.parent.phone}
Email: ${data.parent.email}
Occupation: ${data.parent.occupation}

APPLICATION DETAILS
------------------
Program: ${data.application.program}
Combination: ${data.application.combination}

ACADEMIC RESULTS
---------------
English: ${data.academics.english}
Mathematics: ${data.academics.math}
Subject 3: ${data.academics.subject3}
Subject 4: ${data.academics.subject4}
Subject 5: ${data.academics.subject5}
Subject 6: ${data.academics.subject6}
Subject 7: ${data.academics.subject7}
Subject 8: ${data.academics.subject8}
Aggregate Score: ${data.academics.aggregate}

ADDITIONAL INFORMATION
---------------------
Why Join: ${data.additional.whyJoin}
Special Needs: ${data.additional.specialNeeds}

=====================================
Submitted via Online Application Form
    `;
}

// WhatsApp Submit
function submitToWhatsApp() {
    if (!validateForm()) return;
    
    const text = generateApplicationText();
    const phone = '256754645377'; // School WhatsApp number
    const encodedText = encodeURIComponent(text);
    
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;
    
    // Ask user to confirm
    if (confirm('Send application via WhatsApp?')) {
        window.open(whatsappUrl, '_blank');
        
        // Optional: Save to local storage
        saveApplicationToStorage();
    }
}

// Email Submit
function submitToEmail() {
    if (!validateForm()) return;
    
    const data = collectFormData();
    const subject = `Application Form - ${data.personal.fullName}`;
    const body = generateApplicationText();
    
    const mailtoUrl = `mailto:admissions@gloryhighschool.ac.ug?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    if (confirm('Send application via Email?')) {
        window.location.href = mailtoUrl;
        
        // Optional: Save to local storage
        saveApplicationToStorage();
    }
}

// Generate PDF
function generatePDF() {
    if (!validateForm()) return;
    
    const data = collectFormData();
    
    // Create printable version
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Application Form - ${data.personal.fullName}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 40px;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    h1 {
                        color: #3498db;
                        text-align: center;
                        border-bottom: 2px solid #3498db;
                        padding-bottom: 10px;
                    }
                    h2 {
                        color: #2c3e50;
                        margin-top: 30px;
                        border-left: 4px solid #3498db;
                        padding-left: 10px;
                    }
                    .section {
                        margin-bottom: 30px;
                    }
                    .info-row {
                        display: flex;
                        margin-bottom: 10px;
                    }
                    .label {
                        font-weight: bold;
                        width: 150px;
                    }
                    .value {
                        flex: 1;
                    }
                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        font-size: 12px;
                        color: #7f8c8d;
                    }
                    .aggregate {
                        background: #3498db;
                        color: white;
                        padding: 15px;
                        border-radius: 5px;
                        text-align: center;
                        font-size: 24px;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <h1>Glory High School - Application Form</h1>
                <p style="text-align: center;">Submitted: ${new Date().toLocaleString()}</p>
                
                <div class="section">
                    <h2>Personal Information</h2>
                    <div class="info-row"><span class="label">Full Name:</span> <span class="value">${data.personal.fullName}</span></div>
                    <div class="info-row"><span class="label">Date of Birth:</span> <span class="value">${data.personal.dob}</span></div>
                    <div class="info-row"><span class="label">Gender:</span> <span class="value">${data.personal.gender}</span></div>
                    <div class="info-row"><span class="label">Nationality:</span> <span class="value">${data.personal.nationality}</span></div>
                    <div class="info-row"><span class="label">Religion:</span> <span class="value">${data.personal.religion}</span></div>
                    <div class="info-row"><span class="label">Previous School:</span> <span class="value">${data.personal.previousSchool}</span></div>
                </div>
                
                <div class="section">
                    <h2>Contact Information</h2>
                    <div class="info-row"><span class="label">Address:</span> <span class="value">${data.contact.address}</span></div>
                    <div class="info-row"><span class="label">District:</span> <span class="value">${data.contact.district}</span></div>
                    <div class="info-row"><span class="label">Phone:</span> <span class="value">${data.contact.phone}</span></div>
                    <div class="info-row"><span class="label">Email:</span> <span class="value">${data.contact.email}</span></div>
                </div>
                
                <div class="section">
                    <h2>Parent/Guardian Information</h2>
                    <div class="info-row"><span class="label">Name:</span> <span class="value">${data.parent.name}</span></div>
                    <div class="info-row"><span class="label">Phone:</span> <span class="value">${data.parent.phone}</span></div>
                    <div class="info-row"><span class="label">Email:</span> <span class="value">${data.parent.email}</span></div>
                    <div class="info-row"><span class="label">Occupation:</span> <span class="value">${data.parent.occupation}</span></div>
                </div>
                
                <div class="section">
                    <h2>Application Details</h2>
                    <div class="info-row"><span class="label">Program:</span> <span class="value">${data.application.program}</span></div>
                    <div class="info-row"><span class="label">Combination:</span> <span class="value">${data.application.combination}</span></div>
                </div>
                
                <div class="section">
                    <h2>Academic Results</h2>
                    <div class="info-row"><span class="label">English:</span> <span class="value">${data.academics.english}</span></div>
                    <div class="info-row"><span class="label">Mathematics:</span> <span class="value">${data.academics.math}</span></div>
                    <div class="info-row"><span class="label">Subject 3:</span> <span class="value">${data.academics.subject3}</span></div>
                    <div class="info-row"><span class="label">Subject 4:</span> <span class="value">${data.academics.subject4}</span></div>
                    <div class="info-row"><span class="label">Subject 5:</span> <span class="value">${data.academics.subject5}</span></div>
                    <div class="info-row"><span class="label">Subject 6:</span> <span class="value">${data.academics.subject6}</span></div>
                    <div class="info-row"><span class="label">Subject 7:</span> <span class="value">${data.academics.subject7}</span></div>
                    <div class="info-row"><span class="label">Subject 8:</span> <span class="value">${data.academics.subject8}</span></div>
                    
                    <div class="aggregate">
                        Aggregate Score: ${data.academics.aggregate}
                    </div>
                </div>
                
                <div class="section">
                    <h2>Additional Information</h2>
                    <p><strong>Why Join:</strong> ${data.additional.whyJoin || 'Not specified'}</p>
                    <p><strong>Special Needs:</strong> ${data.additional.specialNeeds || 'None specified'}</p>
                </div>
                
                <div class="footer">
                    <p>This is an automatically generated application form.</p>
                    <p>© 2024 Glory High School. All rights reserved.</p>
                </div>
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Trigger print dialog after a short delay
    setTimeout(() => {
        printWindow.print();
    }, 500);
    
    // Save to local storage
    saveApplicationToStorage();
}

// Save application to local storage
function saveApplicationToStorage() {
    const data = collectFormData();
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    applications.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // Show success message
    showNotification('Application saved successfully!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    initAggregateCalculator();
    
    // Add event listeners to submit buttons
    const whatsappBtn = document.getElementById('whatsappSubmit');
    const emailBtn = document.getElementById('emailSubmit');
    const pdfBtn = document.getElementById('pdfSubmit');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', submitToWhatsApp);
    }
    
    if (emailBtn) {
        emailBtn.addEventListener('click', submitToEmail);
    }
    
    if (pdfBtn) {
        pdfBtn.addEventListener('click', generatePDF);
    }
    
    // Add input validation for phone numbers
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
    
    // Auto-fill aggregate interpretation with animation
    const aggregateValue = document.getElementById('aggregateValue');
    if (aggregateValue) {
        const observer = new MutationObserver(() => {
            aggregateValue.style.animation = 'aggregatePop 0.5s ease';
            setTimeout(() => {
                aggregateValue.style.animation = '';
            }, 500);
        });
        
        observer.observe(aggregateValue, { childList: true, characterData: true, subtree: true });
    }
});

// Export functions
window.submitToWhatsApp = submitToWhatsApp;
window.submitToEmail = submitToEmail;
window.generatePDF = generatePDF;

// END OF APPLICATION FOR CODES


// ===== REQUIREMENTS PAGE FUNCTIONS =====

// Document Checklist Functionality
function initChecklist() {
    const checkAllBtn = document.getElementById('checkAll');
    const uncheckAllBtn = document.getElementById('uncheckAll');
    const printBtn = document.getElementById('printChecklist');
    const checkboxes = document.querySelectorAll('.checklist-card input[type="checkbox"]');
    
    if (!checkboxes.length) return;
    
    // Check All
    if (checkAllBtn) {
        checkAllBtn.addEventListener('click', function() {
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = true;
            });
            updateChecklistProgress();
            showNotification('All items checked!');
        });
    }
    
    // Uncheck All
    if (uncheckAllBtn) {
        uncheckAllBtn.addEventListener('click', function() {
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
            });
            updateChecklistProgress();
            showNotification('All items unchecked');
        });
    }
    
    // Print Checklist
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            printChecklist();
        });
    }
    
    // Save progress to localStorage
    checkboxes.forEach(function(checkbox, index) {
        // Load saved state
        var saved = localStorage.getItem('checklist_' + index);
        if (saved === 'true') {
            checkbox.checked = true;
        }
        
        // Save on change
        checkbox.addEventListener('change', function() {
            localStorage.setItem('checklist_' + index, checkbox.checked);
            updateChecklistProgress();
        });
    });
    
    // Update progress
    function updateChecklistProgress() {
        var total = checkboxes.length;
        var checked = 0;
        checkboxes.forEach(function(cb) {
            if (cb.checked) checked++;
        });
        var percentage = Math.round((checked / total) * 100);
        
        // Create or update progress bar
        var progressBar = document.querySelector('.checklist-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'checklist-progress';
            var checklistSection = document.querySelector('.checklist-section .container');
            if (checklistSection) {
                checklistSection.appendChild(progressBar);
            }
        }
        
        if (progressBar) {
            progressBar.innerHTML = `
                <div class="progress-text">Checklist Progress: ${checked}/${total} items (${percentage}%)</div>
                <div class="progress-bar-container">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            `;
        }
    }
    
    // Initial progress update
    updateChecklistProgress();
}

// Print Checklist
function printChecklist() {
    var checklistCards = document.querySelectorAll('.checklist-card');
    var checklistHTML = '';
    
    checklistCards.forEach(function(card) {
        checklistHTML += card.outerHTML;
    });
    
    var printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Document Checklist - Glory High School</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 40px;
                        max-width: 1000px;
                        margin: 0 auto;
                    }
                    h1 {
                        color: #3498db;
                        text-align: center;
                        border-bottom: 2px solid #3498db;
                        padding-bottom: 10px;
                    }
                    .checklist-card {
                        margin-bottom: 30px;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        page-break-inside: avoid;
                    }
                    .checklist-card h3 {
                        color: #2c3e50;
                        margin-bottom: 15px;
                    }
                    .checklist-card ul {
                        list-style: none;
                        padding: 0;
                    }
                    .checklist-card li {
                        margin-bottom: 10px;
                        padding: 5px 0;
                    }
                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        font-size: 12px;
                        color: #7f8c8d;
                    }
                </style>
            </head>
            <body>
                <h1>Glory High School - Document Checklist</h1>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Applicant Name:</strong> _________________________</p>
                <div class="checklist-container">
                    ${checklistHTML}
                </div>
                <div class="footer">
                    <p>Please bring all original documents for verification.</p>
                    <p>© 2024 Glory High School. All rights reserved.</p>
                </div>
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(function() {
        printWindow.print();
    }, 500);
}

// Show Notification
function showNotification(message, type) {
    if (!type) type = 'success';
    
    var notification = document.createElement('div');
    notification.className = 'notification ' + type;
    
    var icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    var bgColor = type === 'success' ? '#27ae60' : '#3498db';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS animations if they don't exist
function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        var style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .checklist-progress {
                margin-top: 30px;
                padding: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            body.dark-mode .checklist-progress {
                background: #3d3d3d;
            }
            
            .progress-text {
                margin-bottom: 10px;
                font-weight: 600;
                color: var(--text-dark);
            }
            
            body.dark-mode .progress-text {
                color: #f0f0f0;
            }
            
            .progress-bar-container {
                height: 10px;
                background: #eee;
                border-radius: 5px;
                overflow: hidden;
            }
            
            body.dark-mode .progress-bar-container {
                background: #555;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #3498db, #2ecc71);
                transition: width 0.5s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// Age calculator
function initAgeCalculator() {
    var dobInput = document.getElementById('dob-calculator');
    var resultDiv = document.getElementById('age-result');
    
    if (!dobInput) return;
    
    dobInput.addEventListener('change', function() {
        var dob = new Date(dobInput.value);
        var today = new Date();
        
        var age = today.getFullYear() - dob.getFullYear();
        var monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        var gradeLevel = '';
        if (age >= 13 && age <= 15) gradeLevel = 'Eligible for S.1';
        else if (age >= 14 && age <= 16) gradeLevel = 'Eligible for S.2';
        else if (age >= 15 && age <= 17) gradeLevel = 'Eligible for S.3';
        else if (age >= 16 && age <= 18) gradeLevel = 'Eligible for S.4';
        else if (age >= 17 && age <= 19) gradeLevel = 'Eligible for S.5';
        else gradeLevel = 'Please contact admissions office';
        
        if (resultDiv) {
            resultDiv.innerHTML = `
                <strong>Age:</strong> ${age} years<br>
                <strong>Recommended Class:</strong> ${gradeLevel}
            `;
        }
    });
}

// Tab functionality for requirements
function initRequirementTabs() {
    var tabs = document.querySelectorAll('.req-tab');
    var contents = document.querySelectorAll('.tab-content');
    
    if (!tabs.length) return;
    
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var target = this.dataset.tab;
            
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });
            contents.forEach(function(c) {
                c.classList.remove('active');
            });
            
            this.classList.add('active');
            var targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Initialize all requirements functions
function initRequirements() {
    // Add notification styles
    addNotificationStyles();
    
    // Initialize checklist
    initChecklist();
    
    // Initialize tabs
    initRequirementTabs();
    
    // Initialize age calculator
    initAgeCalculator();
    
    // Add hover effects to requirement cards
    var requirementCards = document.querySelectorAll('.requirement-card');
    requirementCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            var icon = this.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            var icon = this.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Add click handlers for program cards
    var programCards = document.querySelectorAll('.program-card');
    programCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var program = this.querySelector('h3');
            if (program) {
                showNotification('More information about ' + program.textContent + ' will be sent to your email', 'info');
            }
        });
    });
    
    // Expand/Collapse sections if they exist
    var expandBtns = document.querySelectorAll('.expand-btn');
    expandBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var targetId = this.dataset.target;
            var target = document.getElementById(targetId);
            if (target) {
                target.classList.toggle('expanded');
                
                var icon = this.querySelector('i');
                if (icon) {
                    if (target.classList.contains('expanded')) {
                        icon.className = 'fas fa-chevron-up';
                    } else {
                        icon.className = 'fas fa-chevron-down';
                    }
                }
            }
        });
    });
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Check if we're on the requirements page
        if (document.querySelector('.requirements-hero')) {
            initRequirements();
        }
    });
} else {
    // DOM already loaded
    if (document.querySelector('.requirements-hero')) {
        initRequirements();
    }
}

// END OF REQUIREMENTS CODES

// NEWSLATER SECTION

// Add newsletter form handling to existing main.js
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('newsletterName')?.value || 'Subscriber';
            const email = document.getElementById('newsletterEmail').value;
            const messageDiv = document.getElementById('newsletterMessage') || createMessageDiv(newsletterForm);
            
            messageDiv.innerHTML = '<p class="loading"><i class="fas fa-spinner fa-spin"></i> Subscribing...</p>';
            
            const result = await SchoolAPI.subscribeNewsletter(name, email);
            
            if (result.success) {
                messageDiv.innerHTML = `<p class="success-message"><i class="fas fa-check-circle"></i> ${result.message}</p>`;
                newsletterForm.reset();
                setTimeout(() => {
                    messageDiv.innerHTML = '';
                }, 5000);
            } else {
                messageDiv.innerHTML = `<p class="error-message"><i class="fas fa-exclamation-circle"></i> ${result.message}</p>`;
                setTimeout(() => {
                    messageDiv.innerHTML = '';
                }, 5000);
            }
        });
    }
    
    function createMessageDiv(form) {
        let messageDiv = document.createElement('div');
        messageDiv.id = 'newsletterMessage';
        messageDiv.style.marginTop = '15px';
        form.appendChild(messageDiv);
        return messageDiv;
    }
});

// END NEWSLATER SECTION

//NEWS SECTION

// JavaScript for Read More functionality
function toggleFullArticle() {
    const fullArticle = document.getElementById('fullArticle');
    const readMoreBtn = document.querySelector('.read-more-btn');
    
    if (fullArticle.classList.contains('show')) {
        fullArticle.classList.remove('show');
        readMoreBtn.innerHTML = 'Read More <i class="fas fa-arrow-right"></i>';
        
        // Scroll back to preview
        document.querySelector('.news-article-preview').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        fullArticle.classList.add('show');
        readMoreBtn.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
        
        // Scroll to full article
        setTimeout(() => {
            fullArticle.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
}

// Scroll animation observer
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
});

// Comment Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your comment! It will be published after moderation.');
            this.reset();
        });
    }
});

// Dark Mode Toggle (if needed)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Initialize any additional animations on page load
window.addEventListener('load', function() {
    // Force check for visible elements on load
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Optional: Add smooth scroll behavior for anchor links
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
//END OF NEWS SECTION


// ALL CODES FOR CONTACTS FUNCTIONALITY.
// ALL CODES FOR CONTACTS FUNCTIONALITY.
(function() {
    // Override console.log to prevent writing to page (keeps other logs working)
    const originalLog = console.log;
    console.log = function() {
        const args = Array.from(arguments);
        // Only filter out the specific message
        if (args.some(arg => String(arg).includes('JavaScript is successfully linked'))) {
            return;
        }
        originalLog.apply(console, args);
    };
    
    // Remove message from DOM without affecting dark mode
    function removeMessage() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            // Only modify if it contains the exact message
            if (el.innerHTML && el.innerHTML.includes('JavaScript is successfully linked')) {
                el.innerHTML = el.innerHTML.replace(/JavaScript is successfully linked!?/g, '');
            }
            if (el.innerText && el.innerText.includes('JavaScript is successfully linked')) {
                el.innerText = el.innerText.replace(/JavaScript is successfully linked!?/g, '');
            }
        });
        
        const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while(textNodes.nextNode()) {
            const node = textNodes.currentNode;
            if (node.textContent && node.textContent.includes('JavaScript is successfully linked')) {
                node.textContent = node.textContent.replace(/JavaScript is successfully linked!?/g, '');
            }
        }
    }
    
    // Run after DOM is ready but preserve other event listeners
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            removeMessage();
        });
    } else {
        removeMessage();
    }
    setTimeout(removeMessage, 100);
})();

