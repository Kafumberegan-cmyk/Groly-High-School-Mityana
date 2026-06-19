// Dark mode functionality
class DarkMode {
    constructor() {
        this.darkModeBtn = document.getElementById('darkModeBtn');
        this.body = document.body;
        this.init();
    }
    
    init() {
        // Check for saved preference
        const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
        
        if (isDarkMode) {
            this.enableDarkMode();
        }
        
        this.darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
    }
    
    toggleDarkMode() {
        if (this.body.classList.contains('dark-mode')) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }
    
    enableDarkMode() {
        this.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        this.darkModeBtn.textContent = '☀️ Light Mode';
    }
    
    disableDarkMode() {
        this.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);
        this.darkModeBtn.textContent = '🌓 Dark Mode';
    }
}

// Initialize dark mode
document.addEventListener('DOMContentLoaded', () => {
    new DarkMode();
});