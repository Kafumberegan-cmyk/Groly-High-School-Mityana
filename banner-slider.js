// Banner slider with 7 effects - 3 second interval (NO PAUSE ON HOVER)
class BannerSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 3000; // 3 seconds
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.showSlide(0);
        this.addEventListeners();
        this.startAutoPlay();
    }
    
    createDots() {
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            this.dotsContainer.appendChild(dot);
        }
    }
    
    showSlide(index) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        if (index < 0) index = this.slideCount - 1;
        if (index >= this.slideCount) index = 0;
        
        // Remove active class from all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        this.slides[index].classList.add('active');
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
        
        // Reset and animate progress bar
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
            setTimeout(() => {
                this.progressBar.style.width = '100%';
            }, 50);
        }
        
        this.currentSlide = index;
        
        // Reset transition lock after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1200); // Match animation duration
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    addEventListeners() {
        // Get slider container for touch events
        const sliderContainer = document.querySelector('.slider-container');
        
        // Previous button
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoPlay();
            });
        }
        
        // Next button
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoPlay();
            });
        }
        
        // Dots navigation
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.showSlide(index);
                this.resetAutoPlay();
            });
        });
        
        // 🚫 NO PAUSE ON HOVER - Slider continues forever
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                this.stopAutoPlay();
            }, { passive: true });
            
            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
                this.startAutoPlay();
            }, { passive: true });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoPlay();
            }
        });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.prevSlide(); // Swipe right
            } else {
                this.nextSlide(); // Swipe left
            }
        }
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BannerSlider();
});