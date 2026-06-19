// Scroll animations
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.scroll-animate');
        this.init();
    }
    
    init() {
        this.checkSections();
        window.addEventListener('scroll', () => this.checkSections());
    }
    
    checkSections() {
        this.sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});